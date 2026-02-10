"use client";

import React, { useEffect, useState } from 'react';
import { useInterviewSession } from '@/hooks/use-interview-socket';
import { AudioVisualizer } from '@/components/interview/AudioVisualizer';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, PhoneOff, Settings2, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { KnowledgeDashboardLayout } from '@/components/student/dashboard/KnowledgeDashboardLayout';

export default function ActiveSessionPage({ searchParams }: { searchParams: Promise<{ persona?: string }> }) {
    const { persona } = React.use(searchParams);
    const router = useRouter();
    const [elapsedTime, setElapsedTime] = useState(0);
    const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(0));

    // WebRTC Hook
    const { status, startSession, endSession, isMuted, toggleMute } = useInterviewSession(
        (data) => setAudioData(data)
    );

    // Timer
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (status !== 'IDLE' && status !== 'ERROR') {
            interval = setInterval(() => setElapsedTime(p => p + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [status]);

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const getPersonaInstruction = () => {
        const p = persona;
        if (p === 'vikram') return "You are Vikram, a Senior Backend Engineer. You are strict, curt, and focused on efficiency. Ask deep technical questions about Distributed Systems and Data Structures. Do not give hints easily.";
        if (p === 'alex') return "You are Alex, a Staff Engineer. You focus on high-level system design. Ask the candidate to design complex systems like Twitter or Uber. Focus on scalability, trade-offs, and failure scenarios.";
        return "You are Sarah, an HR Manager. You are friendly and warm. Ask behavioral questions about the candidate's past experiences, conflict resolution, and career goals.";
    };

    const handleStart = () => {
        startSession(getPersonaInstruction());
    };

    const handleEndSession = () => {
        endSession();
        toast.info("Session Ended", { description: "Generating feedback..." });

        // Extract session ID
        const pathParts = window.location.pathname.split('/');
        const sessionId = pathParts[pathParts.length - 1];

        setTimeout(() => {
            router.push(`/student/career/interview/${sessionId}/result`);
        }, 1000);
    };

    return (
        <KnowledgeDashboardLayout hideRightSidebar>
            <div className="h-[calc(100vh-140px)] flex flex-col relative overflow-hidden bg-white/50 backdrop-blur-xl border border-white/60 rounded-[32px] shadow-sm">

                {/* Header */}
                <div className="flex items-center justify-between p-6 md:p-8 border-b border-slate-100/50">
                    <div className="flex items-center gap-4">
                        <div className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors border",
                            status === 'LISTENING' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                status === 'SPEAKING' ? "bg-purple-50 text-purple-600 border-purple-100" :
                                    status === 'PROCESSING' ? "bg-amber-50 text-amber-600 border-amber-100" :
                                        "bg-slate-50 text-slate-500 border-slate-100"
                        )}>
                            <div className={cn("h-2 w-2 rounded-full",
                                status === 'LISTENING' ? "bg-emerald-500 animate-pulse" :
                                    status === 'SPEAKING' ? "bg-purple-500 animate-pulse" :
                                        status === 'PROCESSING' ? "bg-amber-500 animate-bounce" :
                                            "bg-slate-400"
                            )} />
                            {status === 'LISTENING' ? 'Listening' :
                                status === 'SPEAKING' ? 'AI Speaking' :
                                    status === 'PROCESSING' ? 'Thinking...' :
                                        'Standby'}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl font-mono text-slate-600 font-medium">
                        <Timer className="h-4 w-4 text-slate-400" />
                        {formatTime(elapsedTime)}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col items-center justify-center relative p-8">

                    {/* Visualizer */}
                    <div className="relative z-10 mb-8">
                        <div className={cn(
                            "w-[300px] h-[300px] flex items-center justify-center transition-all duration-1000",
                            status !== 'IDLE' && status !== 'ERROR' ? "opacity-100 scale-100" : "opacity-50 scale-95 grayscale"
                        )}>
                            <AudioVisualizer isActive={status === 'SPEAKING' || status === 'LISTENING'} onData={() => { }} />
                        </div>
                    </div>

                    {/* Status Message */}
                    <div className="text-center space-y-2 z-10 max-w-md mx-auto">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                            {status === 'LISTENING' ? "I'm Listening..." :
                                status === 'SPEAKING' ? "AI is Speaking" :
                                    status === 'PROCESSING' ? "Thinking..." :
                                        "Ready to Begin?"}
                        </h2>
                        <p className="text-slate-500 text-lg">
                            {status === 'LISTENING' ? "Speak clearly now." :
                                status === 'SPEAKING' ? "Listen carefully." :
                                    status === 'PROCESSING' ? "Analyzing your answer..." :
                                        "Ensure your microphone is enabled."}
                        </p>
                    </div>
                </div>

                {/* Controls Bar */}
                <div className="p-8 flex justify-center items-center pb-12">
                    {status === 'IDLE' || status === 'ERROR' ? (
                        <Button
                            size="lg"
                            onClick={handleStart}
                            className="h-16 px-10 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-200 text-lg font-bold transition-all hover:scale-105"
                        >
                            {status === 'ERROR' ? "Retry Session" : "Start Interview"}
                        </Button>
                    ) : (
                        <div className="flex items-center gap-4 bg-white p-2 rounded-full shadow-2xl shadow-slate-200 border border-slate-100">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleMute}
                                className={cn(
                                    "h-14 w-14 rounded-full transition-all",
                                    isMuted ? "bg-red-50 text-red-500 hover:bg-red-100" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                                )}
                            >
                                {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                            </Button>

                            <div className="w-px h-8 bg-slate-200 mx-2" />

                            <Button
                                variant="destructive"
                                size="icon"
                                onClick={handleEndSession}
                                className="h-14 w-14 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20"
                            >
                                <PhoneOff className="h-6 w-6" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </KnowledgeDashboardLayout>
    );
}
