import React from "react";
import { HealthMissionControl } from "@/components/admin/health/HealthMissionControl";
import { LatencyChart } from "@/components/admin/health/LatencyChart";
import { LiveLogViewer } from "@/components/admin/health/LiveLogViewer";

import { Button } from "@/components/ui/button";
import { RefreshCcw, LayoutDashboard, Settings } from "lucide-react";

export default async function AdminHealthPage() {
    // Auto-seed if empty

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-slate-900 pb-20 font-sans">
            {/* Header Section */}
            <div className="bg-white border-b border-slate-100 px-8 py-8 mb-8">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm">
                            <LayoutDashboard className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight">System Health</h1>
                            <p className="text-slate-500 font-medium text-sm mt-0.5">
                                Infrastructure telemetry & vital monitoring
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" size="sm" className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 h-10 px-4 font-bold text-xs uppercase tracking-wider">
                            <Settings className="w-3.5 h-3.5 mr-2" />
                            Config
                        </Button>
                        <Button size="sm" className="rounded-xl bg-slate-900 text-white hover:bg-slate-800 h-10 px-4 font-bold text-xs uppercase tracking-wider shadow-lg shadow-slate-900/10">
                            <RefreshCcw className="w-3.5 h-3.5 mr-2" />
                            Force Refresh
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 space-y-8">
                {/* 1. Mission Control (Cards) */}
                <HealthMissionControl />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 2. Latency Graph (Main Visual) */}
                    <div className="lg:col-span-2 space-y-4">
                        <LatencyChart />
                    </div>

                    {/* 3. Side Panel (Service Health) */}
                    <div className="space-y-4">
                        <div className="p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm h-full">
                            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Service Health</h2>
                            <div className="space-y-1">
                                {[
                                    { name: "PostgreSQL Database", status: "OPERATIONAL", ping: "45ms" },
                                    { name: "Redis Cache Cluster", status: "OPERATIONAL", ping: "12ms" },
                                    { name: "Video Transcoder", status: "DEGRADED", ping: "890ms" },
                                    { name: "Vercel Edge Network", status: "OPERATIONAL", ping: "24ms" },
                                    { name: "Stripe Payment Gateway", status: "OPERATIONAL", ping: "120ms" },
                                    { name: "Resend Email Service", status: "OPERATIONAL", ping: "140ms" },
                                ].map((s, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors group cursor-default">
                                        <div className="flex flex-col">
                                            <span className="text-slate-700 font-bold text-xs mb-0.5">{s.name}</span>
                                            <span className="text-slate-400 text-[10px] font-mono group-hover:text-indigo-500 transition-colors">{s.ping}</span>
                                        </div>
                                        <div className={`w-2.5 h-2.5 rounded-full ${s.status === 'OPERATIONAL' ? 'bg-emerald-400 shadow-emerald-400/20' : 'bg-amber-400 shadow-amber-400/20'} shadow-lg ring-2 ring-white`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Logs */}
                <LiveLogViewer />
            </div>
        </div>
    );
}
