"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export type EventType = "lecture" | "exam" | "office-hours";

export interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    type: EventType;
    room?: string;
    batch?: string;
}

interface EventCapsuleProps {
    event: CalendarEvent;
    isGhost?: boolean;
}

export function EventCapsule({ event, isGhost = false }: EventCapsuleProps) {
    const variants = {
        "lecture": "bg-indigo-500/10 border-indigo-500/50 text-indigo-100 shadow-[0_4px_12px_rgba(99,102,241,0.1)]",
        "exam": "bg-rose-500/15 border-rose-500/50 text-rose-100 shadow-[0_4px_12px_rgba(244,63,94,0.15)] overflow-hidden",
        "office-hours": "bg-emerald-500/5 border-emerald-500/30 border-dashed text-emerald-100",
    };

    return (
        <motion.div
            whileHover={{ scale: 1.01, zIndex: 10 }}
            className={cn(
                "h-full w-full p-2 rounded-lg border-l-[3px] flex flex-col justify-between transition-all group backdrop-blur-sm",
                variants[event.type],
                isGhost && "opacity-30 border-dashed"
            )}
        >
            {/* Background Pattern for Exams */}
            {event.type === "exam" && (
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:8px_8px]" />
            )}

            <div className="space-y-0.5 relative z-10">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] opacity-40">
                        {event.type}
                    </span>
                    {event.batch && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/5">
                            {event.batch}
                        </span>
                    )}
                </div>
                <h4 className="text-xs font-bold leading-tight line-clamp-2 italic">
                    {event.title}
                </h4>
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono opacity-60 relative z-10">
                <span>{event.room || "Digital"}</span>
                {/* Micro-indicator for active events */}
                <div className="h-1 w-1 rounded-full bg-current animate-pulse" />
            </div>

            {/* Glass Shimmer on Hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
        </motion.div>
    );
}
