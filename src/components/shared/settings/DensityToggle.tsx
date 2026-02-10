"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DensityToggleProps {
    value: "comfortable" | "compact";
    onChange: (val: "comfortable" | "compact") => void;
}

export function DensityToggle({ value, onChange }: DensityToggleProps) {
    return (
        <div className="bg-slate-100 p-1 rounded-full flex relative w-full h-12 max-w-sm">
            {/* Active Background Pill */}
            <motion.div
                className="absolute top-1 bottom-1 bg-white rounded-full shadow-sm z-0"
                initial={false}
                animate={{
                    x: value === "comfortable" ? 0 : "100%",
                    width: "50%"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />

            <button
                onClick={() => onChange("comfortable")}
                className={cn(
                    "flex-1 relative z-10 flex items-center justify-center text-sm font-medium transition-colors rounded-full",
                    value === "comfortable" ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
                )}
            >
                Comfortable
            </button>
            <button
                onClick={() => onChange("compact")}
                className={cn(
                    "flex-1 relative z-10 flex items-center justify-center text-sm font-medium transition-colors rounded-full",
                    value === "compact" ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
                )}
            >
                Compact
            </button>
        </div>
    );
}
