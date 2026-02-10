"use client";

import { useRegistryStore } from "@/lib/store/useRegistryStore";
import { Users, TrendingUp, AlertTriangle, ShieldCheck } from "lucide-react";

export const RegistryStats = () => {
    const students = useRegistryStore(state => state.students);

    // Calculated Metrics
    const total = students.length;
    const avgAttendance = Math.round(students.reduce((acc, s) => acc + s.metrics.attendance, 0) / total) || 0;
    const atRisk = students.filter(s => s.risk.isFlagged).length;
    const avgGPA = (students.reduce((acc, s) => acc + s.metrics.gpa, 0) / total).toFixed(1);

    const stats = [
        { label: "Total Students", value: total, icon: Users, color: "text-violet-600", bg: "bg-violet-50" },
        { label: "Avg. Attendance", value: `${avgAttendance}%`, icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Cohort GPA", value: avgGPA, icon: TrendingUp, color: "text-indigo-600", bg: "bg-indigo-50" },
        { label: "At Risk", value: atRisk, icon: AlertTriangle, color: "text-rose-600", bg: "bg-rose-50" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-[20px] p-4 border border-slate-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
                        <stat.icon size={20} />
                    </div>
                </div>
            ))}
        </div>
    );
}
