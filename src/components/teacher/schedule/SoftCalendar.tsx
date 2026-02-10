"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { GlassEventCard } from "./GlassEventCard";
import { AestheticCalendarEvent } from "./PastelEvent";
import { GoldenTimeIndicator } from "./GoldenTimeIndicator";
import { Plus } from "lucide-react";

const HOURS = Array.from({ length: 24 }).map((_, i) => i);
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const MOCK_EVENTS: AestheticCalendarEvent[] = [
    {
        id: "1",
        title: "Advanced Data Structures & Algorithms",
        start: new Date(2026, 0, 20, 10, 0),
        end: new Date(2026, 0, 20, 11, 30),
        type: "lecture",
        room: "Room 304",
        batch: "CSE-A"
    },
    {
        id: "2",
        title: "Operating Systems Internals",
        start: new Date(2026, 0, 20, 13, 0),
        end: new Date(2026, 0, 20, 14, 30),
        type: "lecture",
        room: "Lecture Hall B",
        batch: "CSE-B"
    },
    {
        id: "3",
        title: "Neural Networks Final",
        start: new Date(2026, 0, 21, 9, 0),
        end: new Date(2026, 0, 21, 12, 0),
        type: "exam",
        room: "Examination Hall",
        batch: "AI-101"
    }
];

export function SoftCalendar() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [hoveredSlot, setHoveredSlot] = useState<{ day: number, hour: number, top: number } | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const calculateLaserPosition = () => {
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        return (hours * 60 + minutes);
    };

    return (
        <div className="h-full flex flex-col bg-white overflow-hidden select-none rounded-[32px] border border-slate-200 shadow-sm">
            {/* Soft Day Headers */}
            <div className="flex bg-slate-50/40 sticky top-0 z-30 ml-16 border-b border-slate-100">
                {DAYS.map((day, i) => (
                    <div key={day} className="flex-1 py-8 flex flex-col items-center justify-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                            {day}
                        </span>
                        <div className={cn(
                            "h-11 w-11 rounded-xl flex items-center justify-center text-sm transition-all duration-500 relative",
                            i === 1 // Hardcoded Tuesday for mock
                                ? "bg-[#5B86E5] text-white font-bold shadow-md shadow-blue-500/20"
                                : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                        )}>
                            <span className="relative z-10">{19 + i}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Calendar Grid Container */}
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto no-scrollbar relative">
                <div className="flex min-h-[1440px]">
                    {/* Time Column */}
                    <div className="w-16 border-r border-slate-100 sticky left-0 bg-slate-50/90 backdrop-blur-md z-20 flex flex-col">
                        {HOURS.map(hour => (
                            <div key={hour} className="h-[60px] relative text-[10px] font-bold text-slate-400 flex items-start justify-center pt-2">
                                {hour === 0 ? "" : `${hour.toString().padStart(2, '0')}:00`}
                            </div>
                        ))}
                    </div>

                    {/* Day Columns */}
                    <div className="flex-1 flex relative">
                        {/* Soft Grid Lines */}
                        <div className="absolute inset-0 pointer-events-none">
                            {HOURS.map(hour => (
                                <div key={hour} className="h-[60px] border-b border-slate-100/50" />
                            ))}
                            <div className="flex h-full w-full">
                                {DAYS.map((_, i) => (
                                    <div key={i} className="flex-1 border-r border-slate-100/50 last:border-r-0" />
                                ))}
                            </div>
                        </div>

                        {/* Events Overlay */}
                        <div className="absolute inset-0 z-10">
                            {MOCK_EVENTS.map(event => {
                                const startHour = event.start.getHours();
                                const startMin = event.start.getMinutes();
                                const endHour = event.end.getHours();
                                const endMin = event.end.getMinutes();

                                const top = (startHour * 60 + startMin);
                                const height = (endHour * 60 + endMin) - top;
                                const dayIdx = event.start.getDay() - 1; // Mon = 0

                                return (
                                    <div
                                        key={event.id}
                                        style={{
                                            top: `${top}px`,
                                            height: `${height}px`,
                                            left: `${(dayIdx / 7) * 100}%`,
                                            width: `${(1 / 7) * 100}%`
                                        }}
                                        className="absolute p-2"
                                    >
                                        <GlassEventCard event={event} />
                                    </div>
                                );
                            })}
                        </div>

                        {/* Brand Time Indicator */}
                        <GoldenTimeIndicator top={calculateLaserPosition()} />

                        {/* Interaction Layer */}
                        <div className="absolute inset-0 grid grid-cols-7">
                            {DAYS.map((_, dayIdx) => (
                                <div key={dayIdx} className="h-full flex flex-col">
                                    {HOURS.map(hour => (
                                        <div
                                            key={hour}
                                            className="h-[60px] relative transition-colors duration-300 group cursor-pointer"
                                            onMouseEnter={() => {
                                                setHoveredSlot({ day: dayIdx, hour, top: hour * 60 });
                                            }}
                                            onMouseLeave={() => setHoveredSlot(null)}
                                        >
                                            <AnimatePresence>
                                                {hoveredSlot?.day === dayIdx && hoveredSlot?.hour === hour && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.9 }}
                                                        className="absolute inset-0 flex items-center justify-center bg-[#5B86E5]/[0.02] z-0"
                                                    >
                                                        <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-slate-200/50 shadow-xl text-[10px] font-bold uppercase tracking-widest text-[#5B86E5]">
                                                            <Plus className="h-3 w-3" />
                                                            New Event
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
