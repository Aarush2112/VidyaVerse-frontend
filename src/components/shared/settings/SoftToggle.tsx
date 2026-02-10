"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SoftToggleProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
}

export function SoftToggle({ checked, onCheckedChange }: SoftToggleProps) {
    return (
        <button
            onClick={() => onCheckedChange(!checked)}
            className={cn(
                "relative h-8 w-14 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
                checked
                    ? "bg-gradient-to-r from-blue-400 to-indigo-500"
                    : "bg-slate-200"
            )}
        >
            <motion.div
                className="h-6 w-6 rounded-full bg-white shadow-sm"
                layout
                transition={{
                    type: "spring",
                    stiffness: 700,
                    damping: 30
                }}
                animate={{
                    x: checked ? 24 : 0
                }}
            />
        </button>
    );
}
