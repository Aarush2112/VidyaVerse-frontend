"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, Minus } from "lucide-react";
import { motion } from "framer-motion";

interface RankCapsuleProps {
    rank: number;
    name: string;
    xp: number;
    avatar: string;
    trend?: "up" | "down" | "stable";
    isMe?: boolean;
}

export function RankCapsule({ rank, name, xp, avatar, trend = "stable", isMe, label = "XP" }: RankCapsuleProps & { label?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, scale: 1.01 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", bounce: 0.4 }}
            className={cn(
                "group flex items-center gap-4 p-3 pr-6 rounded-full transition-all duration-300",
                "bg-white border border-slate-100/50",
                "shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)]",
                isMe && "ring-2 ring-blue-500/20 bg-blue-50/30"
            )}
        >
            {/* Rank Circle */}
            <div className={cn(
                "h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center font-bold text-sm shadow-inner",
                rank <= 10 ? "bg-blue-100 text-blue-600" : "bg-slate-50 text-slate-500"
            )}>
                {rank}
            </div>

            {/* Avatar */}
            <div className="relative">
                <div className="h-10 w-10 rounded-full overflow-hidden p-[2px] bg-white shadow-sm ring-1 ring-slate-100">
                    <img src={avatar} alt={name} className="h-full w-full object-cover rounded-full" />
                </div>
                {rank <= 3 && (
                    <div className="absolute -top-1 -right-1 text-base drop-shadow-sm">
                        {rank === 1 ? "👑" : rank === 2 ? "🥈" : "🥉"}
                    </div>
                )}
            </div>

            {/* Name & Identity */}
            <div className="flex-1 min-w-0">
                <h4 className={cn(
                    "font-bold truncate",
                    isMe ? "text-blue-900" : "text-slate-800"
                )}>
                    {name} {isMe && <span className="text-xs font-normal text-slate-400 ml-2">(You)</span>}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <span>Level {Math.floor(xp / 1000) + 1}</span>
                    <span className="h-0.5 w-0.5 rounded-full bg-slate-300" />
                    <span className="flex items-center gap-1">
                        {trend === "up" ? (
                            <span className="text-emerald-500 flex items-center">
                                <TrendingUp size={10} className="mr-0.5" /> Rising
                            </span>
                        ) : (
                            <span className="text-slate-400 flex items-center">
                                <Minus size={10} className="mr-0.5" /> Stable
                            </span>
                        )}
                    </span>
                </div>
            </div>

            {/* XP Score */}
            <div className="text-right">
                <div className="text-sm font-black text-slate-700 tabular-nums tracking-tight">
                    {xp.toLocaleString()}
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {label}
                </div>
            </div>
        </motion.div>
    );
}
