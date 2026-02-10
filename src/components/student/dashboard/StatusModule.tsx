"use client";

import { motion } from "framer-motion";
import { Zap, AlertCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StatusModuleProps {
    xp: number;
    level?: number;
    pendingTasks: number;
    nextTask?: string;
}

export const StatusModule = ({ xp, level = 5, pendingTasks, nextTask }: StatusModuleProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            className="col-span-1 md:col-span-2 relative bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 overflow-hidden flex flex-col md:flex-row gap-6 group hover:border-cyan-500/30 transition-colors"
        >
            {/* Left Side: XP Reactor */}
            <div className="flex-1 flex items-center gap-6 border-b md:border-b-0 md:border-r border-slate-800 pb-4 md:pb-0 md:pr-4">
                <div className="relative h-20 w-20 flex items-center justify-center">
                    {/* Pulsing Outer Ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-[spin_10s_linear_infinite]" />
                    <div className="absolute inset-0 rounded-full border-t-2 border-cyan-400 animate-[spin_3s_linear_infinite] shadow-[0_0_15px_rgba(34,211,238,0.4)]" />

                    <Zap className="h-8 w-8 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                </div>

                <div>
                    <h3 className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-1">Total XP</h3>
                    <div className="text-3xl font-bold text-white font-mono tracking-tighter">
                        {xp.toLocaleString()} <span className="text-cyan-500 text-sm">LVL {level}</span>
                    </div>
                </div>
            </div>

            {/* Right Side: Mission Log */}
            <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-slate-400 text-xs font-mono uppercase tracking-widest">Mission Status</h3>
                    {pendingTasks > 0 ? (
                        <span className="flex items-center text-xs font-bold text-amber-400 animate-pulse">
                            <AlertCircle className="h-3 w-3 mr-1" /> {pendingTasks} PENDING
                        </span>
                    ) : (
                        <span className="text-xs font-bold text-emerald-400">ALL CLEAR</span>
                    )}
                </div>

                <div className="bg-black/40 rounded-lg p-3 border border-slate-800 flex items-center justify-between group/task hover:border-cyan-500/30 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                        <span className="text-sm text-slate-200 group-hover/task:text-cyan-400 transition-colors truncate max-w-[150px]">
                            {nextTask || "No active missions"}
                        </span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-slate-500 group-hover/task:text-white">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Background Grip Texture */}
            <div className="absolute top-0 right-0 p-4 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] inset-0 pointer-events-none" />
        </motion.div>
    )
}
