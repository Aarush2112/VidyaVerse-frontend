"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ChevronUp } from "lucide-react";

interface StickyUserRankProps {
    ranK: number;
    xp: number;
    nextRankXp: number;
    avatar: string;
    name: string;
}

export const StickyUserRank = ({ ranK, xp, nextRankXp, avatar, name }: StickyUserRankProps) => {
    const progress = (xp / nextRankXp) * 100;
    const remaining = nextRankXp - xp;

    return (
        <div className="fixed bottom-0 left-0 md:left-[80px] lg:left-[80px] right-0 z-50 bg-slate-900/90 backdrop-blur-xl border-t border-indigo-500/30 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
            <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-col items-center justify-center h-12 w-12 bg-indigo-500/20 rounded-lg border border-indigo-500/50">
                        <span className="text-xs text-indigo-300 font-mono">RANK</span>
                        <span className="text-lg font-bold text-white">#{ranK}</span>
                    </div>

                    <Avatar className="h-10 w-10 border-2 border-indigo-500 ring-2 ring-indigo-500/20">
                        <AvatarImage src={avatar} />
                        <AvatarFallback>ME</AvatarFallback>
                    </Avatar>

                    <div className="hidden md:block">
                        <h4 className="text-white font-bold">{name}</h4>
                        <p className="text-xs text-indigo-300">Keep pushing to reach Top {Math.max(1, Math.floor(ranK / 10) * 10)}!</p>
                    </div>
                </div>

                {/* Progress Stats */}
                <div className="flex-1 max-w-md">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-xs text-slate-400">Current XP: <span className="text-white font-mono">{xp.toLocaleString()}</span></span>
                        <span className="text-xs text-indigo-400 font-bold flex items-center">
                            <ChevronUp className="h-3 w-3 mr-1" />
                            {remaining.toLocaleString()} to rank up
                        </span>
                    </div>
                    <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-600 to-cyan-400 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
