"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";

interface SoftMetricCardProps {
    title: string;
    value: string;
    trend: string;
    isUp: boolean;
    data: { value: number }[];
    icon: LucideIcon;
    accentColor: "lavender" | "coral" | "sage";
}

export function SoftMetricCard({ title, value, trend, isUp, data, icon: Icon, accentColor }: SoftMetricCardProps) {
    const accentMap = {
        lavender: {
            bg: "bg-[#E8E4F3]",
            text: "text-[#6B50D6]",
            glow: "shadow-purple-500/5",
            chart: "#6B50D6"
        },
        coral: {
            bg: "bg-[#FCE8E3]",
            text: "text-[#E67E22]",
            glow: "shadow-orange-500/5",
            chart: "#E67E22"
        },
        sage: {
            bg: "bg-[#F0F4E3]",
            text: "text-[#82B541]",
            glow: "shadow-green-500/5",
            chart: "#82B541"
        }
    };

    const color = accentMap[accentColor];

    return (
        <motion.div
            whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.08)" }}
            className={cn(
                "p-8 rounded-[32px] bg-white border border-slate-100 relative overflow-hidden flex flex-col gap-6 soft-shadow-md transition-all",
                color.glow
            )}
        >
            <div className="flex items-start justify-between relative z-10">
                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center", color.bg, color.text)}>
                    <Icon className="h-6 w-6" />
                </div>
                <div className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest transition-all",
                    isUp ? "bg-emerald-50/50 text-emerald-600 border border-emerald-100" : "bg-rose-50/50 text-rose-600 border border-rose-100"
                )}>
                    {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {trend}
                </div>
            </div>

            <div className="space-y-1 relative z-10">
                <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">{title}</h3>
                <div className="text-4xl font-bold text-slate-900 tracking-tight">{value}</div>
            </div>

            {/* Micro Chart */}
            <div className="h-24 w-full mt-2 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id={`color-${accentColor}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color.chart} stopOpacity={0.2} />
                                <stop offset="95%" stopColor={color.chart} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={color.chart}
                            strokeWidth={3}
                            fillOpacity={1}
                            fill={`url(#color-${accentColor})`}
                            animationDuration={2000}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}
