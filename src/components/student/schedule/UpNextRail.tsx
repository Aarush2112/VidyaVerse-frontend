import React from "react";
import { motion } from "framer-motion";
import { Zap, Clock, Calendar, Search } from "lucide-react";
import { useScheduleStore } from "@/lib/store/useScheduleStore";
import { cn } from "@/lib/utils";

export function UpNextRail() {
    // Static mock for "Happening Now" logic for demo purposes
    // In real app, filter events by Current Time

    return (
        <div className="space-y-6">

            {/* Happening Now Card */}
            <div className="relative">
                <motion.div
                    className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-[26px] blur opacity-30"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative bg-white rounded-[24px] p-6 shadow-soft-sm border border-slate-100">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500"></span>
                        </span>
                        <span className="text-xs font-bold text-violet-600 uppercase tracking-wider">Happening Now</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-1">Data Structures</h3>
                    <p className="text-sm text-slate-500 mb-4 font-medium">Room 304 • Dr. Sarah Smith</p>

                    <div className="w-full bg-slate-100 h-1.5 rounded-full mb-2 overflow-hidden">
                        <motion.div
                            className="h-full bg-violet-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "45%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                        />
                    </div>
                    <p className="text-xs text-right text-slate-400 font-bold">15m Remaining</p>
                </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white/50 backdrop-blur-md rounded-[24px] p-6 border border-white/60">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Clock size={16} className="text-rose-500" /> Upcoming Deadlines
                </h3>

                <div className="space-y-3">
                    <DeadlineItem
                        title="DBMS Project Report"
                        course="Database Systems"
                        due="Tomorrow, 11:59 PM"
                        urgent
                    />
                    <DeadlineItem
                        title="Linear Algebra Quiz 3"
                        course="Mathematics"
                        due="Wed, 10:00 AM"
                    />
                    <DeadlineItem
                        title="React Component Lab"
                        course="Web Engineering"
                        due="Thu, 2:00 PM"
                    />
                </div>
            </div>

            {/* Monthly Calendar Mini (Visual Only) */}
            <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 text-center opacity-80">
                <div className="font-bold text-slate-900 mb-4">October 2026</div>
                <div className="grid grid-cols-7 gap-2 text-xs text-slate-400 font-medium mb-2">
                    <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                </div>
                <div className="grid grid-cols-7 gap-2 text-xs font-bold text-slate-700">
                    {Array.from({ length: 31 }).map((_, i) => (
                        <div key={i} className={cn("h-7 w-7 flex items-center justify-center rounded-full hover:bg-violet-50 cursor-pointer", i === 23 ? "bg-violet-600 text-white shadow-md" : "")}>
                            {i + 1}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

function DeadlineItem({ title, course, due, urgent }: any) {
    return (
        <div className="group flex items-start gap-3 p-3 rounded-2xl hover:bg-white hover:shadow-sm transition-all cursor-pointer border border-transparent hover:border-slate-50">
            <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0", urgent ? "bg-rose-50 text-rose-600" : "bg-slate-100 text-slate-500")}>
                {urgent ? <Zap size={18} fill="currentColor" /> : <Calendar size={18} />}
            </div>
            <div>
                <h4 className="font-bold text-slate-800 text-sm leading-tight group-hover:text-violet-700 transition-colors">{title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{course}</p>
                <p className={cn("text-[10px] font-bold mt-1", urgent ? "text-rose-500" : "text-slate-400")}>{due}</p>
            </div>
        </div>
    )
}
