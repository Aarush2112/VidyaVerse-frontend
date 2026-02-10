"use client";

import React from "react";
import { motion } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area, Tooltip as RechartsTooltip } from "recharts";
import { useStatsStore } from "@/lib/store/useStatsStore";
import { Trophy, TrendingUp, Zap } from "lucide-react";
import CountUp from "react-countup";

export function CompositeScoreHero() {
    const { apiScore, codingHours } = useStatsStore();
    const chartData = codingHours.map((val, i) => ({ val, i }));

    return (
        <motion.div
            className="w-full bg-white rounded-[32px] p-1 shadow-soft-xl border border-slate-100"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-100">

                {/* 1. Academic API Score */}
                <div className="p-6 md:p-8 flex items-center justify-between relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-violet-600 mb-2 font-bold text-xs uppercase tracking-wider">
                            <Trophy size={14} /> API Score
                        </div>
                        <div className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">
                            <CountUp end={apiScore} duration={2} />
                        </div>
                        <div className="text-sm text-slate-400 font-medium mt-1">Top 12% of class</div>
                    </div>
                    {/* Radial Progress Visual (SVG) */}
                    <div className="relative h-24 w-24 md:h-32 md:w-32">
                        <svg className="h-full w-full transform -rotate-90">
                            <circle cx="50%" cy="50%" r="45%" stroke="#F3F4F6" strokeWidth="8" fill="transparent" />
                            <motion.circle
                                cx="50%" cy="50%" r="45%"
                                stroke="#7C3AED" strokeWidth="8"
                                fill="transparent"
                                strokeDasharray="283"
                                strokeDashoffset="283"
                                strokeLinecap="round"
                                animate={{ strokeDashoffset: 283 - (283 * (apiScore / 1000)) }}
                                transition={{ duration: 2, ease: "easeOut" }}
                            />
                        </svg>
                    </div>
                </div>

                {/* 2. Learning Velocity (Sparkline) */}
                <div className="p-6 md:p-8 flex flex-col justify-between relative">
                    <div>
                        <div className="flex items-center gap-2 text-emerald-600 mb-2 font-bold text-xs uppercase tracking-wider">
                            <TrendingUp size={14} /> Velocity
                        </div>
                        <div className="text-3xl font-bold text-slate-900">+12% <span className="text-sm font-medium text-slate-400 font-normal">vs last week</span></div>
                    </div>
                    <div className="h-16 w-full -mb-4 -ml-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Area
                                    type="monotone"
                                    dataKey="val"
                                    stroke="#10B981"
                                    strokeWidth={3}
                                    fill="url(#velocityGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 3. Deep Work Hours */}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-rose-500 mb-2 font-bold text-xs uppercase tracking-wider">
                        <Zap size={14} /> Deep focus
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-slate-900 tracking-tighter">42<span className="text-2xl text-slate-400 font-bold">h</span></span>
                    </div>
                    <div className="text-sm text-slate-500 mt-2 leading-relaxed">
                        You are most productive between <span className="font-bold text-slate-900">10 PM</span> and <span className="font-bold text-slate-900">2 AM</span>. Keep it up! 🌙
                    </div>
                </div>

            </div>
        </motion.div>
    );
}
