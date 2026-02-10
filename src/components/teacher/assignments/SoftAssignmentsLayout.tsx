"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { FilterPill } from "@/components/teacher/assignments/FilterPill";


interface SoftAssignmentsLayoutProps {
    children: React.ReactNode;
    title: string;
    filter: string;
    setFilter: (filter: any) => void;
    onCreate?: () => void;
}

export function SoftAssignmentsLayout({
    children,
    title,
    filter,
    setFilter,
    onCreate
}: SoftAssignmentsLayoutProps) {
    return (
        <div className="flex-1 space-y-10 p-10 h-full bg-[#F2F5F9] min-h-screen text-slate-900 flex flex-col font-friendly overflow-hidden relative">
            {/* Subtle Ambient Light */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-sky-200/[0.15] blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-indigo-200/[0.15] blur-[120px] rounded-full pointer-events-none -z-10" />

            {/* Header Island */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
                <h1 className="text-4xl font-bold text-slate-900 tracking-tight">{title}</h1>

                <div className="flex items-center gap-6">
                    <FilterPill filter={filter} setFilter={setFilter} />
                    <Button
                        onClick={onCreate}
                        className="h-12 px-8 rounded-full bg-gradient-to-r from-[#4FACFE] to-[#00F2FE] text-white font-bold shadow-lg shadow-blue-400/30 hover:shadow-blue-400/50 hover:scale-105 transition-all"
                    >
                        <Plus className="mr-2 h-5 w-5" />
                        Create
                    </Button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
                {children}
            </div>
        </div>
    );
}
