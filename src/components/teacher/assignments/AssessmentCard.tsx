"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Code2, BookOpen, Clock, Users, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

interface AssessmentCardProps {
    title: string;
    type: "Coding" | "Theory";
    dueDate: string;
    batch: string;
    submitted: number;
    total: number;
    status: "Active" | "Draft" | "Closed";
}

export function AssessmentCard({ title, type, dueDate, batch, submitted, total, status }: AssessmentCardProps) {
    const isCoding = type === "Coding";
    const percentage = Math.round((submitted / total) * 100);

    const handleArchive = (e: React.MouseEvent) => {
        if (status === "Closed") return;

        // Trigger confetti from cursor position
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
            origin: { x, y },
            particleCount: 60,
            spread: 70,
            colors: ['#4FACFE', '#00F2FE', '#A78BFA']
        });
    };

    return (
        <div className="group bg-white p-8 rounded-[32px] border border-slate-100 soft-shadow-sm hover:soft-shadow-xl hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
            {/* Soft Icon Bubble */}
            <div className="flex justify-between items-start mb-6">
                <div className={cn(
                    "h-14 w-14 rounded-[20px] flex items-center justify-center text-2xl shadow-sm transition-transform group-hover:rotate-6",
                    isCoding ? "bg-sky-50 text-sky-500" : "bg-purple-50 text-purple-500"
                )}>
                    {isCoding ? <Code2 size={24} /> : <BookOpen size={24} />}
                </div>
                <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        {batch}
                    </span>
                    <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                        status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                            status === "Draft" ? "bg-amber-50 text-amber-600 border-amber-100" :
                                "bg-slate-100 text-slate-400 border-slate-200"
                    )}>
                        {status}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-4 relative z-10">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600 transition-all">
                    {title}
                </h3>

                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <Clock size={14} />
                    <span>Due {dueDate}</span>
                </div>

                {/* Liquid Progress Bar */}
                <div className="space-y-2 pt-4">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <span>Submission Velocity</span>
                        <span className="text-slate-900">{submitted}/{total}</span>
                    </div>
                    <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-[#4FACFE] to-[#00F2FE] shadow-[0_0_10px_rgba(79,172,254,0.4)] transition-all duration-1000 ease-out"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Hover Action Layer */}
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                <button
                    onClick={handleArchive}
                    className="h-12 w-12 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg hover:bg-[#4FACFE] transition-colors"
                >
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
}
