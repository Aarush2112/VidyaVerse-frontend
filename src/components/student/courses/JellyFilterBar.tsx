"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

// Mapping valid Stream Enums for now, or arbitrary strings
const FILTERS = ["All Courses", "CSE", "ECE", "MECH", "AI_ML"];

export function JellyFilterBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get("category") || "All Courses";

    const [activeFilter, setActiveFilter] = useState(currentCategory);

    useEffect(() => {
        setActiveFilter(currentCategory);
    }, [currentCategory]);

    const onSelect = (filter: string) => {
        setActiveFilter(filter);
        const params = new URLSearchParams(searchParams.toString());

        if (filter === "All Courses") {
            params.delete("category");
        } else {
            params.set("category", filter);
        }

        router.push(`${window.location.pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-1">
            {FILTERS.map((filter) => (
                <button
                    key={filter}
                    onClick={() => onSelect(filter)}
                    className={cn(
                        "relative px-5 py-2.5 rounded-full text-sm font-bold transition-colors z-10 shrink-0",
                        activeFilter === filter ? "text-white" : "text-slate-500 hover:text-slate-900 bg-white shadow-sm border border-slate-100"
                    )}
                    style={{ WebkitTapHighlightColor: "transparent" }}
                >
                    {/* Active Background Pill with Shared Layout Transition */}
                    {activeFilter === filter && (
                        <motion.div
                            layoutId="activeFilter"
                            className="absolute inset-0 bg-violet-600 rounded-full -z-10 shadow-lg shadow-violet-500/30"
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 25
                            }}
                        />
                    )}
                    {filter}
                </button>
            ))}
        </div>
    );
}
