"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AestheticCalendarEvent } from "./PastelEvent";

interface GlassEventCardProps {
    event: AestheticCalendarEvent;
}

export function GlassEventCard({ event }: GlassEventCardProps) {
    const isExam = event.type === "exam";

    return (
        <motion.div
            whileHover={{
                y: -2,
                boxShadow: "0 10px 20px -10px rgba(0,0,0,0.08)"
            }}
            className={cn(
                "h-full w-full rounded-2xl border border-slate-100 relative overflow-hidden flex flex-col p-4 transition-all duration-500 group bg-white shadow-sm",
                isExam && "bg-rose-50/30"
            )}
        >
            {/* Left Accent Border */}
            <div
                className={cn(
                    "absolute left-0 top-0 bottom-0 w-1",
                    isExam ? "bg-[#FF4D4D]" : "bg-[#5B86E5]"
                )}
            />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        {event.time || `${event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                    </span>
                    <div className={cn(
                        "h-2 w-2 rounded-full",
                        isExam ? "bg-[#FF4D4D] shadow-[0_2px_10px_rgba(255,77,77,0.2)]" : "bg-[#5B86E5] shadow-[0_2px_10px_rgba(91,134,229,0.2)]"
                    )} />
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-snug mb-3 flex-grow">
                    {event.title}
                </h4>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-50 mt-auto">
                    <div className="flex flex-wrap gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-md">
                            {event.room}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-md">
                            {event.batch}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
