"use client";

import React from "react";
import { ChevronUp, Share2 } from "lucide-react";

interface PlayerDockProps {
    rank: number;
    xp: number;
}

export function PlayerDock({ rank, xp, label = "XP" }: PlayerDockProps & { label?: string }) {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-50">
            <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-2 pr-3 rounded-full flex items-center justify-between">

                {/* Left: Your Rank & Info */}
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-blue-200">
                        {rank}
                    </div>
                    <div>
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Your Position</div>
                        <div className="text-sm font-bold text-slate-800 flex items-center gap-1">
                            {xp.toLocaleString()} {label}
                            {/* Trend hardcoded for now or passed as prop later */}
                            <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full flex items-center">
                                <ChevronUp size={10} strokeWidth={4} /> -
                            </span>
                        </div>
                    </div>
                </div>

                {/* Center: Nudge (Hidden on mobile) */}
                <div className="hidden md:block text-xs font-medium text-slate-400">
                    Keep pushing to reach the top!
                </div>

                {/* Right: Actions */}
                <button className="h-10 px-6 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-slate-800 hover:scale-105 transition-all flex items-center gap-2 shadow-md">
                    <Share2 size={14} />
                    Share
                </button>
            </div>
        </div>
    );
}

