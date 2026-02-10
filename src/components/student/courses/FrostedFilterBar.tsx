"use client";

import React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface FrostedFilterBarProps {
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (cat: string) => void;
}

export function FrostedFilterBar({
    categories,
    selectedCategory,
    setSelectedCategory
}: FrostedFilterBarProps) {
    return (
        <div className="sticky top-4 z-50 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="mx-auto max-w-5xl bg-white/70 backdrop-blur-xl border border-white/40 rounded-full px-6 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-center justify-between gap-4">

                {/* Categories */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0 px-2 mask-linear">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={cn(
                                "whitespace-nowrap px-5 py-2 rounded-full text-xs font-bold transition-all duration-300",
                                selectedCategory === cat
                                    ? "bg-[#4F46E5] text-white shadow-md shadow-indigo-500/20 scale-105"
                                    : "bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 border border-slate-100"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-64 flex-shrink-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Explore topics..."
                        className="w-full bg-white/50 border border-white/20 rounded-full py-2 pl-10 pr-4 text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:bg-white transition-all"
                    />
                </div>
            </div>
        </div>
    );
}
