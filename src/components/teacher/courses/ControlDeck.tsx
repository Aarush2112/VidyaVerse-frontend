"use client";

import { useTeacherCourseStore, Stream, CourseStatus } from "@/lib/store/useTeacherCourseStore";
import { Search, Grid, List, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const ControlDeck = ({ onCreateClick }: { onCreateClick: () => void }) => {
    const { filter, viewMode, setFilter, setViewMode } = useTeacherCourseStore();

    const STATUS_FILTERS: (CourseStatus | 'ALL')[] = ['ALL', 'LIVE', 'DRAFT', 'ARCHIVED'];

    return (
        <div className="sticky top-0 z-30 py-6 bg-[#F3F4F6]/80 backdrop-blur-xl border-b border-slate-200/50 -mx-6 px-6 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Left: Search & Filter */}
            <div className="flex-1 w-full md:w-auto flex flex-col md:flex-row gap-4 items-center">
                <h1 className="text-2xl font-bold text-slate-900 hidden md:block whitespace-nowrap">My Curriculum</h1>

                <div className="flex items-center gap-2 bg-white rounded-full px-4 h-12 shadow-sm border border-slate-200 w-full md:w-[400px]">
                    <Search className="text-slate-400" size={18} />
                    <input
                        className="bg-transparent border-none outline-none text-sm placeholder:text-slate-400 w-full font-medium"
                        placeholder="Search inventory..."
                        value={filter.searchQuery}
                        onChange={(e) => setFilter('searchQuery', e.target.value)}
                    />
                </div>

                <div className="flex gap-2 p-1 bg-slate-200/50 rounded-full h-10 items-center overflow-x-auto max-w-full no-scrollbar">
                    {STATUS_FILTERS.map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter('status', status)}
                            className={cn(
                                "px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap",
                                filter.status === status
                                    ? "bg-white text-violet-700 shadow-sm"
                                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                            )}
                        >
                            {status === 'ALL' ? 'All Courses' : status.charAt(0) + status.slice(1).toLowerCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
                <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
                    <button
                        onClick={() => setViewMode('GRID')}
                        className={cn("p-2 rounded-md transition-all", viewMode === 'GRID' ? "bg-slate-100 text-violet-600" : "text-slate-400 hover:text-slate-600")}
                    >
                        <Grid size={18} />
                    </button>
                    <button
                        onClick={() => setViewMode('LIST')}
                        className={cn("p-2 rounded-md transition-all", viewMode === 'LIST' ? "bg-slate-100 text-violet-600" : "text-slate-400 hover:text-slate-600")}
                    >
                        <List size={18} />
                    </button>
                </div>

                <Button
                    onClick={onCreateClick}
                    className="h-10 rounded-full px-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-violet-500/20"
                >
                    <Plus size={18} className="mr-2" /> New Course
                </Button>
            </div>
        </div>
    );
};
