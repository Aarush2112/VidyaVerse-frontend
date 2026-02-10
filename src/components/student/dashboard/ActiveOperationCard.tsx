"use client";

import { motion } from "framer-motion";
import { Play, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface ActiveOperationCardProps {
    courseTitle: string;
    moduleTitle: string;
    progress: number;
    lastAccessed: string;
}

export const ActiveOperationCard = ({
    courseTitle,
    moduleTitle,
    progress,
    lastAccessed
}: ActiveOperationCardProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            className="md:col-span-2 relative bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 md:p-8 overflow-hidden group hover:border-cyan-500/30 transition-colors"
        >
            <div className="relative z-10 flex flex-col justify-between h-full gap-6">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Active Operation</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{moduleTitle}</h2>
                        <p className="text-slate-400 text-sm">{courseTitle}</p>
                    </div>
                    <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 bg-cyan-500/5 hidden md:flex">
                        <Activity className="h-3 w-3 mr-1" /> In Progress
                    </Badge>
                </div>

                {/* Progress & Action */}
                <div className="space-y-4">
                    <div className="flex justify-between text-xs text-slate-400 font-mono">
                        <span>SYSTEM PROGRESS</span>
                        <span>{progress}% COMPLETE</span>
                    </div>

                    <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                        />
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                        <Button size="lg" className="flex-1 bg-white text-black hover:bg-cyan-400 hover:text-black font-bold h-12 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all">
                            <Play className="h-5 w-5 mr-2 fill-black" /> RESUME OPERATION
                        </Button>
                        <span className="text-xs text-slate-500 font-mono hidden md:block">
                            LAST LOGIN: {lastAccessed}
                        </span>
                    </div>
                </div>
            </div>

            {/* Background Effects */}
            <div className="absolute right-0 bottom-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
            <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat transition-[background-position_0s] duration-0 animate-[shimmer_5s_infinite] pointer-events-none" />
        </motion.div>
    )
}
