"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface ThemePreviewCardProps {
    theme: "light" | "dim" | "system";
    isSelected: boolean;
    onSelect: () => void;
}

export function ThemePreviewCard({ theme, isSelected, onSelect }: ThemePreviewCardProps) {
    const isDark = theme === "dim";
    const isSystem = theme === "system";

    return (
        <button
            onClick={onSelect}
            className={cn(
                "group relative w-full aspect-[4/3] rounded-2xl border-2 transition-all overflow-hidden text-left bg-slate-50",
                isSelected
                    ? "border-blue-500 ring-4 ring-blue-500/10 shadow-lg shadow-blue-500/10"
                    : "border-slate-200 hover:border-slate-300 hover:shadow-md"
            )}
        >
            {/* Illustration Canvas */}
            <div className={cn(
                "absolute inset-0 p-3 flex flex-col gap-2",
                isDark ? "bg-slate-900" : isSystem ? "bg-gradient-to-br from-white to-slate-900" : "bg-white"
            )}>
                {/* Header-ish */}
                <div className="flex gap-2">
                    <div className={cn("h-2 w-1/3 rounded-full opacity-20", isDark ? "bg-white" : "bg-black")} />
                </div>

                <div className="flex gap-2 h-full">
                    {/* Sidebar */}
                    <div className={cn("w-1/4 h-full rounded-lg opacity-10", isDark ? "bg-white" : "bg-black")} />

                    {/* Content */}
                    <div className="flex-1 flex flex-col gap-2">
                        <div className={cn("h-1/2 w-full rounded-lg opacity-10", isDark ? "bg-white" : "bg-blue-500")} />
                        <div className="flex gap-2 h-1/2">
                            <div className={cn("flex-1 rounded-lg opacity-5", isDark ? "bg-white" : "bg-black")} />
                            <div className={cn("flex-1 rounded-lg opacity-5", isDark ? "bg-white" : "bg-black")} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Selection Indicator */}
            <div className={cn(
                "absolute bottom-3 right-3 transition-opacity duration-300",
                isSelected ? "opacity-100" : "opacity-0"
            )}>
                <div className="bg-blue-500 text-white rounded-full p-0.5 shadow-sm">
                    <CheckCircle2 size={20} fill="currentColor" className="text-white" />
                </div>
            </div>

            {/* Label Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/5 to-transparent">
                {/* Invisible spacer just to push content if needed, but here visuals handle it */}
            </div>

            {isSelected && (
                <motion.div
                    layoutId="theme-active-ring"
                    className="absolute inset-0 rounded-xl border-2 border-blue-500 pointer-events-none"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
        </button>
    );
}

export function ThemeLabel({ label, isSelected }: { label: string, isSelected: boolean }) {
    return (
        <div className={cn(
            "text-center text-sm font-medium mt-3 transition-colors",
            isSelected ? "text-blue-600" : "text-slate-500"
        )}>
            {label}
        </div>
    );
}
