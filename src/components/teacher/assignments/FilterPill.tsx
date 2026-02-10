"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface FilterPillProps {
    filter: string;
    setFilter: (filter: any) => void;
}

export function FilterPill({ filter, setFilter }: FilterPillProps) {
    const tabs = ["All", "Active", "Drafts", "Past"];

    return (
        <div className="flex bg-white rounded-full p-1 border border-slate-100 soft-shadow-sm">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={cn(
                        "relative px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 z-10",
                        filter === tab
                            ? "text-white"
                            : "text-slate-400 hover:text-slate-600"
                    )}
                >
                    {filter === tab && (
                        <div className="absolute inset-0 bg-slate-900 rounded-full -z-10 shadow-md transform scale-100 transition-transform" />
                    )}
                    {tab}
                </button>
            ))}
        </div>
    );
}
