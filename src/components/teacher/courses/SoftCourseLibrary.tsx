"use client";

import React from "react";
import { Search, LayoutGrid, List, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SoftCourseLibraryLayoutProps {
    children: React.ReactNode;
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    viewMode: "grid" | "list";
    setViewMode: (mode: "grid" | "list") => void;
}

export function SoftCourseLibraryLayout({
    children,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode
}: SoftCourseLibraryLayoutProps) {
    return (
        <div className="flex-1 space-y-10 p-10 h-full bg-[#F2F5F9] min-h-screen flex flex-col font-friendly overflow-hidden relative">
            {/* Ambient Background */}
            <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-sky-200/20 blur-[150px] rounded-full pointer-events-none -z-10" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-200/20 blur-[150px] rounded-full pointer-events-none -z-10" />

            {/* Floating Control Deck */}
            <div className="sticky top-4 z-50 mx-auto max-w-7xl w-full">
                <div className="bg-white/80 backdrop-blur-xl rounded-full px-8 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/50 flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Left: Branding */}
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold text-slate-800 tracking-tight">My Curriculum</h1>
                        <span className="px-4 py-1.5 rounded-full bg-[#FFF7ED] text-[#C2410C] text-xs font-bold uppercase tracking-wider">
                            Spring 2026
                        </span>
                    </div>

                    {/* Right: Controls */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        {/* Search */}
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-[#5B86E5] transition-colors" />
                            <input
                                type="text"
                                placeholder="Search inventory..."
                                className="w-full md:w-64 bg-slate-50 border-none rounded-full py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B86E5]/20 hover:bg-slate-100 transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Toggle */}
                        <div className="flex bg-slate-100 p-1 rounded-full">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={cn(
                                    "p-2 rounded-full transition-all duration-300",
                                    viewMode === "grid" ? "bg-white shadow-sm text-slate-800" : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                <LayoutGrid size={16} />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={cn(
                                    "p-2 rounded-full transition-all duration-300",
                                    viewMode === "list" ? "bg-white shadow-sm text-slate-800" : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                <List size={16} />
                            </button>
                        </div>

                        {/* Add Button */}
                        <Button className="rounded-full bg-gradient-to-r from-[#5B86E5] to-[#36D1DC] text-white font-bold px-6 shadow-lg shadow-blue-500/20 hover:scale-105 transition-all">
                            <Plus size={16} className="mr-2" />
                            New Course
                        </Button>
                    </div>
                </div>
            </div>

            {/* Canvas Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar mx-auto max-w-7xl w-full pt-4">
                {children}
            </div>
        </div>
    );
}
