"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PastelBadgeProps {
    children: React.ReactNode;
    variant: "excellent" | "at-risk" | "average";
}

export function PastelBadge({ children, variant }: PastelBadgeProps) {
    const variants = {
        excellent: "bg-emerald-500/10 text-emerald-200 border-emerald-500/20",
        "at-risk": "bg-rose-500/10 text-rose-200 border-rose-500/20",
        average: "bg-blue-500/10 text-blue-200 border-blue-500/20",
    };

    return (
        <span
            className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-300",
                variants[variant]
            )}
        >
            {children}
        </span>
    );
}
