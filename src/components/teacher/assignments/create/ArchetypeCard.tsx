"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ArchetypeCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    isSelected: boolean;
    onClick: () => void;
    color: "blue" | "purple" | "orange";
}

export function ArchetypeCard({
    title,
    description,
    icon: Icon,
    isSelected,
    onClick,
    color
}: ArchetypeCardProps) {
    const colorStyles = {
        blue: "bg-blue-50 text-blue-600 border-blue-200 group-hover:border-blue-300",
        purple: "bg-purple-50 text-purple-600 border-purple-200 group-hover:border-purple-300",
        orange: "bg-orange-50 text-orange-600 border-orange-200 group-hover:border-orange-300",
    };

    const ringStyles = {
        blue: "ring-blue-400/50",
        purple: "ring-purple-400/50",
        orange: "ring-orange-400/50",
    };

    return (
        <motion.div
            onClick={onClick}
            whileHover={{ y: -4 }}
            className={cn(
                "relative group cursor-pointer p-6 rounded-3xl border-2 transition-all duration-300 h-full flex flex-col items-start gap-4",
                "bg-white backdrop-blur-sm shadow-sm hover:shadow-md",
                isSelected
                    ? `border-transparent ring-4 ${ringStyles[color]} shadow-xl scale-[1.02]`
                    : "border-slate-100 hover:border-slate-200"
            )}
        >
            <div className={cn(
                "h-14 w-14 rounded-2xl flex items-center justify-center transition-colors",
                colorStyles[color],
                isSelected ? "shadow-inner" : ""
            )}>
                <Icon size={28} strokeWidth={2.5} />
            </div>

            <div>
                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors">
                    {title}
                </h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                    {description}
                </p>
            </div>

            {isSelected && (
                <motion.div
                    layoutId="selected-check"
                    className="absolute top-4 right-4 h-6 w-6 bg-slate-900 rounded-full flex items-center justify-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3 h-3 text-white"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </motion.div>
            )}
        </motion.div>
    );
}
