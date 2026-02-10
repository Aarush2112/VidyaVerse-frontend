"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { AlertTriangle, Lock, Camera, Mic, Monitor, Wifi, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { logProctorEvent, uploadEvidence } from "@/app/actions/proctor";

interface ProctorGuardProps {
    examId: string;
    onViolation: (type: string) => void;
    onReady: () => void;
    onTerminate: () => void;
}

export function ProctorGuard({ examId, onViolation, onReady, onTerminate }: ProctorGuardProps) {
    // Media States
    const [hasCam, setHasCam] = useState(false);
    const [hasMic, setHasMic] = useState(false);
    const [hasScreen, setHasScreen] = useState(false);
    const [isSetupComplete, setIsSetupComplete] = useState(false);

    // Monitoring States
    const [isFullScreen, setIsFullScreen] = useState(true);
    const [isTabActive, setIsTabActive] = useState(true);
    const [trustScore, setTrustScore] = useState(100);
    const [audioLevel, setAudioLevel] = useState(0);
    const [isTerminated, setIsTerminated] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const widgetVideoRef = useRef<HTMLVideoElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const handleVideoRef = useCallback((node: HTMLVideoElement | null) => {
        videoRef.current = node;
        if (node && streamRef.current) {
            node.srcObject = streamRef.current;
        }
    }, []);

    const handleWidgetVideoRef = useCallback((node: HTMLVideoElement | null) => {
        widgetVideoRef.current = node;
        if (node && streamRef.current) {
            node.srcObject = streamRef.current;
        }
    }, []);

    // 1. Setup Phase: Request Permissions
    const requestPermissions = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            if (widgetVideoRef.current) {
                widgetVideoRef.current.srcObject = stream;
            }

            streamRef.current = stream; // Store for later attachment

            setHasCam(true);
            setHasMic(true);
            setupAudioMonitoring(stream);
            toast.success("Camera and Mic connected");
        } catch (err) {
            console.error("Media permission denied", err);
            toast.error("Camera/Mic access is required");
        }
    };

    const setupAudioMonitoring = (stream: MediaStream) => {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);

        microphone.connect(analyser);
        analyser.fftSize = 256;

        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
        sourceRef.current = microphone;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const checkAudioLevel = () => {
            if (!analyserRef.current) return;
            analyserRef.current.getByteFrequencyData(dataArray);

            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
                sum += dataArray[i];
            }
            const average = sum / bufferLength;
            const normalizedLevel = Math.min(100, (average / 128) * 100); // Approximate percentage

            setAudioLevel(normalizedLevel);

            // Noise Violation Threshold
            if (normalizedLevel > 40 && isSetupComplete) { // > 40% volume is suspicious
                handleViolation("HIGH_AUDIO_NOISE");
            }

            requestAnimationFrame(checkAudioLevel);
        };

        checkAudioLevel();
    };

    const requestScreenShare = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            setHasScreen(true);

            // Detect if they stop sharing
            stream.getVideoTracks()[0].onended = () => {
                setHasScreen(false);
                handleViolation("SCREEN_SHARE_STOPPED");
            };

            toast.success("Screen sharing active");
        } catch (err) {
            console.error("Screen share denied", err);
            toast.error("Screen sharing is required");
        }
    };

    const enterFullScreen = async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
                setIsFullScreen(true);
            }
        } catch (err) {
            console.log("Full screen denied", err);
        }
    };

    // 2. Monitoring Phase
    useEffect(() => {
        if (!isSetupComplete) return;

        const handleFullScreenChange = () => {
            const isFull = !!document.fullscreenElement;
            setIsFullScreen(isFull);
            if (!isFull) handleViolation("FULL_SCREEN_EXIT");
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                setIsTabActive(false);
                handleViolation("TAB_SWITCH");
            } else {
                setIsTabActive(true);
            }
        };

        const handleBlur = () => {
            setIsTabActive(false);
            handleViolation("WINDOW_BLUR");
        };

        const handleFocus = () => {
            setIsTabActive(true);
        };

        document.addEventListener("fullscreenchange", handleFullScreenChange);
        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("blur", handleBlur);
        window.addEventListener("focus", handleFocus);

        // Prevent Copy/Paste
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'v')) {
                e.preventDefault();
                toast.warning("Copy/Paste is disabled");
            }
        };
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullScreenChange);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("blur", handleBlur);
            window.removeEventListener("focus", handleFocus);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isSetupComplete]);

    // Snapshot Loop
    useEffect(() => {
        if (!isSetupComplete || isTerminated) return;

        const captureAndUpload = async () => {
            try {
                let webcamShot = null;
                // Capture Webcam
                if (streamRef.current && videoRef.current) {
                    const canvas = document.createElement("canvas");
                    canvas.width = videoRef.current.videoWidth;
                    canvas.height = videoRef.current.videoHeight;
                    canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
                    webcamShot = canvas.toDataURL("image/jpeg", 0.5); // Low quality for speed
                }

                // Upload Evidence (Fire and forget from UI perspective, but we await to log error)
                if (webcamShot) {
                    await uploadEvidence(examId, null, webcamShot);
                }

            } catch (err) {
                console.error("Snapshot failed", err);
            }
        };

        // Initial snapshot
        captureAndUpload();

        // Interval (every 30 seconds)
        const interval = setInterval(captureAndUpload, 30000); // 30s

        return () => clearInterval(interval);
    }, [isSetupComplete, isTerminated, examId]);


    // Trust Score & Violation Logic
    const [violationCount, setViolationCount] = useState(0);

    const handleViolation = (type: string) => {
        if (isTerminated) return;

        let penalty = 0;
        let isCritical = false;

        switch (type) {
            case "TAB_SWITCH": penalty = 5; isCritical = true; break;
            case "FULL_SCREEN_EXIT": penalty = 10; isCritical = true; break;
            case "SCREEN_SHARE_STOPPED": penalty = 15; isCritical = true; break;
            case "HIGH_AUDIO_NOISE": penalty = 0.5; break;
            case "WINDOW_BLUR": penalty = 5; isCritical = true; break;
            default: penalty = 2;
        }

        // Log to Server
        // We use a simplified mapping for Prisma enum if needed, or cast as any for now since we haven't strictly typed the map here
        const proctorEvent = type as any;
        logProctorEvent(examId, proctorEvent, { trustScore: trustScore - penalty });

        // Update Trust Score
        setTrustScore(prev => {
            const newScore = Math.max(0, prev - penalty);
            if (newScore < 70) {
                setTimeout(() => {
                    if (!isTerminated) {
                        setIsTerminated(true);
                        onTerminate();
                    }
                }, 0);
            }
            return newScore;
        });

        // 3-Strike Rule for Critical Violations
        if (isCritical) {
            setViolationCount(prev => {
                const newCount = prev + 1;
                if (newCount >= 3) {
                    setTimeout(() => {
                        if (!isTerminated) {
                            setIsTerminated(true);
                            onTerminate();
                            toast.error("MAXIMUM VIOLATIONS REACHED. EXAM TERMINATED.");
                        }
                    }, 0);
                } else {
                    toast.warning(`Warning ${newCount}/3: ${type.replace(/_/g, " ")}. Next violation may terminate exam.`);
                }
                return newCount;
            });
        }

        onViolation(type);
    };

    const handleStartExam = () => {
        if (hasCam && hasMic && hasScreen) {
            enterFullScreen();
            setIsSetupComplete(true);
            onReady();

            // Sync widget stream if setup later
            if (videoRef.current && widgetVideoRef.current && !widgetVideoRef.current.srcObject) {
                widgetVideoRef.current.srcObject = videoRef.current.srcObject;
            }

        } else {
            toast.error("Please complete all system checks");
        }
    };

    // --- Renders ---

    // 1. Terminated Screen
    if (isTerminated) {
        return (
            <div className="fixed inset-0 z-[9999] bg-red-950/95 backdrop-blur-xl flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-black/50 border border-red-500/30 p-8 rounded-2xl text-center space-y-6">
                    <div className="h-20 w-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                        <Lock className="h-10 w-10 text-red-500" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Exam Terminated</h2>
                        <p className="text-red-200">
                            Your Trust Score dropped below 70%. The system has automatically submitted your exam and flagged it for manual review.
                        </p>
                    </div>
                    <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/20">
                        <div className="text-4xl font-bold text-red-500">{Math.round(trustScore)}%</div>
                        <div className="text-xs uppercase tracking-wider text-red-400 font-bold mt-1">Final Trust Score</div>
                    </div>
                    <Button variant="destructive" className="w-full">
                        View Violation Report
                    </Button>
                </div>
            </div>
        );
    }

    // 2. Setup Screen
    if (!isSetupComplete) {
        return (
            <div className="fixed inset-0 z-[9999] bg-[#0B0F19] text-white flex flex-col items-center justify-center p-4">
                <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Setup Steps */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                                AutoProctor Check
                            </h1>
                            <p className="text-slate-400 text-lg">
                                Verify your environment. Low trust scores will result in automatic termination.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${hasCam ? 'bg-emerald-500/20 text-emerald-500' : 'bg-white/10 text-slate-400'}`}>
                                        <Camera size={20} />
                                    </div>
                                    <div>
                                        <div className="font-semibold">Camera & Mic</div>
                                        <div className="text-xs text-slate-400">Noise detection active</div>
                                    </div>
                                </div>
                                <Button
                                    onClick={requestPermissions}
                                    className={hasCam ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20" : ""}
                                    disabled={hasCam}
                                >
                                    {hasCam ? "Connected" : "Connect"}
                                </Button>
                            </div>

                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${hasScreen ? 'bg-emerald-500/20 text-emerald-500' : 'bg-white/10 text-slate-400'}`}>
                                        <Monitor size={20} />
                                    </div>
                                    <div>
                                        <div className="font-semibold">Screen Sharing</div>
                                        <div className="text-xs text-slate-400">Anti-multitasking active</div>
                                    </div>
                                </div>
                                <Button
                                    onClick={requestScreenShare}
                                    className={hasScreen ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20" : ""}
                                    disabled={hasScreen}
                                >
                                    {hasScreen ? "Active" : "Share"}
                                </Button>
                            </div>
                        </div>

                        <div className="p-4 bg-blue-900/10 border border-blue-500/20 rounded-xl">
                            <h4 className="text-blue-400 font-bold text-sm mb-2 flex items-center gap-2"><Activity size={16} /> Audio Check</h4>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className={cn("h-full transition-all duration-100 ease-out", audioLevel > 40 ? "bg-red-500" : "bg-emerald-500")}
                                    style={{ width: `${Math.min(100, audioLevel * 3)}%` }}
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-2">Speak to test microphone sensitivity.</p>
                        </div>

                        <Button
                            className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/20 rounded-xl"
                            disabled={!hasCam || !hasMic || !hasScreen}
                            onClick={handleStartExam}
                        >
                            Start Exam
                        </Button>
                    </div>

                    {/* Pre-flight Camera Preview */}
                    <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border-2 border-slate-800 shadow-2xl">
                        {hasCam ? (
                            <video
                                ref={handleVideoRef}
                                autoPlay
                                muted
                                playsInline
                                className="w-full h-full object-cover transform scale-x-[-1]"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-slate-600 space-y-2">
                                <Camera size={48} />
                                <span>Preview</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // 3. Active Floating Widget
    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
            {/* Warning Banner */}
            {(!isFullScreen || !isTabActive || !hasScreen) && (
                <div className="bg-red-500/90 backdrop-blur text-white px-4 py-2 rounded-lg font-bold animate-pulse text-center shadow-lg pointer-events-auto">
                    ⚠️ Return to Fullscreen immediately!
                    <Button size="sm" variant="ghost" className="text-white underline ml-2 hover:text-red-100" onClick={enterFullScreen}>Fix</Button>
                </div>
            )}

            {/* Main Widget */}
            <div className="w-[280px] bg-black/90 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl pointer-events-auto transition-all hover:scale-105">
                {/* Header / Trust Score */}
                <div className="p-3 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-white/50 tracking-wider">REC</span>
                    </div>
                    <div className={cn("text-sm font-bold flex items-center gap-1.5",
                        trustScore > 85 ? "text-emerald-400" : trustScore > 70 ? "text-amber-400" : "text-red-500"
                    )}>
                        <Wifi size={14} />
                        {Math.round(trustScore)}% Trust
                    </div>
                </div>

                {/* Mini Feed */}
                <div className="relative h-[160px] bg-black">
                    <video
                        // Re-attach stream if component re-rendered and ref lost stream but hasCam is true
                        // This uses a callback ref to ensure stream is attached
                        ref={handleWidgetVideoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover transform scale-x-[-1]"
                    />

                    {/* Audio Waveform Visualization (Simple CSS Bar) */}
                    <div className="absolute bottom-2 left-3 right-3 flex items-end gap-0.5 h-4 opacity-70">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div
                                key={i}
                                className="w-full bg-emerald-500 rounded-t-sm transition-all duration-75"
                                style={{ height: `${Math.max(10, Math.random() * audioLevel * 1.5)}%` }}
                            />
                        ))}
                    </div>
                </div>

                {/* Status Footer */}
                <div className="p-2 bg-slate-900/80 text-[10px] text-slate-400 flex justify-between font-mono">
                    <span>MIC: {audioLevel > 5 ? Math.round(audioLevel) + 'db' : 'Silent'}</span>
                    <span>{hasScreen ? 'SHARING' : 'STOPPED'}</span>
                </div>
            </div>
        </div>
    );
}
