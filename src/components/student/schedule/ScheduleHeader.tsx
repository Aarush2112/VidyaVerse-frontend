"use client";

import React from "react";
import { ChevronLeft, ChevronRight, CalendarCheck } from "lucide-react";
import { format, addWeeks, subWeeks } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScheduleStore } from "@/lib/store/useScheduleStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ScheduleHeader() {
    const { currentDate, setCurrentDate, viewMode, setViewMode } = useScheduleStore();

    const handlePrev = () => {
        setCurrentDate(subWeeks(currentDate, 1));
    };

    const handleNext = () => {
        setCurrentDate(addWeeks(currentDate, 1));
    };

    const handleSync = () => {
        toast.success("Schedule synced with Google Calendar");
    };

    return (
        <motion.header
            className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-white/50 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
        >
            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Academic Schedule</h1>

                {/* Date Navigator */}
                <div className="flex items-center gap-4 bg-white/50 rounded-full px-2 py-1 border border-white/60">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white" onClick={handlePrev}>
                        <ChevronLeft size={18} className="text-slate-600" />
                    </Button>

                    <div className="w-32 text-center font-bold text-slate-700 text-sm overflow-hidden h-5 relative">
                        <AnimatePresence mode="popLayout" initial={false} custom={currentDate.getTime() > new Date().getTime() ? 1 : -1}>
                            <motion.span
                                key={currentDate.toISOString()}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="block absolute inset-0"
                            >
                                {format(currentDate, 'MMMM yyyy')}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white" onClick={handleNext}>
                        <ChevronRight size={18} className="text-slate-600" />
                    </Button>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* View Toggle */}
                <div className="flex bg-slate-100/80 p-1 rounded-full relative">
                    {(['day', 'week', 'month'] as const).map((mode) => (
                        <button
                            key={mode}
                            onClick={() => setViewMode(mode)}
                            className={cn(
                                "relative px-4 py-1.5 text-xs font-bold rounded-full transition-colors z-10 capitalize",
                                viewMode === mode ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
                            )}
                        >
                            {viewMode === mode && (
                                <motion.div
                                    layoutId="viewToggle"
                                    className="absolute inset-0 bg-white rounded-full shadow-sm"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            {mode}
                        </button>
                    ))}
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-500 hover:text-violet-600 gap-2 hover:bg-violet-50 rounded-full"
                    onClick={handleSync}
                >
                    <CalendarCheck size={16} /> <span className="hidden sm:inline">Sync</span>
                </Button>
            </div>
        </motion.header>
    );
}
