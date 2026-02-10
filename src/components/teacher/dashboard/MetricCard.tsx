"use client";

import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Bar, BarChart, Cell } from "recharts";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

interface MetricCardProps {
    title: string;
    value: string | number;
    trend?: { value: number; isPositive: boolean; label: string };
    type: 'sparkline' | 'bar' | 'radial';
    data?: any[];
    color?: 'violet' | 'amber' | 'emerald';
    icon?: any;
}

export const MetricCard = ({ title, value, trend, type, data, color = 'violet', icon: Icon }: MetricCardProps) => {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-[24px] p-6 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden h-[180px] flex flex-col justify-between"
        >
            <div className="flex justify-between items-start z-10">
                <div>
                    <h3 className="text-slate-500 font-medium text-sm tracking-wide font-sans">{title}</h3>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl font-bold text-slate-900 font-sans tracking-tight">{value}</span>
                        {trend && (
                            <span className={cn("text-xs font-bold flex items-center gap-1 px-2 py-0.5 rounded-full",
                                trend.isPositive ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
                            )}>
                                {trend.isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                {trend.value}%
                            </span>
                        )}
                    </div>
                </div>
                {Icon && (
                    <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center bg-opacity-10",
                        color === 'violet' && "bg-violet-500 text-violet-600",
                        color === 'amber' && "bg-amber-500 text-amber-600",
                        color === 'emerald' && "bg-emerald-500 text-emerald-600",
                    )}>
                        <Icon size={20} />
                    </div>
                )}
            </div>

            {/* Visualizations */}
            <div className="h-[60px] w-full mt-4 relative z-0">
                {type === 'sparkline' && data && (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={color === 'violet' ? '#8b5cf6' : '#10b981'} stopOpacity={0.2} />
                                    <stop offset="100%" stopColor={color === 'violet' ? '#8b5cf6' : '#10b981'} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={color === 'violet' ? '#7c3aed' : '#10b981'}
                                strokeWidth={3}
                                fill={`url(#grad-${color})`}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}

                {type === 'bar' && data && (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} barSize={6}>
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.urgent ? '#f59e0b' : '#e2e8f0'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )}

                {type === 'radial' && (
                    <div className="absolute inset-0 flex items-center justify-end pr-4">
                        <div className="text-right">
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Health Score</p>
                            <div className="text-emerald-500 font-bold text-lg">Good</div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};
