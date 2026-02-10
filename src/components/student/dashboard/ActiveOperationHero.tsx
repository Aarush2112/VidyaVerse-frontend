"use client";

import React from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ActiveOperationHeroProps {
    courseTitle: string;
    moduleTitle: string;
    progress: number;
    lastAccessedLabel: string;
    resumeLink: string;
}

import { NeuCard } from "@/components/neu/NeuCard";
import { NeuButton } from "@/components/neu/NeuButton";

export function ActiveOperationHero({
    courseTitle,
    moduleTitle,
    progress,
    lastAccessedLabel,
    resumeLink
}: ActiveOperationHeroProps) {
    return (
        <NeuCard className="w-full relative overflow-hidden group">
            {/* Glass Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.03] to-cyan-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex flex-col md:flex-row items-end justify-between gap-8 relative z-10">
                <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-neu-accent shadow-neu-convex-sm animate-pulse" />
                        <span className="text-xs font-bold text-neu-accent uppercase tracking-[0.2em] font-mono">
                            Active Operation
                        </span>
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-neu-text-main font-serif tracking-tight mb-2 neu-text-chiselled">
                            {moduleTitle}
                        </h2>
                        <p className="text-neu-text-sub font-medium text-lg">
                            {courseTitle}
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="max-w-md w-full space-y-2 pt-2">
                        <div className="flex justify-between text-xs font-bold text-neu-text-sub uppercase tracking-wider">
                            <span>Progress</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="h-3 w-full bg-neu-base shadow-neu-concave-md rounded-full overflow-hidden border-none">
                            <motion.div
                                className="h-full bg-neu-accent shadow-[0_0_10px_rgba(124,58,237,0.4)]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                        </div>
                    </div>
                </div>

                {/* Resume Button */}
                <Link href={resumeLink}>
                    <NeuButton className="h-14 px-8 rounded-neu font-bold tracking-wide hover:scale-105 active:scale-95 text-white bg-neu-accent hover:bg-neu-accent/90">
                        <div className="bg-white/20 p-1 rounded-full mr-2">
                            <Play size={18} fill="currentColor" className="ml-0.5" />
                        </div>
                        <span>Resume Operation</span>
                    </NeuButton>
                </Link>
            </div>
        </NeuCard>
    );
}
