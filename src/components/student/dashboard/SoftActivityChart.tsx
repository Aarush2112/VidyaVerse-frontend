"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useStudentStore } from "@/lib/store/useStudentStore";

const DATA = [
    { day: "Mon", value: 1.5 },
    { day: "Tue", value: 3.2 },
    { day: "Wed", value: 4.5 },
    { day: "Thu", value: 8.5 }, // Peak
    { day: "Fri", value: 4.8 },
    { day: "Sat", value: 5.2 },
    { day: "Sun", value: 1.2 },
];

export function SoftActivityChart() {
    const { codingVelocity } = useStudentStore();

    // Transform store data to chart format
    // If store is empty (loading), fall back to empty structure or keep existing MOCK_VELOCITY as logic
    const data = codingVelocity.length > 0
        ? codingVelocity.map(d => ({ day: d.day, value: d.codeHours + d.theoryHours }))
        : [];

    // Determine max value for highlighting
    const maxValue = Math.max(...data.map(d => d.value));

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">My activity</h2>
                </div>
                <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900 font-medium">
                    See all <ChevronRight size={16} className="ml-1" />
                </Button>
            </div>

            <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barSize={48}>
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#94A3B8", fontSize: 13, fontWeight: 500 }}
                            dy={10}
                        />
                        <Tooltip
                            cursor={{ fill: "transparent" }}
                            contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)" }}
                        />
                        <Bar dataKey="value" radius={[12, 12, 12, 12]}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.value === maxValue ? "#6366F1" : "#E2E8F0"}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
