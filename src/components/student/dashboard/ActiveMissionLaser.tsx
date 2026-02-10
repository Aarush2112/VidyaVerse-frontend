"use client";

import { Play } from "lucide-react";
import { HolographicCard } from "./HolographicCard";
import { Button } from "@/components/ui/button";

interface ActiveMissionLaserProps {
    course: string;
    progress: number;
}

export const ActiveMissionLaser = ({ course, progress }: ActiveMissionLaserProps) => {
    return (
        <HolographicCard className="p-8 h-full flex flex-col justify-center relative group overflow-hidden" glowColor="#8b5cf6">
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <span className="inline-block px-2 py-1 rounded bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[10px] font-mono tracking-widest uppercase mb-2">
                        Current Objective
                    </span>
                    <h2 className="text-3xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                        {course}
                    </h2>
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-purple-500/10 rounded-full border border-purple-500/30 animate-pulse">
                    <Play className="h-5 w-5 text-purple-400 fill-purple-400" />
                </div>
            </div>

            {/* Laser Progress Bar */}
            <div className="relative h-1 w-full bg-slate-800 mb-8 overflow-visible">
                <div
                    className="absolute top-0 left-0 h-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)]"
                    style={{ width: `${progress}%` }}
                >
                    {/* Laser Head */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-[2px] shadow-[0_0_20px_rgba(168,85,247,1)]" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-20 bg-purple-400/50 blur-md" /> {/* Vertical Glare */}
                </div>
                <div className="absolute top-4 right-0 text-xs font-mono text-purple-400">
                    {progress}% SYNCED
                </div>
            </div>

            {/* Shiny Button */}
            <div className="relative z-10">
                <Button className="w-full h-12 bg-white text-black font-bold text-lg relative overflow-hidden group/btn hover:bg-slate-200 transition-colors">
                    <span className="relative z-10">RESUME MISSION</span>
                    {/* Shine Effect */}
                    <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg] group-hover/btn:animate-shine transition-all duration-1000" />
                </Button>
            </div>

            {/* Background Laser Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
        </HolographicCard>
    )
}
