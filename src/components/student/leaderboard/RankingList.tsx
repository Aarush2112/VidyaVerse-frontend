"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface RankingData {
    rank: number;
    name: string;
    avatar?: string;
    batch: string;
    trend: "up" | "down" | "stable";
    totalXP: number;
}

const MOCK_RANKINGS: RankingData[] = [
    { rank: 4, name: "Sanya K.", batch: "CSE-A", trend: "up", totalXP: 10500 },
    { rank: 5, name: "Kabir M.", batch: "AI-B", trend: "stable", totalXP: 9800 },
    { rank: 6, name: "Riya J.", batch: "CSE-C", trend: "down", totalXP: 9200 },
    { rank: 7, name: "Arjun V.", batch: "AI-A", trend: "up", totalXP: 8900 },
    { rank: 8, name: "Tara S.", batch: "CSE-B", trend: "up", totalXP: 8700 },
    { rank: 9, name: "Dev P.", batch: "AI-B", trend: "stable", totalXP: 8500 },
    { rank: 10, name: "Nisha T.", batch: "CSE-A", trend: "down", totalXP: 8200 },
];

export function RankingList() {
    return (
        <div className="w-full max-w-5xl mx-auto mt-12 mb-32 space-y-4 px-4 overflow-hidden">
            {/* Header Row */}
            <div className="flex items-center px-8 py-3 bg-zinc-900/40 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                <span className="w-16">Rank</span>
                <span className="flex-1">Cadet</span>
                <span className="w-24 text-center">Batch</span>
                <span className="w-20 text-center">Trend</span>
                <span className="w-32 text-right">Total XP</span>
            </div>

            {/* Matrix Items */}
            <div className="space-y-2">
                {MOCK_RANKINGS.map((item, idx) => (
                    <motion.div
                        key={item.rank}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className={cn(
                            "flex items-center h-16 px-8 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all duration-300 group cursor-default",
                            idx % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"
                        )}
                    >
                        {/* Rank */}
                        <span className="w-16 font-mono font-bold text-lg text-zinc-600 group-hover:text-indigo-400 transition-colors">
                            #{item.rank}
                        </span>

                        {/* Cadet */}
                        <div className="flex-1 flex items-center gap-4">
                            <Avatar className="h-10 w-10 border border-white/10 group-hover:border-indigo-500/50 transition-colors">
                                <AvatarImage src={item.avatar} />
                                <AvatarFallback className="bg-zinc-800 text-xs font-bold">{item.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-bold text-zinc-100 italic tracking-tight">{item.name}</span>
                        </div>

                        {/* Batch */}
                        <span className="w-24 text-center text-xs font-mono text-zinc-500">{item.batch}</span>

                        {/* Trend */}
                        <div className="w-20 flex justify-center">
                            {item.trend === "up" && <TrendingUp className="h-4 w-4 text-emerald-500" />}
                            {item.trend === "down" && <TrendingDown className="h-4 w-4 text-rose-500" />}
                            {item.trend === "stable" && <Minus className="h-4 w-4 text-zinc-500" />}
                        </div>

                        {/* Total XP */}
                        <span className="w-32 text-right font-mono font-black text-indigo-400">
                            {item.totalXP.toLocaleString()}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Fade */}
            <div className="h-20 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
        </div>
    );
}
