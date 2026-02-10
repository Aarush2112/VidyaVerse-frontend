"use client";

import React from "react";

interface CircularScoreProps {
    score: number;
    size?: number;
    strokeWidth?: number;
}

export function CircularScore({ score, size = 40, strokeWidth = 3 }: CircularScoreProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background Ring */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    className="text-white/5"
                />
                {/* Progress Ring */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="text-violet-300 transition-all duration-1000 ease-out"
                />
            </svg>
            <span className="absolute text-[10px] font-bold text-white/80">{score}%</span>
        </div>
    );
}
