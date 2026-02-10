"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export type AestheticEventType = "lecture" | "exam" | "personal";

export interface AestheticCalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    type: AestheticEventType;
    room?: string;
    batch?: string;
    time?: string;
}

interface PastelEventProps {
    event: AestheticCalendarEvent;
}

export function PastelEvent({ event }: PastelEventProps) {
    const variants = {
        "lecture": "bg-blue-50 text-[#5B86E5] border-blue-100",
        "exam": "bg-rose-50 text-[#FF4D4D] border-rose-100",
        "personal": "bg-slate-50 text-slate-500 border-slate-100",
    };

    return (
        <motion.div
            whileHover={{
                y: -2,
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.08)",
                scale: 1.005
            }}
            className={cn(
                "h-full w-full p-4 rounded-2xl border flex flex-col justify-between transition-all group relative overflow-hidden bg-white shadow-sm",
                variants[event.type]
            )}
        >
            {/* Internal Left Border Strip */}
            <div className={cn(
                "absolute left-0 top-3 bottom-3 w-1 rounded-r-full",
                event.type === "lecture" ? "bg-[#5B86E5]" :
                    event.type === "exam" ? "bg-[#FF4D4D]" : "bg-slate-300"
            )} />

            <div className="pl-3 space-y-1 relative z-10">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                        {event.type}
                    </span>
                </div>
                <h4 className="text-sm font-bold leading-tight line-clamp-2 tracking-tight">
                    {event.title}
                </h4>
            </div>

            <div className="pl-3 flex items-center justify-between text-[11px] font-semibold opacity-70 relative z-10">
                <span>{event.room || "Digital Workspace"}</span>
                {event.batch && (
                    <span className="text-[10px] bg-white/50 px-2 py-0.5 rounded-md border border-slate-200/50">
                        {event.batch}
                    </span>
                )}
            </div>
        </motion.div>
    );
}
