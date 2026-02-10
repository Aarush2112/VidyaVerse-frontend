"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface RankingRowProps {
    rank: number;
    user: {
        name: string;
        xp: number;
        avatar: string;
        batch: string;
        trend: "up" | "down" | "neutral";
    };
    isCurrentUser?: boolean;
}

export const RankingRow = ({ rank, user, isCurrentUser = false }: RankingRowProps) => {

    const TrendIcon = user.trend === "up" ? TrendingUp : user.trend === "down" ? TrendingDown : Minus;
    const trendColor = user.trend === "up" ? "text-emerald-400" : user.trend === "down" ? "text-red-400" : "text-slate-500";

    const variants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <motion.div
            variants={variants}
            className={`
                group flex items-center justify-between p-4 rounded-xl mb-2 backdrop-blur-md border border-transparent transition-all duration-200
                ${isCurrentUser
                    ? "bg-indigo-500/20 border-indigo-500/50 hover:bg-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                    : "bg-white/5 hover:bg-white/10 hover:border-white/10 hover:scale-[1.01]"
                }
            `}
        >
            <div className="flex items-center gap-4 md:gap-6">
                <div className="w-8 text-center font-mono text-slate-400 font-bold text-lg group-hover:text-white transition-colors">
                    #{rank.toString().padStart(2, '0')}
                </div>

                <div className={`flex flex-col items-center justify-center ${trendColor} text-xs`}>
                    <TrendIcon className="h-3 w-3" />
                </div>

                <div className="flex items-center gap-3">
                    <Avatar className={`h-10 w-10 border ${isCurrentUser ? "border-indigo-400" : "border-slate-700"}`}>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-slate-800 text-slate-200">{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h4 className={`font-bold ${isCurrentUser ? "text-indigo-300" : "text-white"}`}>{user.name} {isCurrentUser && "(You)"}</h4>
                        <span className="text-xs text-slate-500 bg-slate-900/50 px-2 py-0.5 rounded border border-slate-800">
                            {user.batch}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="text-right">
                    <p className="font-mono font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">
                        {user.xp.toLocaleString()} XP
                    </p>
                </div>
            </div>
        </motion.div>
    )
}
