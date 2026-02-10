"use client";

import React from "react";
import { motion } from "framer-motion";

export function LevelOrb() {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const progress = 1240 / 1500;
    const strokeDashoffset = circumference - progress * circumference;

    return (
        <div className="h-full bg-white rounded-[32px] p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-[100px] -z-0" />

            <div className="relative z-10">
                {/* SVG Donut */}
                <div className="relative h-40 w-40 flex items-center justify-center">
                    <svg className="transform -rotate-90 w-full h-full">
                        {/* Track */}
                        <circle
                            stroke="#EFF6FF"
                            strokeWidth="12"
                            fill="transparent"
                            r={radius}
                            cx="80"
                            cy="80"
                        />
                        {/* Progress */}
                        <motion.circle
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            stroke="url(#gradient)"
                            strokeWidth="12"
                            strokeLinecap="round"
                            fill="transparent"
                            r={radius}
                            cx="80"
                            cy="80"
                            className="drop-shadow-sm"
                            style={{ strokeDasharray: circumference }}
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#22d3ee" /> {/* Cyan-400 */}
                                <stop offset="100%" stopColor="#3b82f6" /> {/* Blue-500 */}
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-black text-slate-800 tracking-tight">LVL 5</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#5B86E5]">Scholar</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-center">
                <div className="text-sm font-bold text-slate-400">
                    <span className="text-slate-800">1,240</span> / 1,500 XP
                </div>
                <div className="mt-1 text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                    +120 XP today
                </div>
            </div>
        </div>
    );
}
