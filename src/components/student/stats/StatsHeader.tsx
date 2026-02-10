"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStatsStore, TimeRange } from "@/lib/store/useStatsStore";
import { Button } from "@/components/ui/button";

const RANGES: TimeRange[] = ["7d", "30d", "semester", "all"];

export function StatsHeader() {
    const { timeRange, setTimeRange } = useStatsStore();

    return (
        <motion.header
            className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/50 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
        >
            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
                <div>
                    <h1 className="text-2xl font-bold text-violet-900 tracking-tight">Performance Analytics</h1>
                    <p className="text-xs text-slate-500 font-medium hidden md:block">Track your growth and learning velocity.</p>
                </div>
            </div>

            {/* Center: Jelly Segmented Control */}
            <div className="flex bg-slate-100/80 p-1 rounded-full relative overflow-x-auto no-scrollbar max-w-full">
                {RANGES.map((r) => (
                    <button
                        key={r}
                        onClick={() => setTimeRange(r)}
                        className={cn(
                            "relative px-4 py-1.5 text-xs font-bold rounded-full transition-colors z-10 whitespace-nowrap uppercase tracking-wider",
                            timeRange === r ? "text-violet-900" : "text-slate-500 hover:text-slate-700"
                        )}
                    >
                        {timeRange === r && (
                            <motion.div
                                layoutId="statsFilter"
                                className="absolute inset-0 bg-white rounded-full shadow-sm"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                        {r === 'all' ? 'All Time' : r}
                    </button>
                ))}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="hidden md:flex text-slate-500 hover:text-violet-600">
                    <Share2 size={16} />
                </Button>
                <Button size="sm" className="bg-white text-violet-600 border border-violet-100 shadow-sm hover:bg-violet-50 rounded-full font-bold">
                    <Download size={16} className="mr-2" /> Report
                </Button>
            </div>
        </motion.header>
    );
}
