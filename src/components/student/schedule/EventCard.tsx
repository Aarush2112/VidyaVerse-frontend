"use client";

import React from "react";
import { motion } from "framer-motion";
import { CalendarEvent } from "@/lib/store/useScheduleStore";
import { cn } from "@/lib/utils";
import { AlertCircle, Beaker, BookOpen, Clock } from "lucide-react";

interface EventCardProps {
    event: CalendarEvent;
    onClick: (event: CalendarEvent) => void;
    style?: React.CSSProperties;
}

export function EventCard({ event, onClick, style }: EventCardProps) {
    const getVariantStyles = (type: CalendarEvent['type']) => {
        switch (type) {
            case 'LECTURE':
                return "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100";
            case 'LAB':
                return "bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-100";
            case 'EXAM':
                return "bg-[#7C3AED] text-white shadow-lg shadow-violet-500/30 border-transparent";
            case 'DEADLINE':
                return "bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-100";
            default:
                return "bg-slate-50 text-slate-700 border-slate-100";
        }
    };

    const Icon = {
        LECTURE: BookOpen,
        LAB: Beaker,
        EXAM: AlertCircle,
        DEADLINE: Clock
    }[event.type];

    return (
        <motion.div
            className={cn(
                "absolute rounded-[20px] p-3 border cursor-pointer overflow-hidden transition-colors flex flex-col justify-between",
                getVariantStyles(event.type)
            )}
            style={style}
            onClick={() => onClick(event)}
            whileHover={{ scale: 1.05, zIndex: 50, transition: { type: "spring", stiffness: 400, damping: 20 } }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <div className="flex items-start justify-between gap-2">
                <span className="font-bold text-xs md:text-sm line-clamp-1 leading-tight">
                    {event.title}
                </span>
                {Icon && <Icon size={14} className="shrink-0 opacity-80" />}
            </div>

            <div className="mt-1">
                <div className="text-[10px] md:text-xs opacity-80 font-medium truncate">
                    {event.location}
                </div>
                {event.type !== 'EXAM' && (
                    <div className="text-[10px] opacity-70 truncate">
                        {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
