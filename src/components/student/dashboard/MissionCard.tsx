"use client";

import { motion } from "framer-motion";
import { Play, BookOpen, Clock } from "lucide-react";
import { HoloCard } from "./HoloCard";

export function MissionCard() {
    return (
        <HoloCard className="h-full flex flex-col justify-between">
            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#5B86E5] block">Current Learning</span>
                        <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                            Mastering Server Actions
                        </h3>
                        <p className="text-xs text-slate-400 font-semibold">Module 3: Advanced Next.js Patterns</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100">
                        <BookOpen className="h-6 w-6 text-[#5B86E5]" />
                    </div>
                </div>

                {/* Video Placeholder */}
                <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 group/video cursor-pointer shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#5B86E5]/10 to-[#36D1DC]/10 mix-blend-overlay" />
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-white/80 to-transparent">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            <Clock className="h-3 w-3" /> 12:45 remaining
                        </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-[2px] opacity-0 group-hover/video:opacity-100 transition-all transition-duration-500">
                        <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center shadow-xl shadow-blue-500/20">
                            <Play className="h-6 w-6 text-[#5B86E5] fill-[#5B86E5] ml-1" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-8 space-y-3">
                <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-slate-400">Module Progress</span>
                    <span className="text-[#5B86E5]">45% Complete</span>
                </div>
                {/* Rounded Progress Bar */}
                <div className="relative h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "45%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-[#5B86E5] to-[#36D1DC] shadow-sm shadow-blue-500/20"
                    />
                </div>
            </div>
        </HoloCard>
    );
}
