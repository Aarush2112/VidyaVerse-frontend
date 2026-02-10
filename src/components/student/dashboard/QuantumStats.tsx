"use client";

import { Zap, Crown, TrendingUp } from "lucide-react";
import { HolographicCard } from "./HolographicCard";

interface QuantumStatsProps {
    xp: number;
    level: number;
    rank: number;
    rankTrend: "up" | "down" | "flat";
}

export const QuantumStats = ({ xp, level, rank, rankTrend }: QuantumStatsProps) => {
    // XP Ring Calculation
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = circumference - (0.75 * circumference); // 75% progress static for demo

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            {/* XP Widget: Circular Gauge */}
            <HolographicCard className="p-6 flex items-center justify-between group">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-cyan-400 animate-pulse" />
                        <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase">XP Status</span>
                    </div>
                    <div className="text-4xl font-mono font-bold text-white tracking-tighter drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                        {(xp / 1000).toFixed(1)}k
                    </div>
                </div>

                <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="48" cy="48" r={radius}
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="6"
                            fill="transparent"
                        />
                        <circle
                            cx="48" cy="48" r={radius}
                            stroke="#22d3ee"
                            strokeWidth="6"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={progressOffset}
                            strokeLinecap="round"
                            className="drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xs text-slate-400 font-mono">LVL</span>
                        <span className="text-xl font-bold text-white">{level}</span>
                    </div>
                </div>
            </HolographicCard>

            {/* Rank Widget: Leaderboard Badge */}
            <HolographicCard className="p-6 flex flex-col justify-between group" glowColor="#fcd34d">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Crown className="h-4 w-4 text-amber-400" />
                            <span className="text-amber-400 text-xs font-mono tracking-widest uppercase">Global Rank</span>
                        </div>
                        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.4)]">
                            #{rank}
                        </div>
                    </div>
                    {/* Sparkline SVG */}
                    <div className="w-16 h-8">
                        <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                            <defs>
                                <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#fcd34d" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#fcd34d" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path d="M0,50 L20,40 L40,45 L60,20 L80,25 L100,5" fill="url(#sparkGradient)" stroke="none" />
                            <path d="M0,50 L20,40 L40,45 L60,20 L80,25 L100,5" fill="none" stroke="#fcd34d" strokeWidth="2" />
                            <circle cx="100" cy="5" r="3" fill="#fcd34d" className="animate-pulse" />
                        </svg>
                    </div>
                </div>

                <div className="mt-4 flex items-center text-xs text-emerald-400 font-mono">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>TOP 5% OF COHORT</span>
                </div>
            </HolographicCard>
        </div>
    )
}
