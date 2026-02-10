"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { StatusBadge } from "./StatusBadge";
import { Activity, Server, ShieldAlert, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import { checkSystemHealth } from "@/app/actions/health";

interface Metrics {
    dbStatus: 'UP' | 'DOWN' | 'DEGRADED';
    latency: number;
    errorRate: number;
    activeRequests: number;
}

export const HealthMissionControl = () => {
    const [metrics, setMetrics] = useState<Metrics | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

    const fetchData = async () => {
        try {
            const data = await checkSystemHealth();
            setMetrics(data as any);
            setLastUpdated(new Date());
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    const getGlobalStatus = (m: Metrics) => {
        if (m.dbStatus === 'DOWN') return 'DOWN';
        if (m.errorRate > 2 || m.latency > 500) return 'DEGRADED';
        return 'OPERATIONAL';
    };

    const status = metrics ? getGlobalStatus(metrics) : 'OPERATIONAL';

    const CardBase = ({ children, className }: { children: React.ReactNode, className?: string }) => (
        <motion.div
            whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.08)" }}
            className={cn(
                "p-8 rounded-[32px] bg-white border border-slate-100 relative overflow-hidden flex flex-col justify-between h-[200px] shadow-sm transition-all",
                className
            )}
        >
            {children}
        </motion.div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Global Status */}
            <CardBase className="md:col-span-1">
                <div className="flex justify-between items-start">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <Activity className="h-6 w-6" />
                    </div>
                    <StatusBadge status={status as any} />
                </div>
                <div>
                    <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Global System Status</h3>
                    <div className={cn(
                        "text-2xl font-bold tracking-tight",
                        status === 'OPERATIONAL' ? "text-slate-900" : "text-rose-500"
                    )}>
                        {status === 'OPERATIONAL' ? "All Systems Operational" : "System Alert Active"}
                    </div>
                    <p className="text-slate-500 text-xs mt-2 font-medium">
                        Last poll: {lastUpdated.toLocaleTimeString()}
                    </p>
                </div>
            </CardBase>

            {/* Response Time */}
            <CardBase>
                <div className="flex justify-between items-start">
                    <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <Server className="h-6 w-6" />
                    </div>
                    <div className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-bold">
                        latency
                    </div>
                </div>
                <div>
                    <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Avg Response Time</h3>
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-slate-900 tracking-tight">{metrics?.latency || "--"}</span>
                        <span className="text-sm font-medium text-slate-400">ms</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 mt-4 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((metrics?.latency || 0) / 5, 100)}%` }}
                            className="h-full bg-blue-500 rounded-full"
                        />
                    </div>
                </div>
            </CardBase>

            {/* Error Rate */}
            <CardBase>
                <div className="flex justify-between items-start">
                    <div className="h-12 w-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
                        <ShieldAlert className="h-6 w-6" />
                    </div>
                    <div className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-bold">
                        errors
                    </div>
                </div>
                <div>
                    <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Error Rate (1m)</h3>
                    <div className="flex items-baseline gap-1">
                        <span className={cn(
                            "text-4xl font-bold tracking-tight",
                            (metrics?.errorRate || 0) > 1 ? "text-rose-500" : "text-slate-900"
                        )}>{metrics?.errorRate || 0}%</span>
                    </div>
                    <p className="text-slate-500 text-xs mt-2 font-medium">
                        {metrics?.activeRequests || 0} active requests
                    </p>
                </div>
            </CardBase>
        </div>
    );
};
