"use client";

import React from "react";
import { Lock, ShieldAlert, Key, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const MOCK_LOGS = [
    {
        id: 1,
        event: "Admin Login Success",
        user: "Poorak Pandey",
        email: "poorak@verse.edi",
        location: "New Delhi, IN",
        ip: "192.168.0.1",
        status: "success",
        time: "2s ago",
    },
    {
        id: 2,
        event: "Invalid Password Attempt",
        user: "unknown",
        email: "admin@root.com",
        location: "Moscow, RU",
        ip: "45.2.10.99",
        status: "failed",
        time: "45s ago",
    },
    {
        id: 3,
        event: "API Key Generated",
        user: "System Admin",
        email: "sys@verse.edu",
        location: "San Francisco, US",
        ip: "10.0.0.55",
        status: "success",
        time: "2m ago",
    },
    {
        id: 4,
        event: "Rate Limit Exceeded",
        user: "Bot Client",
        email: "-",
        location: "Shenzhen, CN",
        ip: "203.11.5.1",
        status: "failed",
        time: "5m ago",
    },
];

export function AuditLogTable() {
    return (
        <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-slate-900 font-poppins">Recent Access Logs</h2>
                <Button variant="ghost" className="text-slate-500 font-medium hover:bg-slate-50 rounded-full px-4">View Full Log</Button>
            </div>

            <div className="space-y-3">
                {MOCK_LOGS.map((log) => (
                    <div
                        key={log.id}
                        className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl border border-slate-50 hover:border-slate-100 hover:bg-slate-50/50 transition-colors group"
                    >
                        {/* Icon */}
                        <div className={cn(
                            "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
                            log.status === "success" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                        )}>
                            {log.status === "success" ? <Lock size={18} /> : <ShieldAlert size={18} />}
                        </div>

                        {/* Event Details */}
                        <div className="flex-1 min-w-[200px]">
                            <div className="font-bold text-slate-900 text-sm">{log.event}</div>
                            <div className="text-xs text-slate-500 font-medium">{log.time}</div>
                        </div>

                        {/* User */}
                        <div className="flex-1 hidden md:block">
                            <div className="font-medium text-slate-900 text-sm">{log.user}</div>
                            <div className="text-xs text-slate-400">{log.email}</div>
                        </div>

                        {/* IP & Location */}
                        <div className="flex items-center gap-4 flex-1">
                            <div className="hidden md:flex items-center gap-2 text-xs text-slate-500">
                                <Globe size={12} /> {log.location}
                            </div>
                            <div className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                                {log.ip}
                            </div>
                        </div>

                        {/* Status Dot */}
                        <div className="w-8 flex justify-center">
                            <div className={cn(
                                "h-2.5 w-2.5 rounded-full",
                                log.status === "success" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]"
                            )} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
