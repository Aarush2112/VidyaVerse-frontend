"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Play, Check, ChevronDown, Clock, Settings, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface StudioLayoutProps {
    children: React.ReactNode;
    title?: string;
    difficulty?: "Easy" | "Medium" | "Hard";
    onRun?: () => void;
    onSubmit?: () => void;
    isRunning?: boolean;
    isSubmitting?: boolean;
}

export function StudioLayout({
    children,
    title = "102. Two Sum",
    difficulty = "Easy",
    onRun,
    onSubmit,
    isRunning,
    isSubmitting
}: StudioLayoutProps) {
    return (
        <div className="h-screen w-full bg-[#F2F5F9] flex flex-col overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* Floating Command Bar */}
            <header className="flex-shrink-0 px-4 pt-4 pb-2 z-50">
                <div className="h-16 w-full bg-white rounded-full shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center justify-between px-2 pl-6">

                    {/* LEFT: Identity */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-200">
                                JS
                            </span>
                            <h1 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h1>
                        </div>
                        <span className={cn(
                            "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                            difficulty === "Easy" && "bg-emerald-50 text-emerald-600 border border-emerald-100",
                            difficulty === "Medium" && "bg-amber-50 text-amber-600 border border-amber-100",
                            difficulty === "Hard" && "bg-rose-50 text-rose-600 border border-rose-100"
                        )}>
                            {difficulty}
                        </span>
                    </div>

                    {/* CENTER: Meta Controls */}
                    <div className="hidden md:flex items-center gap-6">
                        <div className="flex items-center gap-2 bg-slate-50 rounded-full pl-3 pr-2 py-1.5 border border-slate-100 hover:border-slate-200 transition-colors cursor-pointer group">
                            <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900">JavaScript</span>
                            <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600" />
                        </div>

                        <div className="flex items-center gap-2 text-slate-400 font-mono text-sm">
                            <Clock size={16} />
                            <span>00:14:32</span>
                        </div>
                    </div>

                    {/* RIGHT: Actions */}
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full">
                            <Settings size={20} />
                        </Button>

                        <div className="h-8 w-[1px] bg-slate-100 mx-1" />

                        <Button
                            onClick={onRun}
                            disabled={isRunning || isSubmitting}
                            className="h-10 px-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm border border-slate-200 shadow-sm transition-all hover:scale-105"
                        >
                            {isRunning ? "Running..." : "Run Code"}
                            {!isRunning && <Play size={16} className="ml-2 fill-current opacity-60" />}
                        </Button>

                        <Button
                            onClick={onSubmit}
                            disabled={isSubmitting}
                            className="h-10 px-8 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white font-bold text-sm shadow-[0_4px_14px_rgba(59,130,246,0.4)] transition-all hover:shadow-[0_6px_20px_rgba(59,130,246,0.6)] hover:scale-[1.02]"
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                            {!isSubmitting && <Check size={16} className="ml-2 stroke-[3]" />}
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Workspace */}
            <main className="flex-1 overflow-hidden p-4 pt-2">
                {children}
            </main>
        </div>
    );
}
