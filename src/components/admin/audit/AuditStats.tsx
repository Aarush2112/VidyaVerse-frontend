"use client";

import React, { useEffect, useState } from "react";
import { getAuditStats } from "@/app/actions/audit";
import { Activity, ShieldAlert, Fingerprint } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * AuditStats
 * Displays high-level compliance metrics and an hourly activity density map (Heatmap).
 */
export const AuditStats = () => {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        getAuditStats().then(setStats);
    }, []);

    if (!stats) return <div className="h-[140px] w-full bg-slate-50 animate-pulse rounded-[32px]" />;

    // Generate tooltips for heatmap hours
    const getHourLabel = (h: number) => {
        const d = new Date();
        d.setHours(h);
        return d.toLocaleTimeString([], { hour: 'numeric', hour12: true });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Metric 1 */}
            <motion.div
                whileHover={{ y: -2 }}
                className="p-6 rounded-[32px] bg-white border border-slate-100 flex flex-col justify-between shadow-sm"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <Activity className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Events Today</span>
                </div>
                <div className="text-3xl font-black text-slate-900 tracking-tight">{stats.countToday}</div>
            </motion.div>

            {/* Metric 2 */}
            <motion.div
                whileHover={{ y: -2 }}
                className="p-6 rounded-[32px] bg-white border border-slate-100 flex flex-col justify-between shadow-sm"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-8 w-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
                        <ShieldAlert className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Critical Actions</span>
                </div>
                <div className="text-3xl font-black text-slate-900 tracking-tight">{stats.criticalCount}</div>
            </motion.div>

            {/* Heatmap (Spans 2 cols) */}
            <motion.div
                whileHover={{ y: -2 }}
                className="lg:col-span-2 p-6 rounded-[32px] bg-white border border-slate-100 shadow-sm flex flex-col"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
                        <Fingerprint className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hourly Activity Density (24h)</span>
                </div>

                <div className="flex items-end justify-between gap-1 h-12 w-full mt-auto">
                    {stats.heatmap.map((h: any, i: number) => {
                        // Calculate intensity (0-4 scale)
                        const intensity = h.count > 40 ? 4 : h.count > 20 ? 3 : h.count > 10 ? 2 : h.count > 0 ? 1 : 0;
                        const colors = [
                            "bg-slate-50",       // 0
                            "bg-indigo-100",     // 1
                            "bg-indigo-300",     // 2
                            "bg-indigo-500",     // 3
                            "bg-indigo-600",     // 4
                        ];

                        return (
                            <div key={i} className="group relative flex-1 flex flex-col items-center gap-1 cursor-default">
                                <div
                                    className={cn("w-full rounded-sm transition-all", colors[intensity])}
                                    style={{ height: `${Math.max(20, (h.count / 50) * 100)}%` }}
                                />
                                {/* Tooltip */}
                                <div className="absolute bottom-full mb-2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                    {getHourLabel(h.hour)}: {h.count} events
                                </div>
                            </div>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
};
