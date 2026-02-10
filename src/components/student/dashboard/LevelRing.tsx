"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import CountUp from "react-countup";

interface LevelRingProps {
    level: number;
    xp: number;
    nextLevelXp?: number;
}

import { NeuCard } from "@/components/neu/NeuCard";

export function LevelRing({ level, xp, nextLevelXp = 15000 }: LevelRingProps) {
    const percentage = Math.min((xp / nextLevelXp) * 100, 100);
    const radius = 90;
    const stroke = 12;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <NeuCard className="h-full relative overflow-hidden flex flex-col items-center justify-center">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />

            {/* SVG Ring */}
            <div className="relative mb-4">
                <svg
                    height={radius * 2}
                    width={radius * 2}
                    className="rotate-[-90deg] transition-all duration-1000 ease-out"
                >
                    {/* Track - Neumorphic concave feel via darker stroke or inner shadow simulated via color */}
                    <circle
                        stroke="#d1d9e6"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        fill="transparent"
                        className="opacity-50"
                    />
                    {/* Progress */}
                    <motion.circle
                        stroke="#7C3AED"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        strokeLinecap="round"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        fill="transparent"
                        filter="drop-shadow(0 0 4px rgba(124, 58, 237, 0.5))"
                    />
                </svg>

                {/* Inner Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-extrabold text-neu-accent font-[Poppins] tracking-tight neu-text-chiselled">
                        LVL {level}
                    </span>
                    <span className="px-3 py-1 bg-neu-base shadow-neu-concave-sm text-neu-text-sub text-[10px] font-bold uppercase tracking-widest rounded-full mt-2">
                        Scholar
                    </span>
                </div>
            </div>

            {/* XP Count */}
            <div className="text-center">
                <div className="text-2xl font-bold text-neu-text-main font-mono neu-text-chiselled">
                    <CountUp end={xp} duration={2} separator="," /> XP
                </div>
                <div className="text-xs text-neu-text-sub font-medium mt-1">
                    next level at {nextLevelXp.toLocaleString()}
                </div>
            </div>
        </NeuCard>
    );
}
