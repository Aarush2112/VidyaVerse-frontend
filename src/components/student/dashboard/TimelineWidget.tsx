"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ScheduleEvent {
    id: string;
    title: string;
    time: string;
    type: string;
    isToday: boolean;
}

interface TimelineWidgetProps {
    events: ScheduleEvent[];
}

import { NeuCard } from "@/components/neu/NeuCard";

export function TimelineWidget({ events }: TimelineWidgetProps) {
    return (
        <NeuCard className="h-full overflow-hidden flex flex-col">
            <h3 className="text-xs font-bold text-neu-text-sub uppercase tracking-[0.2em] font-mono mb-6">
                Timeline
            </h3>

            <div className="flex-1 space-y-0 relative">
                {/* Vertical Line (Groove) */}
                <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-neu-base shadow-neu-concave-sm rounded-full" />

                {events.length === 0 ? (
                    <div className="text-sm text-neu-text-sub italic py-4 pl-8">No scheduled events.</div>
                ) : (
                    events.map((event, i) => (
                        <div key={event.id} className="relative pl-8 pb-8 last:pb-0 group">
                            {/* Dot */}
                            <div className={cn(
                                "absolute left-0 top-1.5 h-4 w-4 rounded-full z-10 bg-neu-base shadow-neu-convex-sm transition-colors border-2",
                                event.isToday ? "border-neu-danger shadow-[0_0_10px_rgba(239,68,68,0.4)]" : "border-neu-accent"
                            )} />

                            {/* Content */}
                            <div>
                                <span className={cn(
                                    "text-[10px] font-bold uppercase tracking-wider mb-1 block",
                                    event.isToday ? "text-neu-danger" : "text-neu-accent"
                                )}>
                                    {event.time}
                                </span>
                                <h4 className="text-sm font-bold text-neu-text-main group-hover:text-neu-accent transition-colors">
                                    {event.title}
                                </h4>
                                <span className="text-[10px] text-neu-text-sub font-mono bg-neu-base shadow-neu-concave-sm px-2 py-1 rounded-full mt-2 inline-block">
                                    {event.type}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </NeuCard>
    );
}
