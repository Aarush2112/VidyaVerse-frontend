"use client";

import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, YAxis } from "recharts";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    subtext?: string;
    trend?: "up" | "down" | "neutral";
    trendValue?: string;
    data?: any[]; // For sparklines
    icon?: any;
    color?: string; // Hex or tailwind class text-color
}

const dummyData = [
    { v: 10 }, { v: 12 }, { v: 15 }, { v: 13 }, { v: 18 }, { v: 24 }, { v: 30 }
];

export const StatCard = ({
    title,
    value,
    subtext,
    trend = "neutral",
    trendValue,
    data = dummyData,
    icon: Icon = Trophy,
    color = "#8b5cf6" // Violet
}: StatCardProps) => {

    const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
    const trendColor = trend === "up" ? "text-emerald-400" : trend === "down" ? "text-red-400" : "text-slate-400";

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="group relative h-full bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-5 overflow-hidden hover:border-slate-700 transition-all"
        >
            <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
                </div>
                <div className={`p-2 rounded-lg bg-white/5 border border-white/10 text-white ${color}`}>
                    <Icon className="h-5 w-5" />
                </div>
            </div>

            <div className="flex items-center gap-2 mb-2 relative z-10">
                {trendValue && (
                    <span className={`flex items-center text-xs font-bold ${trendColor}`}>
                        <TrendIcon className="h-3 w-3 mr-1" />
                        {trendValue}
                    </span>
                )}
                {subtext && <span className="text-slate-500 text-xs">{subtext}</span>}
            </div>

            {/* Sparkline Chart */}
            <div className="absolute bottom-0 left-0 right-0 h-16 opacity-30 group-hover:opacity-50 transition-opacity">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area
                            type="monotone"
                            dataKey="v"
                            stroke={color}
                            fill={`url(#gradient-${title})`}
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Hover Glow */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${color} to-transparent opacity-0 group-hover:opacity-5 blur-2xl transition-opacity duration-500 pointer-events-none`} />
        </motion.div>
    )
}
