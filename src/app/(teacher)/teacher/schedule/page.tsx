"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SoftCalendar } from "@/components/teacher/schedule/SoftCalendar";
import { FloatingSidebar } from "@/components/teacher/schedule/FloatingSidebar";
import { EditorialCalendarLayout } from "@/components/teacher/schedule/EditorialCalendarLayout";

export default function AestheticSchedulePage() {
    const [view, setView] = useState<"month" | "week" | "day">("week");
    const isSidebarOpen = true;

    return (
        <EditorialCalendarLayout title="January 2026" subtitle="Academic Calendar">
            {/* Editorial Header (Control Deck) */}
            <header className="h-28 flex items-center justify-between px-10 z-50">
                <div className="flex items-center gap-12">
                    <div className="flex flex-col">
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                            January 2026
                        </h1>
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mt-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#5B86E5]" />
                            Academic Calendar
                        </div>
                    </div>

                    {/* Minimal Nav Controls */}
                    <div className="flex items-center gap-2">
                        <button className="h-10 w-10 flex items-center justify-center hover:bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-600 transition-all">
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button className="px-6 py-2 text-[11px] font-bold text-slate-500 hover:text-[#5B86E5] transition-colors uppercase tracking-widest">
                            Today
                        </button>
                        <button className="h-10 w-10 flex items-center justify-center hover:bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-600 transition-all">
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-10">
                    {/* View Switcher (Soft Segmented) */}
                    <div className="flex bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50 h-12 w-72 items-center relative">
                        {["month", "week", "day"].map((v) => (
                            <button
                                key={v}
                                onClick={() => setView(v as "month" | "week" | "day")}
                                className={cn(
                                    "flex-1 relative text-[10px] font-bold uppercase tracking-widest z-10 transition-all duration-300",
                                    view === v ? "text-[#5B86E5]" : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                <span className="relative z-10">{v}</span>
                                {view === v && (
                                    <motion.div
                                        layoutId="activeAestheticView"
                                        className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-100"
                                        transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="h-12 w-12 flex items-center justify-center rounded-2xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all">
                            <Search className="h-5 w-5" />
                        </button>
                        <button className="h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#5B86E5] to-[#36D1DC] text-white shadow-lg shadow-blue-500/20 hover:scale-105 transition-all">
                            <Plus className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Workspace Layout */}
            <main className="flex-1 flex overflow-hidden">
                {/* Calendar Core */}
                <div className="flex-1 relative m-6 mr-0 overflow-hidden">
                    <SoftCalendar />
                </div>

                {/* Floating Sidebar (Right) */}
                <AnimatePresence>
                    {isSidebarOpen && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 340, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ type: "spring", damping: 28, stiffness: 220 }}
                            className="flex h-full"
                        >
                            <FloatingSidebar />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </EditorialCalendarLayout>
    );
}
