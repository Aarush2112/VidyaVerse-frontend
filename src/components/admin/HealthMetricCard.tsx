"use client";

import React from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

interface HealthMetricCardProps {
    title: string;
    value: string | number;
    trend: string;
    trendUp: boolean;
    icon: React.ElementType;
    color: "blue" | "purple" | "orange";
    data: { value: number }[];
}

export function HealthMetricCard({ title, value, trend, trendUp, icon: Icon, color, data }: HealthMetricCardProps) {
    const colorStyles = {
        blue: { bg: "bg-blue-50", text: "text-blue-600", chart: "#3b82f6" },
        purple: { bg: "bg-purple-50", text: "text-purple-600", chart: "#a855f7" },
        orange: { bg: "bg-orange-50", text: "text-orange-600", chart: "#f97316" }
    };

    const style = colorStyles[color];

    return (
        <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-between h-[180px] hover:shadow-lg transition-all duration-300 group">
            <div className="flex justify-between items-start">
                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300", style.bg, style.text)}>
                    <Icon size={24} strokeWidth={2.5} />
                </div>
                <div className={cn(
                    "text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1",
                    trendUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                )}>
                    {trendUp ? "↑" : "↓"} {trend}
                </div>
            </div>

            <div className="flex justify-between items-end mt-4">
                <div>
                    <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{value}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">{title}</p>
                </div>

                {/* Mini Chart */}
                <div className="h-10 w-24 opacity-50 group-hover:opacity-100 transition-opacity">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={style.chart}
                                fill={style.chart}
                                fillOpacity={0.2}
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
