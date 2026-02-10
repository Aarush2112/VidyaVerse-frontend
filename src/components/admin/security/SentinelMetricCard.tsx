"use client";

import React from "react";
import { Shield, Activity, AlertTriangle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export function SentinelMetricRow() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Card 1: System Integrity */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center relative overflow-hidden group">
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-400" />
                <div className="relative h-24 w-24 mb-3">
                    {/* SVG Progress Ring */}
                    <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                        <circle cx="50" cy="50" r="40" stroke="#F0FDF4" strokeWidth="8" fill="none" />
                        <circle cx="50" cy="50" r="40" stroke="#10B981" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="0" strokeLinecap="round" className="drop-shadow-sm" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold text-slate-900 font-poppins">100%</span>
                    </div>
                </div>
                <div className="text-sm font-bold text-slate-700">System Integrity</div>
                <div className="text-xs text-emerald-600 font-medium mt-1">All Systems Secure</div>
            </div>

            {/* Card 2: Active Sessions */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
                <div className="flex items-start justify-between w-full">
                    <div>
                        <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Active Sessions</div>
                        <div className="text-4xl font-bold text-slate-900 font-poppins">42</div>
                    </div>
                    <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                        <Activity size={20} />
                    </div>
                </div>
                <div className="text-xs font-medium text-slate-500 mt-4 flex items-center gap-2">
                    <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+12</span>
                    from US-West
                </div>
            </div>

            {/* Card 3: Failed Attempts (24h) */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
                <div className="flex items-start justify-between w-full">
                    <div>
                        <div className="text-rose-500 text-xs font-bold uppercase tracking-wider mb-1">Failed Attempts</div>
                        <div className="text-4xl font-bold text-slate-900 font-poppins">3</div>
                    </div>
                    <div className="h-10 w-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center">
                        <AlertTriangle size={20} />
                    </div>
                </div>
                {/* Micro Bar Chart Visualization */}
                <div className="flex items-end gap-1 h-8 mt-4 opacity-80">
                    {[20, 40, 15, 60, 30, 80, 20].map((h, i) => (
                        <div key={i} className="flex-1 bg-rose-100 rounded-t-sm hover:bg-rose-200 transition-colors" style={{ height: `${h}%` }} />
                    ))}
                    <div className="flex-1 bg-rose-500 rounded-t-sm" style={{ height: '30%' }} />
                </div>
            </div>

            {/* Card 4: Global Threat Level */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center relative">
                <div className="mb-3 relative">
                    <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl animate-pulse opacity-50" />
                    <Shield size={48} className="text-blue-500 relative z-10" fill="currentColor" fillOpacity={0.2} />
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Threat Level</div>
                <div className="text-2xl font-black text-blue-600 tracking-tight">LOW</div>
            </div>
        </div>
    );
}
