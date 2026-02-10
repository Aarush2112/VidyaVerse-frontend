"use client";

import React from "react";
import { Flame, Trophy, Target, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MissionControlProps {
    streak: number;
    rank: number;
    pendingCount: number;
    nextMission: string | null;
}

import { NeuCard } from "@/components/neu/NeuCard";

export function MissionControl({ streak, rank, pendingCount, nextMission }: MissionControlProps) {
    return (
        <NeuCard className="h-full flex flex-col justify-between group overflow-hidden relative">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xs font-bold text-neu-text-sub uppercase tracking-[0.2em] font-mono mb-2">
                        Mission Status
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-neu-base shadow-neu-concave-sm text-amber-600 rounded-full text-[10px] font-bold uppercase">
                            {pendingCount} Pending
                        </span>
                    </div>
                </div>
                <div className="h-12 w-12 rounded-full shadow-neu-concave-sm flex items-center justify-center text-neu-accent">
                    <Target size={20} />
                </div>
            </div>

            {/* Objective */}
            <div className="mt-6 mb-8 cursor-pointer group-hover:translate-x-1 transition-transform">
                <p className="text-sm text-neu-text-sub font-medium mb-1">Next Objective</p>
                <h2 className="text-xl md:text-2xl font-bold text-neu-text-main leading-tight group-hover:text-neu-accent transition-colors flex items-center gap-2 neu-text-chiselled">
                    {nextMission || "All Systems Operational"}
                    {nextMission && <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-neu-accent" />}
                </h2>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-6 pt-6 border-t border-transparent">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full shadow-neu-concave-sm flex items-center justify-center">
                        <Flame className="text-[#F59E0B] fill-amber-500/20" size={18} />
                    </div>
                    <div>
                        <div className="text-lg font-bold text-neu-text-main font-mono">{streak}</div>
                        <div className="text-[10px] font-bold text-neu-text-sub uppercase">Streak</div>
                    </div>
                </div>

                <div className="w-[2px] h-8 bg-neu-base shadow-neu-concave-sm rounded-full" />

                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full shadow-neu-concave-sm flex items-center justify-center">
                        <Trophy className="text-[#A855F7]" size={18} />
                    </div>
                    <div>
                        <div className="text-lg font-bold text-neu-text-main font-mono">#{rank}</div>
                        <div className="text-[10px] font-bold text-neu-text-sub uppercase">Rank</div>
                    </div>
                </div>
            </div>
        </NeuCard>
    );
}
