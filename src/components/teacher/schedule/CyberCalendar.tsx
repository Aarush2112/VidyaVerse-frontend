"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { EventCapsule, CalendarEvent } from "./EventCapsule";

const HOURS = Array.from({ length: 24 }).map((_, i) => i);
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const MOCK_EVENTS: CalendarEvent[] = [
    {
        id: "1",
        title: "Advanced Data Structures & Algorithms",
        start: new Date(2026, 0, 20, 10, 0),
        end: new Date(2026, 0, 20, 11, 30),
        type: "lecture",
        room: "304",
        batch: "CSE-A"
    },
    {
        id: "2",
        title: "Operating Systems Internals",
        start: new Date(2026, 0, 20, 13, 0),
        end: new Date(2026, 0, 20, 14, 30),
        type: "lecture",
        room: "102",
        batch: "CSE-B"
    },
    {
        id: "3",
        title: "Semester Final: Neural Networks",
        start: new Date(2026, 0, 21, 9, 0),
        end: new Date(2026, 0, 21, 12, 0),
        type: "exam",
        room: "Main Hall",
        batch: "AI-101"
    }
];

export function CyberCalendar() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [hoveredSlot, setHoveredSlot] = useState<{ day: number, hour: number } | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Update laser indicator every minute
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    // Calculate Laser Line Position (Percentage from top)
    const calculateLaserPosition = () => {
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        return ((hours * 60 + minutes) / (24 * 60)) * 100;
    };

    return (
        <div className="h-full flex flex-col bg-zinc-950 overflow-hidden select-none">
            {/* Calendar Days Header */}
            <div className="flex border-b border-white/5 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-30 ml-16">
                {DAYS.map((day, i) => (
                    <div key={day} className="flex-1 py-4 text-center border-r border-white/5 last:border-r-0">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 block mb-1">
                            {day}
                        </span>
                        <span className={cn(
                            "text-xl font-black italic tracking-tighter",
                            i === 1 ? "text-indigo-400" : "text-zinc-400" // Hardcoded current day for mock
                        )}>
                            {19 + i}
                        </span>
                    </div>
                ))}
            </div>

            {/* Calendar Grid Container */}
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto no-scrollbar relative">
                <div className="flex min-h-[1440px]"> {/* 60px per hour */}
                    {/* Time Column */}
                    <div className="w-16 border-r border-white/5 sticky left-0 bg-zinc-950 z-20 flex flex-col">
                        {HOURS.map(hour => (
                            <div key={hour} className="h-[60px] relative text-[10px] font-mono text-zinc-700 flex items-start justify-center pt-2">
                                {hour === 0 ? "" : `${hour}:00`}
                            </div>
                        ))}
                    </div>

                    {/* Day Columns */}
                    <div className="flex-1 flex relative">
                        {/* Vertical Grid Lines */}
                        {DAYS.map((_, i) => (
                            <div key={i} className="flex-1 border-r border-white/5 last:border-r-0 relative" />
                        ))}

                        {/* Horizontal Grid Lines */}
                        <div className="absolute inset-0 pointer-events-none">
                            {HOURS.map(hour => (
                                <div key={hour} className="h-[60px] border-b border-zinc-800/20" />
                            ))}
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
                                        className="absolute p-px"
                                    >
                                        <EventCapsule event={event} />
                                    </div>
                                );
                            })}
                        </div>

                        {/* Phantom Event (Ghost) */}
                        <AnimatePresence>
                            {hoveredSlot && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.15 }}
                                    exit={{ opacity: 0 }}
                                    style={{
                                        top: `${hoveredSlot.hour * 60}px`,
                                        height: "60px",
                                        left: `${(hoveredSlot.day / 7) * 100}%`,
                                        width: `${(1 / 7) * 100}%`
                                    }}
                                    className="absolute bg-indigo-500 border border-indigo-500/50 rounded-lg z-0 pointer-events-none"
                                />
                            )}
                        </AnimatePresence>

                        {/* Laser Indicator (Current Time) */}
                        <div
                            className="absolute left-0 right-0 z-40 flex items-center group/laser pointer-events-none"
                            style={{ top: `${(calculateLaserPosition() / 100) * 1440}px` }}
                        >
                            <div className="h-0.5 w-0.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,1)] ml-[-2px] relative z-10" />
                            <div className="flex-1 h-px bg-rose-500/40 relative">
                                <div className="absolute inset-0 bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]" />
                            </div>
                        </div>

                        {/* Interaction Layer */}
                        <div className="absolute inset-0 grid grid-cols-7">
                            {DAYS.map((_, dayIdx) => (
                                <div key={dayIdx} className="h-full flex flex-col">
                                    {HOURS.map(hour => (
                                        <div
                                            key={hour}
                                            className="h-[60px] cursor-crosshair"
                                            onMouseEnter={() => setHoveredSlot({ day: dayIdx, hour })}
                                            onMouseLeave={() => setHoveredSlot(null)}
                                        />
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
