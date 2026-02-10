import { useEffect, useRef, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { getGroqResponse } from '@/actions/interview-groq';

export type InterviewStatus = 'IDLE' | 'LISTENING' | 'PROCESSING' | 'SPEAKING' | 'ERROR';

export function useInterviewSession(
    onAudioVisualizerData?: (data: Uint8Array) => void
) {
    const [status, setStatus] = useState<InterviewStatus>('IDLE');
    const [isMuted, setIsMuted] = useState(false);

    // History for Gemini
    const [history, setHistory] = useState<{ role: "user" | "model", parts: string }[]>([]);

    // Refs for Browser APIs
    const recognition = useRef<any>(null); // SpeechRecognition type is erratic in TS
    const synth = useRef<SpeechSynthesis | null>(null);
    const mounting = useRef(true);

    // Audio Visualizer Context
    const audioContext = useRef<AudioContext | null>(null);
    const analyser = useRef<AnalyserNode | null>(null);
    const microphone = useRef<MediaStreamAudioSourceNode | null>(null);
    const animationFrame = useRef<number | null>(null);

    // Initialize Speech APIs
    useEffect(() => {
        mounting.current = true;
        if (typeof window !== 'undefined') {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                recognition.current = new SpeechRecognition();
                recognition.current.continuous = false;
                recognition.current.interimResults = false;
                recognition.current.lang = 'en-US';
            }
            synth.current = window.speechSynthesis;
        }
        return () => { mounting.current = false; stopVisualization(); };
    }, []);

    const startVisualization = async () => {
        if (!onAudioVisualizerData) return;
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            analyser.current = audioContext.current.createAnalyser();
            analyser.current.fftSize = 256;
            microphone.current = audioContext.current.createMediaStreamSource(stream);
            microphone.current.connect(analyser.current);

            const bufferLength = analyser.current.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const draw = () => {
                if (!mounting.current || !analyser.current) return;
                analyser.current.getByteFrequencyData(dataArray);
                onAudioVisualizerData(dataArray);
                animationFrame.current = requestAnimationFrame(draw);
            };
            draw();
        } catch (e) {
            console.error("Visualizer error:", e);
        }
    };

    const stopVisualization = () => {
        if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
        if (audioContext.current && audioContext.current.state !== 'closed') audioContext.current.close();
        if (microphone.current) microphone.current.mediaStream.getTracks().forEach(t => t.stop());
    };

    const speak = (text: string) => {
        if (!synth.current) return;

        // Cancel any current speech
        synth.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onstart = () => setStatus('SPEAKING');
        utterance.onend = () => {
            if (mounting.current && status !== 'ERROR') {
                startListening();
            }
        };
        utterance.onerror = (e) => {
            // Ignore intentional cancelations/interruptions
            if (e.error === 'canceled' || e.error === 'interrupted') {
                return;
            }
            console.error("TTS Error:", e.error);
            setStatus('ERROR');
        };

        // Select a good voice if available
        const voices = synth.current.getVoices();
        const preferredVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Samantha"));
        if (preferredVoice) utterance.voice = preferredVoice;

        synth.current.speak(utterance);
    };

    const startListening = () => {
        if (!recognition.current) {
            toast.error("Browser not supported (use Chrome)");
            return;
        }
        try {
            recognition.current.start();
            setStatus('LISTENING');
        } catch (e) {
            console.log("Recognition already started");
        }
    };

    const processInput = async (text: string) => {
        setStatus('PROCESSING');
        try {
            const newHistory = [...history, { role: "user" as const, parts: text }];
            setHistory(newHistory);

            const responseText = await getGroqResponse(newHistory, text);

            setHistory(prev => [...prev, { role: "model" as const, parts: responseText }]);
            speak(responseText);
        } catch (error) {
            console.error("Gemini processing error:", error);
            toast.error("AI failed to respond");
            await speak("I'm sorry, I seem to be having trouble thinking right now.");
            setStatus('ERROR');
        }
    };

    // Setup Recognition Event Handlers
    useEffect(() => {
        if (!recognition.current) return;

        recognition.current.onresult = (event: any) => {
            const text = event.results[0][0].transcript;
            if (text) processInput(text);
        };

        recognition.current.onerror = (event: any) => {
            console.error("Speech Rec Error:", event.error);

            if (event.error === 'not-allowed') {
                toast.error("Microphone permission denied");
                setStatus('ERROR');
            } else if (event.error === 'no-speech') {
                // If it was supposed to be listening and failed to hear potential speech (often noise), restart
                if (status === 'LISTENING') startListening();
            } else if (event.error === 'network') {
                // Common transient error, especially on localhost or unstable connections.
                // Do not fail hard. Wait brief moment and retry.
                toast.dismiss();
                // toast.warning("Connection instability detected, retrying...", { duration: 1000 });
                setTimeout(() => {
                    if (status === 'LISTENING' || status === 'IDLE') {
                        try { recognition.current.start(); } catch { }
                    }
                }, 1000);
            } else if (event.error === 'aborted') {
                // User stopped talking or clicked away, usually safe to ignore or restart if state allows
                if (status === 'LISTENING') startListening();
            }
        };

    }, [history, status]);

    const startSession = async (personaInstruction?: string) => {
        setHistory([]);
        await startVisualization();

        if (personaInstruction) {
            setStatus('PROCESSING');
            const introPrompt = `${personaInstruction}. Introduce yourself briefly and ask the first question.`;

            const initialHistory = [{ role: "user" as const, parts: introPrompt }];
            setHistory(initialHistory);

            try {
                const text = await getGroqResponse([], introPrompt);
                setHistory([...initialHistory, { role: "model" as const, parts: text }]);
                speak(text);
            } catch (e: any) {
                console.error("Start Session Error:", e);
                toast.error("Failed to start: " + (e.message || "Unknown error"));
                setStatus('ERROR');
            }
        } else {
            startListening();
        }
    };

    const endSession = useCallback(() => {
        if (recognition.current) recognition.current.stop();
        if (synth.current) synth.current.cancel();
        stopVisualization();
        setStatus('IDLE');
    }, []);

    const toggleMute = useCallback(() => {
        setIsMuted(p => !p);
        if (!isMuted) {
            recognition.current?.stop();
            setStatus('IDLE');
        } else {
            startListening();
        }
    }, [isMuted]);

    return { status, startSession, endSession, isMuted, toggleMute };
}
