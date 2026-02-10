"use client";

import { motion } from "framer-motion";
import {
    Terminal,
    UserPlus,
    FileText,
    Clock,
    ShieldCheck,
    AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
    {
        id: "1",
        user: "System",
        action: "Batch #4 deployment complete",
        time: "14:02:11",
        icon: ShieldCheck,
        type: "success"
    },
    {
        id: "2",
        user: "Poorak Pandey",
        action: "Submitted 'OS Lab 3' (98/100)",
        time: "13:45:02",
        icon: FileText,
        type: "default"
    },
    {
        id: "3",
        user: "Ananya Sharma",
        action: "Tab switch detected during Exam #2",
        time: "13:30:15",
        icon: AlertTriangle,
        type: "warning"
    },
    {
        id: "4",
        user: "Admin",
        action: "Enrolled 12 new cadets to Phase 2",
        time: "12:15:00",
        icon: UserPlus,
        type: "default"
    },
    {
        id: "5",
        user: "System",
        action: "Autograde scheduled for Batch #1",
        time: "11:00:22",
        icon: Clock,
        type: "default"
    }
];

export function ActivityLog() {
    return (
        <div className="h-full flex flex-col p-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-500">
                        Operational Intelligence Feed
                    </h3>
                    <p className="text-2xl font-black italic tracking-tighter text-white">
                        Live Activity Log
                    </p>
                </div>
                <Terminal className="h-5 w-5 text-indigo-500 opacity-50" />
            </div>

            <div className="relative space-y-8 flex-1">
                {/* Vertical Timeline Line */}
                <div className="absolute left-[13px] top-2 bottom-2 w-px bg-gradient-to-b from-indigo-500/20 via-zinc-800 to-transparent" />

                <div className="space-y-6">
                    {activities.map((activity, idx) => (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative pl-10 group"
                        >
                            {/* Icon Dot */}
                            <div className={cn(
                                "absolute left-0 top-1 h-7 w-7 rounded-full flex items-center justify-center border transition-all duration-300",
                                activity.type === "success" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]" :
                                    activity.type === "warning" ? "bg-rose-500/10 border-rose-500/30 text-rose-400 group-hover:shadow-[0_0_15px_rgba(244,63,94,0.3)]" :
                                        "bg-zinc-900 border-white/5 text-zinc-400 group-hover:border-white/20"
                            )}>
                                <activity.icon className="h-3.5 w-3.5" />
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">
                                    {activity.user}
                                </span>
                                <span className="text-[10px] font-mono text-zinc-600">
                                    {activity.time}
                                </span>
                            </div>
                            <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
                                {activity.action}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <button className="w-full mt-8 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-indigo-400 hover:bg-indigo-500/5 hover:border-indigo-500/20 transition-all">
                Access Full System Logs
            </button>
        </div>
    );
}
