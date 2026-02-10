"use client";

import { motion } from "framer-motion";
import { Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineEvent {
    id: string;
    title: string;
    date: string;
    status: "urgent" | "normal" | "completed";
}

const mockEvents: TimelineEvent[] = [
    { id: "1", title: "Data Structures Test", date: "Today 23:59", status: "urgent" },
    { id: "2", title: "React Hooks Assignment", date: "Tomorrow 15:00", status: "normal" },
    { id: "3", title: "System Design Lab", date: "Fri 12 Oct", status: "normal" },
];

export const MissionTimeline = () => {
    return (
        <div className="h-full bg-white p-8 rounded-[32px] soft-shadow-md border border-slate-100 flex flex-col relative overflow-hidden group">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Academic Schedule</h3>
                <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-[#5B86E5]" />
                </div>
            </div>

            <div className="relative flex-1 space-y-8 pl-2">
                {/* Vertical Soft Line */}
                <div className="absolute left-[3px] top-2 bottom-2 w-[2px] bg-slate-100 rounded-full" />

                {mockEvents.map((event, i) => (
                    <div key={event.id} className="relative pl-8 group/item">
                        {/* Timeline Node */}
                        <div className={cn(
                            "absolute left-0 top-1.5 h-2 w-2 rounded-full border-[2px] bg-white z-10 transition-all duration-300",
                            event.status === "urgent"
                                ? "border-rose-500 ring-4 ring-rose-50"
                                : "border-[#5B86E5] ring-4 ring-blue-50"
                        )} />

                        <div>
                            <h4 className={cn(
                                "text-sm font-bold transition-colors mb-1",
                                event.status === "urgent" ? "text-rose-600" : "text-slate-900"
                            )}>
                                {event.title}
                            </h4>
                            <div className="flex items-center gap-1.5">
                                <Clock className="h-3 w-3 text-slate-300" />
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{event.date}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-auto pt-6 border-t border-slate-50">
                <button className="text-[10px] font-bold uppercase tracking-widest text-[#5B86E5] hover:text-[#4A75D4] transition-colors w-full text-center py-2 hover:bg-slate-50 rounded-xl">
                    View Full Calendar
                </button>
            </div>
        </div>
    )
}
