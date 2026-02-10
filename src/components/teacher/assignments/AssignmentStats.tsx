"use client";

import { motion } from "framer-motion";
import { Activity, Clock, BarChart3, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: string | number;
    description: string;
    icon: any;
    trend?: {
        value: string;
        positive: boolean;
    };
    sparklineData?: { value: number }[];
    statusColor?: "emerald" | "amber" | "indigo";
}

function StatCard({
    title,
    value,
    description,
    icon: Icon,
    trend,
    sparklineData,
    statusColor = "indigo"
}: StatCardProps) {
    const colors = {
        emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
        amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
        indigo: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative p-5 bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-white/10 transition-all duration-300"
        >
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        {title}
                    </p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-mono font-bold text-zinc-100 italic tracking-tighter">
                            {value}
                        </h3>
                        {trend && (
                            <span className={cn(
                                "text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5",
                                trend.positive ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10"
                            )}>
                                {trend.positive ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                                {trend.value}
                            </span>
                        )}
                    </div>
                    <p className="text-[10px] text-zinc-500 font-medium">
                        {description}
                    </p>
                </div>
                <div className={cn("p-2.5 rounded-lg border", colors[statusColor])}>
                    <Icon className="h-5 w-5" />
                </div>
            </div>

            {sparklineData && (
                <div className="h-10 mt-4 opacity-50 group-hover:opacity-100 transition-opacity">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sparklineData}>
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke={statusColor === "emerald" ? "#10b981" : statusColor === "amber" ? "#f59e0b" : "#6366f1"}
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* Pulsing indicator for "Active Now" */}
            {statusColor === "emerald" && title === "Active Now" && (
                <div className="absolute top-2 right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
            )}
        </motion.div>
    );
}

export function AssignmentStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
                title="Active Now"
                value="03"
                description="Coding challenges currently deployed"
                icon={Activity}
                statusColor="emerald"
            />
            <StatCard
                title="Pending Review"
                value="42"
                description="Submissions awaiting manual grading"
                icon={Clock}
                statusColor="amber"
                trend={{ value: "+12", positive: false }}
            />
            <StatCard
                title="Avg Class Score"
                value="88%"
                description="Consolidated performance across batches"
                icon={BarChart3}
                statusColor="indigo"
                trend={{ value: "4%", positive: true }}
                sparklineData={[
                    { value: 82 },
                    { value: 85 },
                    { value: 84 },
                    { value: 86 },
                    { value: 88 },
                    { value: 86 },
                    { value: 89 }
                ]}
            />
        </div>
    );
}
