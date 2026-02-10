"use client";

import React, { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";
import { getMetricsHistory } from "@/app/actions/health";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const LatencyChart = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getMetricsHistory('1h');
                setData(history);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
        const interval = setInterval(fetchHistory, 30000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="min-h-[300px] flex items-center justify-center bg-white rounded-[32px] border border-slate-100">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
        );
    }

    return (
        <motion.div
            whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.08)" }}
            className="p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm relative overflow-hidden transition-all"
        >
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-1">System Latency</h3>
                    <p className="text-slate-500 text-sm font-medium">Database vs API performance (Last Hour)</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-indigo-500/20 shadow-lg" />
                        <span>DB Query Time</span>
                    </div>
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorLatencySoft" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                        <XAxis
                            dataKey="time"
                            stroke="#94A3B8"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#94A3B8"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}ms`}
                            dx={-10}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#ffffff',
                                border: '1px solid #e2e8f0',
                                borderRadius: '16px',
                                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
                                color: '#0f172a',
                                fontWeight: 600,
                                fontSize: '12px'
                            }}
                            cursor={{ stroke: '#6366F1', strokeWidth: 1, strokeDasharray: '4 4' }}
                            itemStyle={{ color: '#6366F1' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="latency"
                            stroke="#6366F1"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorLatencySoft)"
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};
