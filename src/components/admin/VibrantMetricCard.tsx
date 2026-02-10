"use client";

import React from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

interface VibrantMetricCardProps {
    title: string;
    value: string | number;
    trend: string;
    trendUp: boolean;
    icon: React.ElementType;
    color: "emerald" | "purple" | "orange";
    data: { value: number }[];
}

export function VibrantMetricCard({ title, value, trend, trendUp, icon: Icon, color, data }: VibrantMetricCardProps) {
    const colorStyles = {
        emerald: {
            bg: "bg-emerald-50",
            text: "text-emerald-600",
            chart: "#10b981",
            gradient: "from-emerald-500/20 to-emerald-500/0",
            pill: "bg-emerald-500 text-white"
        },
        purple: {
            bg: "bg-purple-50",
            text: "text-purple-600",
            chart: "#a855f7",
            gradient: "from-purple-500/20 to-purple-500/0",
            pill: "bg-purple-500 text-white"
        },
        orange: {
            bg: "bg-orange-50",
            text: "text-orange-600",
            chart: "#f97316",
            gradient: "from-orange-500/20 to-orange-500/0",
            pill: "bg-orange-500 text-white"
        }
    };

    const style = colorStyles[color];

    return (
        <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-between h-[180px] hover:shadow-lg transition-all duration-300 group overflow-hidden relative">
            <div className="flex justify-between items-start z-10">
                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shadow-sm", style.bg, style.text)}>
                    <Icon size={24} strokeWidth={2.5} className={cn(color === "orange" && "animate-pulse")} />
                </div>
                <div className={cn(
                    "text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm uppercase tracking-wide",
                    style.pill
                )}>
                    {trendUp ? "↑" : "↓"} {trend}
                </div>
            </div>

            <div className="flex justify-between items-end mt-4 relative z-10">
                <div>
                    <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{value}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">{title}</p>
                </div>
            </div>

            {/* Chart Background */}
            <div className="absolute bottom-0 left-0 right-0 h-24 opacity-40 group-hover:opacity-60 transition-opacity">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={style.chart} stopOpacity={0.4} />
                                <stop offset="95%" stopColor={style.chart} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={style.chart}
                            fill={`url(#gradient-${color})`}
                            strokeWidth={3}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
