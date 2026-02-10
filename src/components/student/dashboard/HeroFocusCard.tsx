"use client";

import React from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface HeroFocusCardProps {
    title: string;
    subtitle: string;
    timeLeft: string;
    progress: number;
    onResume?: () => void;
}

export function HeroFocusCard({
    title = "Server Actions & Mutations",
    subtitle = "Module 3",
    timeLeft = "45m Remaining",
    progress = 35,
    onResume
}: HeroFocusCardProps) {
    return (
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25 h-full min-h-[300px] flex flex-col justify-between p-8 group transition-all hover:scale-[1.01] hover:shadow-indigo-500/40">

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

            {/* Top Content */}
            <div className="relative z-10">
                <div className="flex items-center gap-3 text-white/80 text-sm font-semibold tracking-wide uppercase mb-4">
                    <span className="flex h-2 w-2 rounded-full bg-white animate-pulse" />
                    IN PROGRESS • {timeLeft}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold font-poppins leading-tight max-w-lg mb-2">
                    {title}
                </h2>
                <p className="text-lg text-indigo-100 font-medium">{subtitle}</p>
            </div>

            {/* Action Area */}
            <div className="relative z-10 flex items-end justify-between mt-8">
                <Button
                    onClick={onResume}
                    className="h-16 pl-6 pr-8 gap-4 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 hover:bg-white/30 text-white font-bold text-lg transition-all group-hover:pl-8"
                >
                    <div className="h-10 w-10 flex items-center justify-center bg-white rounded-full text-indigo-600 shadow-sm">
                        <Play size={20} fill="currentColor" className="ml-0.5" />
                    </div>
                    Resume Learning
                </Button>

                {/* Progress Bar */}
                <div className="w-1/3 max-w-[200px] mb-2">
                    <div className="flex justify-between text-xs font-medium text-white/80 mb-2">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
