"use client";

import { motion } from "framer-motion";
import { Share2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PlayerConsole() {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="max-w-5xl mx-auto bg-zinc-950/80 backdrop-blur-2xl border-t border-x border-indigo-500/30 rounded-t-2xl shadow-[0_-10px_40px_rgba(99,102,241,0.1)] overflow-hidden"
            >
                {/* Neon Top Border */}
                <div className="h-0.5 w-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,1)]" />

                <div className="flex items-center justify-between p-6 gap-8">
                    {/* Left: Your Rank */}
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-black tracking-widest text-zinc-500">Your Standing</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-mono font-black italic text-zinc-100 italic tracking-tighter">#42</span>
                                <span className="text-xs text-emerald-500 font-bold tracking-tight">Top 5%</span>
                            </div>
                        </div>
                    </div>

                    {/* Middle: Progress Bar */}
                    <div className="flex-1 max-w-md hidden md:block">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-500 flex items-center gap-1.5">
                                <Zap className="h-3 w-3 text-amber-400" /> Apex Evolution
                            </span>
                            <span className="text-[10px] font-mono font-bold text-indigo-400 italic">850 XP TO #41</span>
                        </div>
                        <div className="h-2 w-full bg-zinc-900 rounded-full border border-white/5 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "65%" }}
                                transition={{ duration: 1, delay: 1 }}
                                className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400"
                            />
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3">
                        <Button
                            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-11 px-6 shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all"
                        >
                            <Share2 className="h-4 w-4 mr-2" /> Share Rank
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
