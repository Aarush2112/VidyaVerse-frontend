"use client";

import { ReactNode } from "react";
import { Search, ChevronDown, Download, Send, BookOpen, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface SoftGradebookLayoutProps {
    children: ReactNode;
    selectedBatch: string;
    setSelectedBatch: (batch: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filter: string;
    setFilter: (filter: string) => void;
    headerContent?: ReactNode;
}

export function SoftGradebookLayout({
    children,
    selectedBatch,
    setSelectedBatch,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    headerContent
}: SoftGradebookLayoutProps) {
    return (
        <div className="flex-1 space-y-8 p-10 h-full bg-[#EBF1F9] min-h-screen text-slate-900 flex flex-col font-friendly overflow-hidden relative">
            {/* Subtle Ambient Light - Tuned for EBF1F9 */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-white/40 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-white/40 blur-[120px] rounded-full pointer-events-none -z-10" />

            {/* 1. Header & Quick Actions */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 animate-in fade-in duration-700">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                        Gradebook
                    </h2>
                    <p className="text-slate-500 text-sm">Manage student performance and grades.</p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Batch Selector Pill */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="bg-white border-slate-100 text-slate-600 hover:bg-slate-50 h-12 px-6 rounded-2xl soft-shadow-sm transition-all border">
                                <BookOpen className="h-4 w-4 mr-3 text-[#5B86E5]" />
                                <span className="font-bold">{selectedBatch}</span>
                                <ChevronDown className="ml-3 h-4 w-4 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white border-slate-100 text-slate-600 w-72 rounded-2xl p-2 soft-shadow-lg">
                            {["CSE-A: Data Structures", "CSE-B: Operating Systems", "AI-A: Neural Networks"].map((b) => (
                                <DropdownMenuItem key={b} onClick={() => setSelectedBatch(b)} className="rounded-xl py-3 font-semibold hover:bg-slate-50 cursor-pointer">
                                    {b}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Export Icon Pill */}
                    <Button variant="outline" className="bg-white border-slate-100 text-slate-400 hover:text-[#5B86E5] hover:bg-slate-50 h-12 w-12 p-0 rounded-2xl soft-shadow-sm transition-all">
                        <Download className="h-5 w-5" />
                    </Button>

                    {/* Publish Gradient Button */}
                    <Button className="bg-gradient-to-r from-[#5B86E5] to-[#36D1DC] text-white shadow-lg shadow-blue-500/20 hover:scale-105 h-12 px-8 rounded-full font-bold flex items-center gap-3 transition-all">
                        <Send className="h-4 w-4" />
                        Publish Grades
                    </Button>
                </div>
            </div>

            {/* 2. Analytics Ribbon */}
            {headerContent}

            {/* 3. The Control Bar (Floating Pill) */}
            <div className="bg-white rounded-full h-16 border border-slate-100 soft-shadow-md flex items-center justify-between px-8 gap-10">
                <div className="flex items-center gap-6 flex-1">
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-[#5B86E5] transition-colors" />
                        <Input
                            placeholder="Search by student name or roll number..."
                            className="pl-8 bg-transparent border-none text-slate-900 placeholder:text-slate-300 focus-visible:ring-0 h-12 font-semibold text-sm shadow-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="h-6 w-[1px] bg-slate-100 hidden md:block" />

                <div className="flex items-center gap-2">
                    {["All", "Failed", "Incomplete", "Top 10%"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={cn(
                                "px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                                filter === f
                                    ? "bg-blue-50 text-[#5B86E5] border border-blue-100"
                                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                            )}
                        >
                            {f}
                        </button>
                    ))}
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest ml-6">
                        <Calendar className="h-3.5 w-3.5" /> 2m ago
                    </div>
                </div>
            </div>

            {/* 4. The Smart Grade Table Core */}
            <div className="flex-1 flex flex-col min-h-0">
                {children}
            </div>
        </div>
    );
}
