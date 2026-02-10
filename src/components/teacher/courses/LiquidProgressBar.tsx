"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LiquidProgressBarProps {
    value: number; // 0-100
    className?: string;
    label?: string;
}

export function LiquidProgressBar({ value, className, label }: LiquidProgressBarProps) {
    return (
        <div className={cn("space-y-2", className)}>
            {label && (
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <span>{label}</span>
                    <span className="text-slate-900">{value}% Complete</span>
                </div>
            )}
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1.5, ease: "circOut", bounce: 0.2 }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 shadow-[0_0_10px_rgba(56,189,248,0.4)]"
                />
            </div>
        </div>
    );
}
