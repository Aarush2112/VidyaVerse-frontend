"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
    Filter,
    Bell,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { useState } from "react";
import { RightWidgetPanel } from "./RightWidgetPanel";

const UP_NEXT = [
    { title: "Advanced Data Structures", time: "10:00 AM", room: "304", type: "lecture" },
    { title: "Operating Systems", time: "12:30 PM", room: "102", type: "lecture" },
    { title: "Neural Networks Viva", time: "03:00 PM", room: "Lab A", type: "exam" },
];

export function FloatingSidebar() {
    const [selectedDate, setSelectedDate] = useState(20);

    return (
        <RightWidgetPanel>
            {/* 1. Month Header */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-1">
                    <h3 className="text-xl font-bold text-slate-900">January &apos;26</h3>
                    <div className="flex items-center gap-2">
                        <button className="h-8 w-8 flex items-center justify-center hover:bg-slate-100 rounded-xl text-slate-400 transition-all">
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button className="h-8 w-8 flex items-center justify-center hover:bg-slate-100 rounded-xl text-slate-400 transition-all">
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Pill-Based Mini Calendar */}
                <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center">
                    {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                        <div key={`${day}-${i}`} className="text-[10px] font-bold text-slate-400 uppercase py-1">{day}</div>
                    ))}
                    {Array.from({ length: 31 }).map((_, i) => {
                        const day = i + 1;
                        const isSelected = selectedDate === day;
                        const isToday = day === 20;

                        return (
                            <div
                                key={i}
                                onClick={() => setSelectedDate(day)}
                                className={cn(
                                    "h-8 w-8 flex items-center justify-center text-[11px] rounded-xl transition-all cursor-pointer relative",
                                    isSelected
                                        ? "bg-[#5B86E5] text-white font-bold shadow-md shadow-blue-500/20"
                                        : "text-slate-500 hover:text-[#5B86E5] hover:bg-slate-50",
                                    isToday && !isSelected && "text-[#5B86E5] font-medium"
                                )}
                            >
                                <span className="relative z-10">{day}</span>
                                {day === 21 && (
                                    <div className="absolute top-1 right-1 h-1 w-1 bg-[#FF4D4D] rounded-full" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 2. Upcoming Sessions List */}
            <div className="mt-10 space-y-6 flex-1 min-h-0 overflow-hidden flex flex-col">
                <div className="flex items-center justify-between px-1">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#5B86E5]">Upcoming Sessions</h4>
                    <Bell className="h-5 w-5 text-slate-300 hover:text-[#5B86E5] cursor-pointer transition-colors" />
                </div>

                <div className="space-y-4 overflow-y-auto no-scrollbar pb-10">
                    {UP_NEXT.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group cursor-pointer p-0 hover:translate-x-1 transition-all"
                        >
                            <div className="flex flex-col gap-1 border-b border-slate-50 pb-4">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.time}</span>
                                <h5 className="text-sm font-bold text-slate-900 tracking-tight group-hover:text-[#5B86E5] transition-colors">{item.title}</h5>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Room {item.room}</span>
                                    <div className={cn(
                                        "h-1.5 w-1.5 rounded-full",
                                        item.type === "exam" ? "bg-[#FF4D4D]" : "bg-[#5B86E5]"
                                    )} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* 3. Aesthetic Filters */}
            <div className="pt-6 mt-auto border-t border-slate-100 space-y-4">
                <div className="flex items-center gap-2 px-1 text-slate-400">
                    <Filter className="h-3.5 w-3.5" />
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#5B86E5]">Filters</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {[
                        { label: "Academics", active: true },
                        { label: "Assesments", active: true },
                        { label: "Personal", active: false },
                    ].map(filter => (
                        <button
                            key={filter.label}
                            className={cn(
                                "px-3 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all border",
                                filter.active
                                    ? "bg-blue-50 border-blue-100 text-[#5B86E5]"
                                    : "bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-200"
                            )}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>
        </RightWidgetPanel>
    );
}
