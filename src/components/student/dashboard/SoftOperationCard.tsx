"use client";

import { motion } from "framer-motion";
import { Play, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SoftOperationCardProps {
    courseTitle: string;
    moduleTitle: string;
    progress: number;
    lastAccessed: string;
}

export function SoftOperationCard({
    courseTitle,
    moduleTitle,
    progress,
    lastAccessed
}: SoftOperationCardProps) {
    return (
        <div className="bg-white p-8 rounded-[40px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] border border-slate-100 relative overflow-hidden h-full flex flex-col group">
            {/* Ambient background wash */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-12 right-12 w-64 h-64 bg-purple-500/[0.03] blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#5B86E5]">Active Operation</span>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight leading-none pt-1">
                            {moduleTitle}
                        </h2>
                        <p className="text-slate-400 text-sm font-medium tracking-wide">
                            {courseTitle}
                        </p>
                    </div>
                    <div className="bg-blue-50/50 px-4 py-2 rounded-2xl border border-blue-100/50 flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-[#5B86E5]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#5B86E5]">{lastAccessed}</span>
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-center space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-end justify-between px-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Module Progress</span>
                            <span className="text-sm font-black text-slate-900">{progress}% <span className="text-slate-400 text-[10px] uppercase font-bold ml-1">Complete</span></span>
                        </div>
                        <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-0.5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1.5, ease: "circOut" }}
                                className="h-full bg-gradient-to-r from-[#5B86E5] to-[#36D1DC] rounded-full"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-6">
                        <Button className="flex-1 bg-gradient-to-r from-[#5B86E5] to-[#36D1DC] hover:shadow-xl hover:shadow-blue-500/30 text-white h-14 rounded-2xl font-bold flex items-center gap-3 transition-all hover:scale-[1.02] border-none">
                            <Play className="h-5 w-5 fill-white" />
                            Resume Operation
                        </Button>
                        <Button variant="outline" className="h-14 w-14 rounded-2xl border-slate-100 text-slate-400 hover:text-[#5B86E5] hover:bg-slate-50 soft-shadow-sm p-0">
                            <Sparkles className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
