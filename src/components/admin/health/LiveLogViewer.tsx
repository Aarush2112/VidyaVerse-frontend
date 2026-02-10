"use client";

import React, { useEffect, useState, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { getRecentLogs } from "@/app/actions/health";
import { Terminal, Copy } from "lucide-react";
import { motion } from "framer-motion";

interface LogEntry {
    level: string;
    msg: string;
    time: Date;
}

export const LiveLogViewer = () => {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [filter, setFilter] = useState<'ALL' | 'ERROR' | 'WARN'>('ALL');
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchLogs = async () => {
            const data = await getRecentLogs();
            setLogs(data);
        };

        fetchLogs();
        const interval = setInterval(fetchLogs, 5000);
        return () => clearInterval(interval);
    }, []);

    const filteredLogs = logs.filter(l => {
        if (filter === 'ALL') return true;
        if (filter === 'ERROR') return l.level === 'CRITICAL' || l.level === 'ERROR';
        if (filter === 'WARN') return l.level === 'WARNING' || l.level === 'WARN';
        return true;
    });

    const getLogStyles = (level: string) => {
        switch (level) {
            case 'CRITICAL':
            case 'ERROR': return "text-rose-500 bg-rose-50 border-rose-100";
            case 'WARNING':
            case 'WARN': return "text-amber-500 bg-amber-50 border-amber-100";
            default: return "text-emerald-500 bg-emerald-50 border-emerald-100";
        }
    };

    return (
        <motion.div
            whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.08)" }}
            className="flex flex-col h-[400px] bg-white rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden transition-all"
        >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-50 bg-slate-50/50">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-200">
                        <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Live Logs</h3>
                        <p className="text-[10px] text-slate-400 font-medium">Real-time event stream</p>
                    </div>
                </div>
                <div className="flex bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
                    {(['ALL', 'ERROR', 'WARN'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={cn(
                                "px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all",
                                filter === f
                                    ? "bg-slate-900 text-white shadow-md"
                                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Logs Area */}
            <ScrollArea className="flex-1 p-6">
                <div className="space-y-3">
                    {filteredLogs.map((log, i) => (
                        <div key={i} className="flex flex-col sm:flex-row gap-3 p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors group">
                            <div className="flex items-center gap-3 min-w-[140px]">
                                <span className="text-[10px] font-bold text-slate-400 font-mono shrink-0">
                                    {new Date(log.time).toLocaleTimeString([], { hour12: false })}
                                </span>
                                <span className={cn(
                                    "px-2 py-0.5 rounded-[6px] text-[9px] font-black uppercase tracking-wider border shrink-0",
                                    getLogStyles(log.level)
                                )}>
                                    {log.level === 'WARNING' ? 'WARN' : log.level}
                                </span>
                            </div>
                            <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                                {log.msg}
                            </span>
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>
            </ScrollArea>
        </motion.div>
    );
};
