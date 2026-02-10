"use client";

import { motion } from "framer-motion";
import { Flame, Trophy } from "lucide-react";
import { HoloCard } from "./HoloCard";

export function StatsModule() {
    return (
        <div className="flex flex-col gap-6">
            {/* Level Gauge */}
            <HoloCard className="flex flex-col items-center justify-center py-10">
                <div className="relative w-40 h-40">
                    {/* SVG Progress Ring */}
                    <svg className="w-full h-full -rotate-90">
                        <circle
                            cx="80"
                            cy="80"
                            r="70"
                            fill="transparent"
                            stroke="currentColor"
                            strokeWidth="8"
                            className="text-slate-50"
                        />
                        <motion.circle
                            initial={{ strokeDasharray: "0 440" }}
                            animate={{ strokeDasharray: "320 440" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            cx="80"
                            cy="80"
                            r="70"
                            fill="transparent"
                            stroke="url(#progressGradient)"
                            strokeWidth="8"
                            strokeLinecap="round"
                        />
                        <defs>
                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#5B86E5" />
                                <stop offset="100%" stopColor="#36D1DC" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-slate-900 tracking-tight">LVL 5</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Scholar</span>
                    </div>
                </div>
                <div className="mt-6 text-center space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#5B86E5]">Learning Milestone</p>
                    <p className="text-sm font-bold text-slate-900">1,240 / 1,500 <span className="text-slate-400">XP</span></p>
                </div>
            </HoloCard>

            {/* Streak & Rank Grid */}
            <div className="grid grid-cols-2 gap-6">
                <HoloCard className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="h-12 w-12 rounded-2xl bg-[#FCE8E3] flex items-center justify-center mb-4">
                        <Flame className="h-6 w-6 text-[#E67E22]" />
                    </div>
                    <span className="text-2xl font-bold text-slate-900">12</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-1">Daily Streak</span>
                </HoloCard>

                <HoloCard className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="h-12 w-12 rounded-2xl bg-[#F0F4E3] flex items-center justify-center mb-4">
                        <Trophy className="h-6 w-6 text-[#82B541]" />
                    </div>
                    <span className="text-2xl font-bold text-slate-900">#42</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-1">Global Standing</span>
                </HoloCard>
            </div>
        </div>
    );
}
