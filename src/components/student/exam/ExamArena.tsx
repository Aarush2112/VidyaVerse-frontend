"use client";

import React, { useEffect, useState } from "react";
import { useExamStore } from "@/lib/store/useExamStore";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AlertTriangle, Clock, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Mock Question Component
const QuestionCard = () => (
    <div className="bg-white rounded-[40px] p-10 md:p-14 shadow-soft-xl border border-slate-50 max-w-5xl mx-auto relative overflow-hidden">
        {/* Decorative Blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-50/50 to-fuchsia-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="relative z-10">
            <div className="flex items-center justify-between mb-10">
                <span className="text-xs font-black text-slate-300 uppercase tracking-[0.2em]">Question 5 of 20</span>
                <span className="px-4 py-1.5 bg-violet-50 text-violet-700 rounded-full text-[10px] font-bold uppercase tracking-wider border border-violet-100">Multiple Choice</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-8 leading-relaxed">
                Which of the following hooks would you use to memorize a complex calculation in React to avoid re-computing it on every render?
            </h2>

            <div className="space-y-4">
                {['useEffect', 'useMemo', 'useCallback', 'useRef'].map((opt) => (
                    <div key={opt} className="p-5 rounded-2xl border border-slate-200 hover:border-violet-500 hover:bg-violet-50/50 cursor-pointer transition-all flex items-center gap-4 group">
                        <div className="h-6 w-6 rounded-full border-2 border-slate-300 group-hover:border-violet-500 flex items-center justify-center">
                            <div className="h-3 w-3 rounded-full bg-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="font-medium text-slate-700 group-hover:text-violet-900">{opt}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export function ExamArena() {
    const {
        timeLeft, decrementTime, violations, addViolation,
        mediaStream
    } = useExamStore();

    const [isFullscreen, setIsFullscreen] = useState(true);

    // Lockdown Logic
    useEffect(() => {
        // 1. Timer
        const timer = setInterval(decrementTime, 1000);

        // 2. Fullscreen Enforcement
        const enterFullscreen = async () => {
            try {
                await document.documentElement.requestFullscreen();
                setIsFullscreen(true);
            } catch (e) {
                console.log("Fullscreen denied");
                setIsFullscreen(false);
            }
        };
        // Attempt to enter on mount
        enterFullscreen();

        // 3. Tab Visibility Listener
        const handleVisibilityChange = () => {
            if (document.hidden) {
                addViolation('tab_switch', 'User switched tabs or minimized window.');
                toast.error("WARNING: Tab switching is recorded.", {
                    description: "Stay on this screen to avoid disqualification.",
                    duration: 5000,
                    icon: <AlertTriangle className="text-red-500" />
                });
            }
        };

        // 4. Fullscreen Exit Listener
        const handleFullscreenChange = () => {
            const isFull = !!document.fullscreenElement;
            setIsFullscreen(isFull);

            if (!isFull) {
                addViolation('fullscreen_exit', 'User exited fullscreen mode.');
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            clearInterval(timer);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    const handleResume = () => {
        document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(console.error);
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="fixed inset-0 z-[100] bg-[#F3F4F6] flex flex-col overflow-hidden font-friendly">

            {/* Lockdown Overlay */}
            {!isFullscreen && (
                <div className="absolute inset-0 z-[110] bg-white/80 backdrop-blur-xl flex flex-col items-center justify-center text-center p-8 transition-all duration-300">
                    <div className="bg-white p-10 rounded-3xl shadow-2xl border border-red-100 max-w-md w-full animate-in fade-in zoom-in duration-300">
                        <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                            <Maximize className="text-red-500 h-8 w-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Exam Paused</h2>
                        <p className="text-slate-500 mb-8">
                            You have exited full-screen mode. To continue the exam, you must return to full-screen.
                            <br /><span className="text-sm font-bold text-red-500 mt-2 block">This incident has been recorded.</span>
                        </p>
                        <div className="flex flex-col gap-3">
                            <Button
                                onClick={handleResume}
                                className="w-full bg-slate-900 text-white hover:bg-slate-800 h-12 rounded-xl font-bold shadow-lg hover:scale-[1.02] transition-transform"
                            >
                                Resume Exam
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Top Bar (Exam Only) - Zen Header */}
            <header className="h-20 bg-white/60 backdrop-blur-xl border-b border-white/50 flex items-center justify-between px-8 sticky top-0 z-40 supports-[backdrop-filter]:bg-white/60">
                <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
                    <div className="font-bold text-slate-800 text-lg tracking-tight">Advanced React Exam</div>
                </div>

                <div className={cn(
                    "flex items-center gap-3 px-6 py-2.5 rounded-full font-mono text-sm font-bold shadow-sm border transition-all",
                    timeLeft < 300
                        ? "bg-rose-50 text-rose-600 border-rose-100 animate-pulse"
                        : "bg-gradient-to-r from-violet-50 to-indigo-50 text-violet-700 border-violet-100 shadow-violet-100/50"
                )}>
                    <Clock size={16} className={timeLeft < 300 ? "text-rose-500" : "text-violet-500"} />
                    <span className="tracking-widest">{formatTime(timeLeft)}</span>
                </div>
            </header>

            {/* Main Arena */}
            <main className="flex-1 p-6 md:p-8 flex flex-col justify-center overflow-y-auto">
                <QuestionCard />
            </main>

            {/* Footer Nav */}
            <footer className="h-20 bg-white border-t border-slate-100 flex items-center justify-between px-8 z-40">
                <Button variant="ghost" className="text-slate-400 hover:text-slate-600">Previous</Button>
                <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full px-8 text-white font-bold shadow-lg shadow-violet-500/30 hover:scale-105 transition-transform">
                    Next Question
                </Button>
            </footer>

            {/* Proctor Widget (Draggable Visual Only) */}
            <motion.div
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // Simplified for demo
                className="fixed bottom-24 right-8 z-50 cursor-grab active:cursor-grabbing"
            >
                <div className="relative h-32 w-32 rounded-full border-4 border-emerald-400 bg-black overflow-hidden shadow-2xl">
                    <video
                        ref={(ref) => {
                            if (ref && !ref.srcObject && mediaStream) {
                                ref.srcObject = mediaStream;
                            }
                        }}
                        autoPlay muted playsInline
                        className="h-full w-full object-cover transform scale-x-[-1]"
                    />
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black/60 backdrop-blur px-2 py-0.5 rounded-full">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[8px] font-bold text-white uppercase">Rec</span>
                    </div>
                </div>
                {violations.length > 0 && (
                    <div className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white animate-bounce">
                        {violations.length}
                    </div>
                )}
            </motion.div>

        </div>
    );
}
