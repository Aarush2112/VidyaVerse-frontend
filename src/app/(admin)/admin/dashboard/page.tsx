import React from "react";
import { getSystemHealth } from "@/app/actions/admin";
import { Server, Users, Activity, DollarSign, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function AdminDashboardPage() {
    const health = await getSystemHealth();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Overview</h1>
                <p className="text-slate-500">Real-time metrics and system health indicators.</p>
            </div>

            {/* Hero Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Population"
                    value={health.activeUsers.toLocaleString()}
                    trend="+12% this week"
                    icon={Users}
                    color="blue"
                />
                <StatCard
                    title="System Load (CPU)"
                    value={`${health.cpu}%`}
                    trend="Stable"
                    icon={Server}
                    color={health.cpu > 80 ? "red" : "emerald"}
                />
                <StatCard
                    title="Revenue (MRR)"
                    value="$45,200"
                    trend="+5% vs last month"
                    icon={DollarSign}
                    color="violet"
                />
                <StatCard
                    title="Active Incidents"
                    value={health.errors.toString()}
                    trend="Requires Attention"
                    icon={AlertCircle}
                    color={health.errors > 0 ? "amber" : "slate"}
                />
            </div>

            {/* Layout Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Area (Placeholder for phase 2 polish) */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm min-h-[400px]">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Traffic & API Latency</h3>
                    <div className="flex items-center justify-center h-[300px] bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400 font-mono text-sm">
                        [CHART_COMPONENT_PLACEHOLDER]
                    </div>
                </div>

                {/* Activity Feed (Audit Log Lite) */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-2 h-2 mt-2 rounded-full bg-slate-300 shrink-0" />
                                <div>
                                    <div className="text-sm font-medium text-slate-800">New User Registration</div>
                                    <div className="text-xs text-slate-500">2 minutes ago • ID: usr_{100 + i}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, trend, icon: Icon, color }: any) {
    const colors = {
        blue: "bg-blue-50 text-blue-600 border-blue-100",
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
        violet: "bg-violet-50 text-violet-600 border-violet-100",
        amber: "bg-amber-50 text-amber-600 border-amber-100",
        red: "bg-rose-50 text-rose-600 border-rose-100",
        slate: "bg-slate-50 text-slate-600 border-slate-100"
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className={cn("p-2 rounded-lg border", colors[color as keyof typeof colors])}>
                    <Icon size={20} />
                </div>
                {/* Sparkline placeholder */}
            </div>
            <div className="text-3xl font-bold text-slate-900 tracking-tight mb-1">{value}</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">{title}</div>
            <div className="mt-4 text-xs font-medium text-slate-400">
                {trend}
            </div>
        </div>
    );
}
