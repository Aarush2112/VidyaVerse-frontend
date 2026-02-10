"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ColorSwatchProps {
    color: string;
    label: string;
    isSelected: boolean;
    onSelect: () => void;
    isCustom?: boolean;
}

export function ColorSwatch({ color, label, isSelected, onSelect, isCustom }: ColorSwatchProps) {
    return (
        <div className="flex flex-col items-center gap-2 group">
            <button
                onClick={onSelect}
                className={cn(
                    "relative h-12 w-12 rounded-full flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2",
                    isSelected ? "ring-2 ring-offset-2 ring-slate-400" : "hover:ring-2 hover:ring-slate-100"
                )}
                style={{ backgroundColor: isCustom ? undefined : color }}
                title={label}
            >
                {isCustom && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 via-green-500 to-blue-500 opacity-80" />
                )}

                {isSelected && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-white/20 backdrop-blur-sm rounded-full p-1"
                    >
                        <Check size={16} className="text-white drop-shadow-sm" strokeWidth={3} />
                    </motion.div>
                )}
            </button>
            <span className={cn(
                "text-xs font-medium transition-colors",
                isSelected ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"
            )}>
                {label}
            </span>
        </div>
    );
}
