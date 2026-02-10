"use client";

import React, { useState } from "react";
import { TrendingUp, Trophy, Calendar, ChevronRight, Flame } from "lucide-react";
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface QuantifiedSelfStackProps {
    user: {
        level: number;
        xp: number;
        streak: number;
        rank: number;
    };
    upcomingTasks: Array<{
        id: string;
        title: string;
        due: string;
        urgent: boolean;
        type: 'quiz' | 'code' | 'reading';
    }>;
}

export function QuantifiedSelfStack({ user, upcomingTasks }: QuantifiedSelfStackProps) {
    const router = useRouter();
    const [filterUrgent, setFilterUrgent] = useState(false);

    // Data for Recharts RadialBar
    const chartData = [
        { name: 'Level', value: (user?.xp % 1000) / 10, fill: '#8b5cf6' } // Simulated progress based on XP
    ];

    const displayedTasks = filterUrgent
        ? upcomingTasks?.filter(t => t.urgent)
        : upcomingTasks;

    return (
        <div className="flex flex-col gap-6 h-full">

            {/* 1. Gamification Hub */}
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 flex-1 flex flex-col items-center justify-center text-center relative overflow-hidden group min-h-[300px]">
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-blue-400 to-violet-500" />

                {/* Recharts Radial Chart */}
                <div className="relative h-48 w-full mb-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                            innerRadius="70%"
                            outerRadius="100%"
                            barSize={15}
                            data={chartData}
                            startAngle={90}
                            endAngle={-270}
                        >
                            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                            <RadialBar
                                background
                                dataKey="value"
                                cornerRadius={30 / 2}
                                fill="#8b5cf6"
                            />
                        </RadialBarChart>
                    </ResponsiveContainer>
                    {/* Center Label */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Level</span>
                        <span className="text-4xl font-extrabold text-slate-900 font-poppins">{user?.level || 1}</span>
                    </div>
                </div>

                <div className="space-y-3 w-full mt-auto">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">
                                <Flame size={20} fill="currentColor" className="opacity-80" />
                            </div>
                            <div className="text-left">
                                <div className="text-xs text-slate-500 font-bold uppercase tracking-wide">Streak</div>
                                <div className="text-base font-bold text-slate-900">{user?.streak || 0} Day</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center">
                                <Trophy size={18} />
                            </div>
                            <div className="text-left">
                                <div className="text-xs text-slate-500 font-bold uppercase tracking-wide">Rank</div>
                                <div className="text-base font-bold text-slate-900">#{user?.rank || '-'} Global</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Smart Schedule / Up Next */}
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 h-auto">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-800">
                        {filterUrgent ? "Urgent Tasks" : "Up Next"}
                    </h3>
                    <button
                        onClick={() => setFilterUrgent(!filterUrgent)}
                        className={cn(
                            "transition-colors rounded-lg p-1",
                            filterUrgent ? "bg-rose-50 text-rose-600" : "text-slate-400 hover:text-blue-600"
                        )}
                        title="Toggle Urgent Only"
                    >
                        <Calendar size={18} />
                    </button>
                </div>

                <div className="space-y-3">
                    {displayedTasks?.map((task) => (
                        <div
                            key={task.id}
                            onClick={() => router.push(`/student/assignments/${task.id}`)}
                            className={cn(
                                "p-3 rounded-2xl flex items-center justify-between group cursor-pointer transition-all border",
                                task.urgent
                                    ? "bg-rose-50 border-rose-100 hover:bg-rose-100/80"
                                    : "bg-white border-slate-100 hover:bg-slate-50 hover:border-slate-200"
                            )}
                        >
                            <div>
                                <div className={cn(
                                    "text-xs font-bold uppercase tracking-wide mb-1",
                                    task.urgent ? "text-rose-500" : "text-slate-400"
                                )}>
                                    {task.due}
                                </div>
                                <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                    {task.title}
                                </div>
                            </div>
                            <ChevronRight size={16} className={cn(
                                "opacity-0 group-hover:opacity-100 transition-opacity",
                                task.urgent ? "text-rose-400" : "text-slate-400"
                            )} />
                        </div>
                    ))}

                    {(!displayedTasks || displayedTasks.length === 0) && (
                        <div className="text-center py-8 text-slate-400 text-sm">
                            {filterUrgent ? "No urgent tasks." : "No upcoming tasks."}
                            {filterUrgent && (
                                <button
                                    onClick={() => setFilterUrgent(false)}
                                    className="block mx-auto mt-2 text-blue-500 hover:underline"
                                >
                                    Show All
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
