"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
    ChevronLeft,
    ChevronRight,
    Clock,
    Filter,
    Layers,
    Bell
} from "lucide-react";
import { useState } from "react";

const UP_NEXT = [
    { title: "Data Structures", time: "10:00 AM", room: "304", type: "lecture" },
    { title: "OS Internals", time: "12:30 PM", room: "102", type: "lecture" },
    { title: "Final Viva Voce", time: "03:00 PM", room: "Lab A", type: "exam" },
];

export function ContextRail() {
    const [activeFilters, setActiveFilters] = useState(["academics", "exams"]);

    const toggleFilter = (filter: string) => {
        setActiveFilters(prev =>
            prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );
    };

    return (
        <aside className="w-80 border-l border-white/5 bg-zinc-900/20 backdrop-blur-xl h-full flex flex-col p-6 space-y-10 overflow-hidden">
            {/* 1. Mini-Calendar (Sleek Visual) */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                    <h3 className="text-sm font-bold text-white tracking-tight">January 2026</h3>
                    <div className="flex items-center gap-1">
                        <button className="p-1 hover:bg-white/5 rounded-md text-zinc-500 transition-colors">
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button className="p-1 hover:bg-white/5 rounded-md text-zinc-500 transition-colors">
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center">
                    {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                        <div key={`${day}-${i}`} className="text-[10px] font-black text-zinc-600 uppercase py-1">{day}</div>
                    ))}
                    {Array.from({ length: 31 }).map((_, i) => {
                        const day = i + 1;
                        const isSelected = day === 20;
                        const hasEvent = [2, 12, 15, 20, 25, 28].includes(day);

                        return (
                            <div
                                key={i}
                                className={cn(
                                    "relative h-8 flex items-center justify-center text-xs rounded-lg transition-all cursor-pointer",
                                    isSelected ? "bg-indigo-600 text-white font-bold shadow-[0_0_15px_rgba(99,102,241,0.4)]" : "text-zinc-500 hover:bg-white/5",
                                    !isSelected && hasEvent && "font-bold text-zinc-300"
                                )}
                            >
                                {day}
                                {hasEvent && !isSelected && (
                                    <div className="absolute bottom-1 auto h-1 w-1 bg-indigo-500/50 rounded-full" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 2. "Up Next" Queue (Ticket Stub Look) */}
            <div className="space-y-6 flex-1 min-h-0 overflow-hidden flex flex-col">
                <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-indigo-400" />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Upcoming Syncs</h3>
                    </div>
                    <Bell className="h-3 w-3 text-zinc-700 hover:text-indigo-400 cursor-pointer transition-colors" />
                </div>

                <div className="space-y-4 overflow-y-auto no-scrollbar pb-10">
                    {UP_NEXT.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="relative group cursor-pointer"
                        >
                            {/* Ticket Stub Design */}
                            <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[#09090b] z-10" />
                            <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[#09090b] z-10" />

                            <div className={cn(
                                "p-4 rounded-xl border border-white/5 transition-all flex flex-col gap-2",
                                item.type === "exam" ? "bg-rose-500/5 group-hover:bg-rose-500/10 border-rose-500/20" : "bg-white/5 group-hover:bg-white/10"
                            )}>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-mono text-indigo-400/80">{item.time}</span>
                                    {item.type === "exam" && (
                                        <div className="px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[8px] font-black uppercase tracking-widest pulsing-border">
                                            Priority
                                        </div>
                                    )}
                                </div>
                                <h4 className="text-sm font-bold text-zinc-200 tracking-tight leading-none italic">{item.title}</h4>
                                <div className="flex items-center gap-2 text-[10px] text-zinc-600 font-medium">
                                    <Layers className="h-3 w-3" />
                                    <span>Room {item.room}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* 3. Layer Filter Toggles */}
            <div className="pt-6 border-t border-white/5 space-y-4">
                <div className="flex items-center gap-2 px-1">
                    <Filter className="h-3 w-3 text-zinc-600" />
                    <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">Temporal Layers</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {[
                        { id: "academics", label: "Lectures", color: "text-indigo-400" },
                        { id: "exams", label: "Assesments", color: "text-rose-400" },
                        { id: "personal", label: "Personal", color: "text-emerald-400" },
                    ].map(layer => (
                        <button
                            key={layer.id}
                            onClick={() => toggleFilter(layer.id)}
                            className={cn(
                                "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border",
                                activeFilters.includes(layer.id)
                                    ? "bg-white/10 border-white/10 text-white"
                                    : "bg-transparent border-white/5 text-zinc-600 hover:border-white/10"
                            )}
                        >
                            <span className={cn("mr-1.5 inline-block w-1.5 h-1.5 rounded-full",
                                layer.id === "academics" ? "bg-indigo-500" :
                                    layer.id === "exams" ? "bg-rose-500" : "bg-emerald-500"
                            )} />
                            {layer.label}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
}
