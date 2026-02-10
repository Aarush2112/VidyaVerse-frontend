"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useCourseStore, CourseFilter } from "@/lib/store/useCourseStore";

const FILTERS: CourseFilter[] = ["All Courses", "In Progress", "Completed", "Saved"];

export function CourseHeader() {
    const { filter, setFilter, searchQuery, setSearchQuery } = useCourseStore();
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);

    return (
        <motion.header
            className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/50 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
        >
            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
                <h1 className="text-2xl font-bold text-violet-900 tracking-tight">My Learning</h1>
            </div>

            {/* Center: Smart Filters */}
            <div className="flex bg-slate-100/80 p-1 rounded-full relative overflow-x-auto no-scrollbar max-w-full">
                {FILTERS.map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={cn(
                            "relative px-4 py-1.5 text-xs font-bold rounded-full transition-colors z-10 whitespace-nowrap",
                            filter === f ? "text-violet-900" : "text-slate-500 hover:text-slate-700"
                        )}
                    >
                        {filter === f && (
                            <motion.div
                                layoutId="courseFilter"
                                className="absolute inset-0 bg-white rounded-full shadow-sm"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                        {f}
                    </button>
                ))}
            </div>

            {/* Right: Search & View Toggle */}
            <div className="flex items-center gap-4">
                <div
                    className={cn(
                        "relative flex items-center transition-all duration-300",
                        isSearchExpanded || searchQuery ? "w-64" : "w-10"
                    )}
                >
                    <Search
                        className="absolute left-3 z-10 text-slate-400 cursor-pointer"
                        size={20}
                        onClick={() => setIsSearchExpanded(true)}
                    />
                    <Input
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onBlur={() => !searchQuery && setIsSearchExpanded(false)}
                        className={cn(
                            "pl-10 bg-white/50 border-none rounded-full h-10 transition-all shadow-sm focus:ring-violet-500/20",
                            isSearchExpanded || searchQuery ? "opacity-100 w-full" : "opacity-0 w-0 p-0"
                        )}
                    />
                    {/* Fallback trigger if input is hidden */}
                    {!isSearchExpanded && !searchQuery && (
                        <div
                            className="absolute inset-0 cursor-pointer rounded-full hover:bg-slate-100"
                            onClick={() => setIsSearchExpanded(true)}
                        />
                    )}
                </div>

                <div className="hidden md:flex bg-gray-200/50 p-1 rounded-lg">
                    <div className="px-3 py-1.5 rounded-md bg-white shadow-sm cursor-pointer">
                        <LayoutGrid size={18} className="text-slate-900" />
                    </div>
                    <div className="px-3 py-1.5 rounded-md cursor-pointer text-slate-400 hover:text-slate-600">
                        <List size={18} />
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
