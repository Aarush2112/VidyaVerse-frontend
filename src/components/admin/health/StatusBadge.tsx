"use strict";
import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
    status: 'OPERATIONAL' | 'DEGRADED' | 'DOWN' | 'MAINTENANCE';
    className?: string;
    showText?: boolean;
}

export const StatusBadge = ({ status, className, showText = true }: StatusBadgeProps) => {
    const styles = {
        OPERATIONAL: {
            dot: "bg-emerald-500",
            pill: "bg-emerald-50 border-emerald-100 text-emerald-600",
            glow: "shadow-emerald-500/10"
        },
        DEGRADED: {
            dot: "bg-amber-500",
            pill: "bg-amber-50 border-amber-100 text-amber-600",
            glow: "shadow-amber-500/10"
        },
        DOWN: {
            dot: "bg-rose-500",
            pill: "bg-rose-50 border-rose-100 text-rose-600",
            glow: "shadow-rose-500/10"
        },
        MAINTENANCE: {
            dot: "bg-indigo-500",
            pill: "bg-indigo-50 border-indigo-100 text-indigo-600",
            glow: "shadow-indigo-500/10"
        }
    };

    const current = styles[status] || styles.OPERATIONAL;

    return (
        <div className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all",
            current.pill,
            className
        )}>
            <div className="relative flex items-center justify-center w-2 h-2">
                <div className={cn("absolute w-full h-full rounded-full animate-ping opacity-75", current.dot)} />
                <div className={cn("relative w-2 h-2 rounded-full", current.dot)} />
            </div>
            {showText && (
                <span className="text-[10px] font-bold tracking-widest uppercase">
                    {status}
                </span>
            )}
        </div>
    );
};
