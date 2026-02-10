"use client";

import React from "react";
import { ShieldAlert, LogIn, Database, Lock } from "lucide-react";

export function SecurityFeed() {
    const events = [
        { id: 1, type: "login", msg: "New login detected from US-East-1", time: "2m ago", icon: LogIn, color: "text-blue-500 bg-blue-50" },
        { id: 2, type: "warning", msg: "High CPU usage on Server-04", time: "15m ago", icon: Database, color: "text-amber-500 bg-amber-50" },
        { id: 3, type: "audit", msg: "Admin role updated for Sarah C.", time: "1h ago", icon: ShieldAlert, color: "text-purple-500 bg-purple-50" },
        { id: 4, type: "security", msg: "Failed login attempt (IP: 192.168...)", time: "3h ago", icon: Lock, color: "text-rose-500 bg-rose-50" },
    ];

    return (
        <div className="bg-white rounded-[32px] p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Security Stream</h3>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="relative space-y-8 pl-1">
                {/* Connector Line */}
                <div className="absolute left-[15px] top-4 bottom-4 w-px bg-slate-100" />

                {events.map((e) => (
                    <div key={e.id} className="relative flex items-start gap-4 z-10">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-sm ${e.color}`}>
                            <e.icon size={14} strokeWidth={2.5} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-700 leading-snug">{e.msg}</p>
                            <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{e.time}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-50 text-center">
                <button className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
                    View All Logs
                </button>
            </div>
        </div>
    );
}
