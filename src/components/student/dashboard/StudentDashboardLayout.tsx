"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Terminal, BookOpen, Trophy, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { LevelOrb } from "./LevelOrb";
import { FocusModuleCard } from "./FocusModuleCard";
import { FutureStream } from "./FutureStream";
import { QuickLaunchCard } from "./QuickLaunchCard";
import { Button } from "@/components/ui/button";

export function StudentDashboardLayout() {
    return (
        <div className="min-h-screen bg-[#F2F5F9] pb-20 pt-8 px-4 md:px-8 max-w-[1400px] mx-auto font-sans">

            {/* A. Warm Welcome (Header) */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                <div className="space-y-2">
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight"
                    >
                        Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Poorak.</span>
                    </motion.h1>
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-500">
                        <span className="flex items-center gap-1.5 text-emerald-600">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Session Active
                        </span>
                        <span className="text-slate-300">•</span>
                        <span>Your learning journey is ready to resume.</span>
                    </div>
                </div>

                <Button className="h-12 px-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/20 text-white font-bold transition-all hover:scale-105">
                    Resume Lesson <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </header>

            {/* Main Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* Left Column (Stats) */}
                <div className="col-span-12 md:col-span-3 flex flex-col gap-6">
                    {/* B. Level Orb */}
                    <div className="h-[280px]">
                        <LevelOrb />
                    </div>

                    {/* E. Stat Pills */}
                    <div className="grid grid-cols-2 gap-4 flex-1">
                        <div className="bg-white rounded-[24px] p-4 border border-slate-100 shadow-sm flex flex-col items-center justify-center">
                            <div className="h-10 w-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 mb-2">
                                <Flame size={20} fill="currentColor" />
                            </div>
                            <span className="text-2xl font-black text-slate-800">12</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Day Streak</span>
                        </div>
                        <div className="bg-white rounded-[24px] p-4 border border-slate-100 shadow-sm flex flex-col items-center justify-center">
                            <div className="h-10 w-10 bg-lime-50 rounded-full flex items-center justify-center text-lime-600 mb-2">
                                <Trophy size={20} fill="currentColor" />
                            </div>
                            <span className="text-2xl font-black text-slate-800">#42</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Global Rank</span>
                        </div>
                    </div>
                </div>

                {/* Center Column (Focus) */}
                <div className="col-span-12 md:col-span-6 h-full min-h-[400px]">
                    {/* C. Focus Module */}
                    <FocusModuleCard />
                </div>

                {/* Right Column (Future) */}
                <div className="col-span-12 md:col-span-3 h-full min-h-[400px]">
                    {/* D. Future Stream */}
                    <FutureStream />
                </div>

                {/* F. Quick Launch (Bottom Row) */}
                <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
                    <QuickLaunchCard
                        title="Code Studio"
                        description="Open IDE Playground"
                        icon={Terminal}
                        bg="bg-purple-50"
                        color="text-purple-600"
                        href="/student/ide"
                    />
                    <QuickLaunchCard
                        title="Course Library"
                        description="Browse 40+ Modules"
                        icon={BookOpen}
                        bg="bg-orange-50"
                        color="text-orange-600"
                        href="/student/courses"
                    />
                    <QuickLaunchCard
                        title="Leaderboard"
                        description="Check Rankings"
                        icon={Trophy}
                        bg="bg-emerald-50"
                        color="text-emerald-600"
                        href="/student/leaderboard"
                    />
                </div>

            </div>
        </div>
    );
}
