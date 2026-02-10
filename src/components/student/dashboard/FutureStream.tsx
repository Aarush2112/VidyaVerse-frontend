"use client";

import React from "react";
import { cn } from "@/lib/utils";

const TASKS = [
    { id: 1, title: "Test 1: Data Structures", meta: "Due Tomorrow", status: "urgent" },
    { id: 2, title: "React Lab Submission", meta: "Due in 2 Days", status: "warning" },
    { id: 3, title: "Quiz: Docker Basics", meta: "Scheduled: Jan 24", status: "upcoming" },
];

export function FutureStream() {
    return (
        <div className="h-full bg-white rounded-[32px] p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Upcoming Tasks</h3>

            <div className="space-y-6 relative pl-2">
                {/* Timeline Line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-100" />

                {TASKS.map((task) => (
                    <div key={task.id} className="relative pl-8 group">
                        {/* Status Dot */}
                        <div className={cn(
                            "absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-[3px] border-white shadow-sm z-10 transition-transform group-hover:scale-110",
                            task.status === 'urgent' && "bg-rose-500 animate-pulse",
                            task.status === 'warning' && "bg-amber-400",
                            task.status === 'upcoming' && "bg-slate-300"
                        )} />

                        <div>
                            <h4 className="text-sm font-bold text-slate-800 leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                                {task.title}
                            </h4>
                            <p className={cn(
                                "text-[10px] font-bold uppercase tracking-wider",
                                task.status === 'urgent' ? "text-rose-500" : "text-slate-400"
                            )}>
                                {task.meta}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-50 text-center">
                <button className="text-[10px] font-bold uppercase tracking-widest text-[#5B86E5] hover:bg-blue-50 px-4 py-2 rounded-full transition-colors">
                    View Calendar
                </button>
            </div>
        </div>
    );
}
