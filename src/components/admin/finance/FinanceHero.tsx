"use client";

import React from "react";
import { TrendingUp, DollarSign, Wallet, Users, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FinanceStats {
    grossVolume: number;
    netRevenue: number;
    pendingPayouts: number;
    activeSubscribers: number;
}

export function FinanceHero({ stats }: { stats: FinanceStats }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
                title="Gross Volume"
                value={`$${stats.grossVolume.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                trend="+12% vs last month"
                icon={TrendingUp}
                color="emerald"
            />
            <StatCard
                title="Net Revenue"
                value={`$${stats.netRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                trend="Platform Share (20%)"
                icon={DollarSign}
                color="blue"
            />
            <StatCard
                title="Pending Payouts"
                value={`$${stats.pendingPayouts.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                trend="Processing Next Tuesday"
                icon={AlertCircle}
                color="amber"
            />
            <StatCard
                title="Active Subscribers"
                value={stats.activeSubscribers.toString()}
                trend="+5% Growth"
                icon={Users}
                color="violet"
            />
        </div>
    );
}

function StatCard({ title, value, trend, icon: Icon, color }: any) {
    const styles = {
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
        blue: "bg-blue-50 text-blue-600 border-blue-100",
        amber: "bg-amber-50 text-amber-600 border-amber-100",
        violet: "bg-violet-50 text-violet-600 border-violet-100"
    };
    const theme = styles[color as keyof typeof styles];

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className={cn("p-3 rounded-xl border", theme)}>
                    <Icon size={22} />
                </div>
            </div>
            <div className="text-2xl font-black text-slate-900 tracking-tight mb-1">{value}</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">{title}</div>
            <div className="mt-4 text-xs font-medium text-slate-400 border-t border-slate-50 pt-3">
                {trend}
            </div>
        </div>
    );
}
