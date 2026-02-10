"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface RightWidgetPanelProps {
    children: React.ReactNode;
    className?: string;
}

export function RightWidgetPanel({ children, className }: RightWidgetPanelProps) {
    return (
        <aside
            className={cn(
                "w-80 bg-[#F8FAFC] border-l border-slate-100 rounded-l-[40px] flex flex-col relative overflow-hidden shadow-sm z-20",
                className
            )}
        >
            <div className="flex-1 overflow-y-auto no-scrollbar p-8">
                {children}
            </div>
        </aside>
    );
}
