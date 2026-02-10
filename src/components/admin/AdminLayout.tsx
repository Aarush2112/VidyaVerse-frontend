"use client";

import React from "react";
import { Users, Server, Activity, Plus } from "lucide-react";
import { VibrantMetricCard } from "./VibrantMetricCard";
import { UserManagementTable } from "./UserManagementTable";
import { SecurityFeed } from "./SecurityFeed";
import { Button } from "@/components/ui/button";

export function AdminLayout() {
    return (
        <div className="space-y-8">
            {/* A. System Pulse (New Header) */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">All Systems Operational</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-poppins">System Overview</h1>
                </div>

                <div className="flex gap-4">
                    <Button variant="ghost" className="rounded-full text-slate-500 font-bold hover:bg-slate-100 hover:text-slate-900">
                        View Logs
                    </Button>
                    <Button className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/25 text-white font-bold pl-4 pr-6">
                        <Plus className="mr-2 h-4 w-4" /> Add Admin
                    </Button>
                </div>
            </header>

            {/* B. Health Matrix (Vibrant Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <VibrantMetricCard
                    title="Total Users"
                    value="1,240"
                    trend="12%"
                    trendUp={true}
                    icon={Users}
                    color="emerald"
                    data={[{ value: 100 }, { value: 120 }, { value: 115 }, { value: 130 }, { value: 140 }, { value: 135 }, { value: 145 }]}
                />
                <VibrantMetricCard
                    title="Active Courses"
                    value="14"
                    trend="3 New"
                    trendUp={true}
                    icon={Activity}
                    color="purple"
                    data={[{ value: 10 }, { value: 10 }, { value: 12 }, { value: 12 }, { value: 13 }, { value: 14 }, { value: 14 }]}
                />
                <VibrantMetricCard
                    title="Server Load"
                    value="82%"
                    trend="High Load"
                    trendUp={false}
                    icon={Server}
                    color="orange"
                    data={[{ value: 20 }, { value: 45 }, { value: 30 }, { value: 50 }, { value: 65 }, { value: 75 }, { value: 82 }]}
                />
            </div>

            {/* C & D. Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* User Directory (Wide) */}
                <div className="lg:col-span-3">
                    <UserManagementTable />
                </div>

                {/* Security Stream (Narrow) */}
                <div className="lg:col-span-1 h-full">
                    <SecurityFeed />
                </div>
            </div>
        </div>
    );
}
