"use client";

import { motion } from "framer-motion";
import { Zap, AlertCircle, ChevronRight, Trophy, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

interface SoftStatusModuleProps {
    xp: number;
    level?: number;
    pendingTasks: number;
    nextTask?: string;
}

const DATA = [
    { name: "XP", value: 1240, color: "#5B86E5" },
    { name: "Remaining", value: 260, color: "#F1F5F9" },
];

export function SoftStatusModule({ xp, level = 5, pendingTasks, nextTask }: SoftStatusModuleProps) {
    return (
        <div className="md:col-span-2 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                {/* Level Gauge Card */}
                <div className="bg-white p-8 rounded-[32px] soft-shadow-md flex flex-col items-center justify-center text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#5B86E5]/5 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />

                    <div className="h-40 w-40 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={65}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black text-slate-900 tracking-tighter">LVL {level}</span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5B86E5] mt-1">Scholar</span>
                        </div>
                    </div>
                    <div className="mt-4 space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Total Progress</p>
                        <h3 className="text-xl font-bold text-slate-900">{xp.toLocaleString()} <span className="text-slate-400 font-medium">XP</span></h3>
                    </div>
                </div>

                {/* Mission Status Card */}
                <div className="bg-white p-8 rounded-[32px] soft-shadow-md flex flex-col gap-6 relative overflow-hidden group">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Mission Status</h3>
                        <div className={cn(
                            "flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest transition-all",
                            pendingTasks > 0 ? "bg-amber-50 text-amber-600 border border-amber-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        )}>
                            <AlertCircle className="h-3 w-3" />
                            {pendingTasks > 0 ? `${pendingTasks} PENDING` : "ALL CLEAR"}
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                        <div className="space-y-4">
                            <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 group/task hover:border-[#5B86E5]/30 transition-all cursor-pointer">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] font-bold text-[#5B86E5] uppercase tracking-widest">Next Objective</span>
                                    <ChevronRight className="h-4 w-4 text-slate-300 group-hover/task:translate-x-1 transition-transform" />
                                </div>
                                <p className="text-slate-900 font-bold">{nextTask || "No active missions"}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-orange-50 flex items-center justify-center">
                                        <Flame className="h-5 w-5 text-orange-500" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold text-slate-900">12</span>
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Streak</span>
                                    </div>
                                </div>
                                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center">
                                        <Trophy className="h-5 w-5 text-purple-500" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold text-slate-900">#42</span>
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Rank</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
