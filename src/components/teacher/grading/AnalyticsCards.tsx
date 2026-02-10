"use client";

import { motion } from "framer-motion";
import {
    Trophy,
    AlertTriangle,
    TrendingUp,
    Users,
    Users2
} from "lucide-react";
import {
    AreaChart,
    Area,
    ResponsiveContainer
} from "recharts";
import { cn } from "@/lib/utils";

const BELL_CURVE_DATA = [
    { x: 0, y: 5 },
    { x: 20, y: 15 },
    { x: 40, y: 40 },
    { x: 50, y: 80 },
    { x: 60, y: 90 },
    { x: 70, y: 60 },
    { x: 80, y: 30 },
    { x: 100, y: 10 },
];

interface AnalyticCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: any;
    chart?: React.ReactNode;
    progress?: number;
    color: "indigo" | "amber" | "rose" | "emerald";
}

function AnalyticCard({
    title,
    value,
    subtitle,
    icon: Icon,
    chart,
    progress,
    color
}: AnalyticCardProps) {
    const colorMap = {
        indigo: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
        amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
        rose: "text-rose-500 bg-rose-500/10 border-rose-500/20",
        emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    };

    const progressColorMap = {
        indigo: "bg-indigo-500",
        amber: "bg-amber-500",
        rose: "bg-rose-500",
        emerald: "bg-emerald-500",
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 bg-zinc-900 border border-white/5 rounded-xl flex flex-col justify-between h-32 relative overflow-hidden group"
        >
            <div className="flex justify-between items-start z-10">
                <div className="space-y-0.5">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">{title}</p>
                    <h3 className="text-2xl font-mono font-bold text-zinc-100">{value}</h3>
                    {subtitle && <p className="text-[10px] text-zinc-500 font-medium">{subtitle}</p>}
                </div>
                <div className={cn("p-2 rounded-lg border", colorMap[color])}>
                    <Icon className="h-4 w-4" />
                </div>
            </div>

            {chart && (
                <div className="absolute inset-x-0 bottom-0 h-12 opacity-30 group-hover:opacity-50 transition-opacity">
                    {chart}
                </div>
            )}

            {progress !== undefined && (
                <div className="w-full h-1.5 bg-zinc-800 rounded-full mt-4 border border-white/5 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={cn("h-full", progressColorMap[color])}
                    />
                </div>
            )}
        </motion.div>
    );
}

export function AnalyticsCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <AnalyticCard
                title="Class Average"
                value="78.4%"
                subtitle="Median Score"
                icon={TrendingUp}
                color="indigo"
                chart={
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={BELL_CURVE_DATA}>
                            <Area
                                type="monotone"
                                dataKey="y"
                                stroke="#6366f1"
                                fill="url(#colorIndigo)"
                                strokeWidth={2}
                            />
                            <defs>
                                <linearGradient id="colorIndigo" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                        </AreaChart>
                    </ResponsiveContainer>
                }
            />

            <AnalyticCard
                title="Top Performer"
                value="Aarav P."
                subtitle="Scored 98% (Current)"
                icon={Trophy}
                color="emerald"
            />

            <AnalyticCard
                title="Needs Attention"
                value="05"
                subtitle="Students at risk (<40%)"
                icon={AlertTriangle}
                color="rose"
            />

            <AnalyticCard
                title="Grading Progress"
                value="85%"
                subtitle="32 / 40 Submissions"
                icon={Users2}
                progress={85}
                color="amber"
            />
        </div>
    );
}
