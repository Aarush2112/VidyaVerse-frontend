"use client";

import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
    ReferenceLine
} from "recharts";

const data = [
    { name: "Week 1", score: 65 },
    { name: "Week 2", score: 72 },
    { name: "Week 3", score: 68 },
    { name: "Week 4", score: 85 },
    { name: "Week 5", score: 82 },
    { name: "Week 6", score: 90 },
    { name: "Week 7", score: 88 },
];

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { name: string }; value: number }> }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-zinc-900/90 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-2xl">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">
                    {payload[0].payload.name}
                </p>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-indigo-500" />
                    <p className="text-sm font-black italic text-white">
                        {payload[0].value}% <span className="text-zinc-500 text-[10px] not-italic font-medium">Avg Score</span>
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

export function PerformanceChart() {
    return (
        <div className="w-full h-full relative p-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-500">
                        Class Performance Landscape
                    </h3>
                    <p className="text-2xl font-black italic tracking-tighter text-white">
                        Historical IQ/XP Growth
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">+12.4% vs prev batch</span>
                    </div>
                </div>
            </div>

            <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#ffffff05"
                        />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#52525b', fontSize: 10, fontWeight: 700 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#52525b', fontSize: 10, fontWeight: 700 }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                        <ReferenceLine
                            y={70}
                            stroke="#ffffff10"
                            strokeDasharray="3 3"
                            label={{ position: 'right', value: 'PASSING THRESHOLD', fill: '#52525b', fontSize: 8, fontWeight: 900 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="score"
                            stroke="#6366f1"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#performanceGradient)"
                            animationDuration={2000}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
