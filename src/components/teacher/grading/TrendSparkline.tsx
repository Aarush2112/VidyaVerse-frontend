"use client";

import { LineChart, Line, ResponsiveContainer } from "recharts";

interface TrendSparklineProps {
    data: { value: number }[];
    color?: string;
}

export function TrendSparkline({ data, color = "#5B86E5" }: TrendSparklineProps) {
    return (
        <div className="h-8 w-24">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={true}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
