"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addDays, format, startOfWeek, isSameDay, setHours, setMinutes, differenceInMinutes, startOfDay } from "date-fns";
import { useScheduleStore, CalendarEvent } from "@/lib/store/useScheduleStore";
import { EventCard } from "./EventCard";
import { cn } from "@/lib/utils";

const HOURS = Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM to 8 PM
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function CalendarGrid() {
    const { currentDate, events, viewMode, setSelectedEvent } = useScheduleStore();
    const [now, setNow] = useState(new Date());

    // Update "Now" line every minute
    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 60000);
        return () => clearInterval(interval);
    }, []);

    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    // Calculate position styles
    const getEventStyle = (event: CalendarEvent) => {
        const startMinutes = differenceInMinutes(event.start, startOfDay(event.start)) - (8 * 60); // Minutes from 8 AM
        const durationBtn = differenceInMinutes(event.end, event.start);

        return {
            top: `${(startMinutes / 60) * 80}px`, // 80px per hour
            height: `${(durationBtn / 60) * 80}px`,
            width: '100%'
        };
    };

    const getNowTop = () => {
        const startMinutes = differenceInMinutes(now, startOfDay(now)) - (8 * 60);
        return (startMinutes / 60) * 80;
    };

    return (
        <div className="bg-white rounded-[32px] shadow-soft-md border border-slate-100 overflow-hidden relative flex flex-col h-[800px]">

            {/* Header Row (Days) */}
            <div className="grid grid-cols-8 border-b border-slate-100 bg-slate-50/50">
                <div className="p-4 border-r border-slate-100 flex items-center justify-center">
                    <span className="text-xs font-bold text-slate-400">GMT+05:30</span>
                </div>
                {weekDays.map((date, i) => {
                    const isToday = isSameDay(date, now);
                    return (
                        <div key={i} className={cn("p-4 text-center border-r border-slate-100/50 last:border-r-0 flex flex-col gap-1", isToday ? "bg-violet-50/30" : "")}>
                            <span className={cn("text-xs font-bold uppercase", isToday ? "text-violet-600" : "text-slate-400")}>{format(date, 'EEE')}</span>
                            <div className={cn("h-8 w-8 mx-auto rounded-full flex items-center justify-center text-sm font-bold transition-all",
                                isToday ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30" : "text-slate-900 group-hover:bg-slate-100"
                            )}>
                                {format(date, 'd')}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Time Grid with Scroll */}
            <div className="flex-1 overflow-y-auto relative no-scrollbar">
                <div className="grid grid-cols-8 relative min-h-[1040px]"> {/* 13 hours * 80px */}

                    {/* Time Column */}
                    <div className="border-r border-slate-100 bg-white sticky left-0 z-20">
                        {HOURS.map((hour) => (
                            <div key={hour} className="h-[80px] border-b border-slate-50 text-right pr-4 pt-2 relative">
                                <span className="text-xs font-medium text-slate-400 transform -translate-y-1/2 block">
                                    {format(setHours(new Date(), hour), 'h a')}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Days Columns */}
                    {weekDays.map((day, dayIndex) => {
                        const dayEvents = events.filter(e => isSameDay(e.start, day));

                        return (
                            <div key={dayIndex} className="border-r border-slate-100/50 relative bg-slate-50/10 hover:bg-slate-50/30 transition-colors">
                                {/* Grid Lines */}
                                {HOURS.map((h) => (
                                    <div key={h} className="h-[80px] border-b border-slate-100/50" />
                                ))}

                                {/* Events */}
                                <AnimatePresence>
                                    {dayEvents.map((event) => (
                                        <EventCard
                                            key={event.id}
                                            event={event}
                                            onClick={setSelectedEvent}
                                            style={getEventStyle(event)}
                                        />
                                    ))}
                                </AnimatePresence>

                                {/* Current Time Line */}
                                {isSameDay(day, now) && (
                                    <motion.div
                                        className="absolute w-full border-t-2 border-red-500 z-30 pointer-events-none flex items-center"
                                        style={{ top: `${getNowTop()}px` }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <div className="w-2 h-2 bg-red-500 rounded-full -ml-1 shadow-sm" />
                                    </motion.div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
