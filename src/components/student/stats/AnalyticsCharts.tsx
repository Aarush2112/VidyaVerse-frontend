"use client";

import React from "react";
import { motion } from "framer-motion";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { useStatsStore } from "@/lib/store/useStatsStore";
import { cn } from "@/lib/utils";

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 backdrop-blur-xl p-3 rounded-2xl shadow-xl border border-violet-100 text-xs font-bold text-slate-700">
                <p className="mb-1 text-violet-900">{label}</p>
                {payload.map((entry: any, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span>{entry.name}: {Math.round(entry.value)}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export function AnalyticsCharts() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6">
            <SkillRadar />
            <FocusHistogram />
            <SubjectDonut />
            <SubmissionHeatmap />
        </div>
    );
}

function SkillRadar() {
    const { skillMatrix } = useStatsStore();
    return (
        <motion.div
            className="xl:col-span-4 bg-white rounded-[32px] p-6 shadow-soft-md border border-slate-100 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
        >
            <h3 className="text-lg font-bold text-slate-900 mb-4">Skill Matrix</h3>
            <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillMatrix}>
                        <PolarGrid stroke="#F3F4F6" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 700 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                        <Radar name="Student" dataKey="A" stroke="#8B5CF6" strokeWidth={3} fill="#8B5CF6" fillOpacity={0.3} />
                        <Radar name="Class Avg" dataKey="B" stroke="#E5E7EB" strokeWidth={2} fill="transparent" />
                        <Tooltip content={<CustomTooltip />} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}

function FocusHistogram() {
    const { focusHours } = useStatsStore();
    return (
        <motion.div
            className="xl:col-span-5 bg-white rounded-[32px] p-6 shadow-soft-md border border-slate-100 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h3 className="text-lg font-bold text-slate-900 mb-4">Focus Zones</h3>
            <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={focusHours}>
                        <XAxis dataKey="hour" tick={false} axisLine={false} />
                        <Tooltip cursor={{ fill: '#F3F4F6' }} content={<CustomTooltip />} />
                        <Bar dataKey="activity" fill="#8B5CF6" radius={[4, 4, 0, 0]} animationDuration={1500} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}

function SubjectDonut() {
    const { subjectDistribution } = useStatsStore();
    return (
        <motion.div
            className="xl:col-span-3 bg-white rounded-[32px] p-6 shadow-soft-md border border-slate-100 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <h3 className="text-lg font-bold text-slate-900 mb-4">Distribution</h3>
            <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={subjectDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {subjectDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            {/* Legend */}
            <div className="flex flex-wrap gap-2 justify-center mt-2">
                {subjectDistribution.map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 rounded-full">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[10px] font-bold text-slate-600">{item.name}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

function SubmissionHeatmap() {
    // A visual mock of a contribution graph using CSS Grid since Recharts doesn't strictly have a calendar heatmap
    const tempMatrix = Array.from({ length: 52 * 7 }); // 52 weeks, 7 days

    return (
        <motion.div
            className="xl:col-span-12 bg-white rounded-[32px] p-8 shadow-soft-md border border-slate-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <h3 className="text-lg font-bold text-slate-900 mb-6">Learning Consistency</h3>
            <div className="flex overflow-x-auto no-scrollbar pb-2">
                <div className="grid grid-rows-7 grid-flow-col gap-1.5">
                    {tempMatrix.map((_, i) => {
                        const intensity = Math.random();
                        let bg = "bg-slate-100";
                        if (intensity > 0.9) bg = "bg-violet-600 shadow-sm shadow-violet-500/50";
                        else if (intensity > 0.7) bg = "bg-violet-400";
                        else if (intensity > 0.5) bg = "bg-violet-200";

                        return (
                            <div
                                key={i}
                                className={cn("h-3 w-3 rounded-sm transition-colors hover:scale-125", bg)}
                                title="Contribution"
                            />
                        )
                    })}
                </div>
            </div>
        </motion.div>
    )
}
