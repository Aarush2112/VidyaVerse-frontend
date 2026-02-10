"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SoftBadgeProps {
    children: React.ReactNode;
    variant: "excellent" | "at-risk" | "average";
}

export function SoftBadge({ children, variant }: SoftBadgeProps) {
    const variants = {
        excellent: "bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/10", // Emerald-50 / Emerald-700
        "at-risk": "bg-[#FFF1F2] text-[#BE123C] border border-[#BE123C]/10", // Rose-50 / Rose-700
        average: "bg-[#F3E8FF] text-[#7E22CE] border border-[#7E22CE]/10", // Purple-50 / Purple-700
    };

    return (
        <span
            className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300",
                variants[variant]
            )}
        >
            {children}
        </span>
    );
}
