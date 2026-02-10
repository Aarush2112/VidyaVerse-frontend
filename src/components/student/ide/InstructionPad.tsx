"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { Target, Brain, Info } from "lucide-react";

interface InstructionPadProps {
    title: string;
    description: string;
    difficulty: string;
}

export function InstructionPad({ title, description, difficulty }: InstructionPadProps) {
    return (
        <div className="p-8 space-y-8">
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600/80 mb-2">
                    <div className="p-1 rounded-md bg-violet-100/50">
                        <Brain size={12} />
                    </div>
                    AI Generated Challenge
                </div>
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">{title}</h1>
                <div className="flex items-center gap-3 pt-2">
                    <div className="px-3 py-1 rounded-lg bg-orange-50 border border-orange-100 text-orange-600 text-[9px] font-black uppercase tracking-widest shadow-sm">
                        {difficulty} LEVEL
                    </div>
                    <div className="h-4 w-[1px] bg-slate-100" />
                    <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(124,58,237,0.4)] animate-pulse" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            50 XP REWARD
                        </span>
                    </div>
                </div>
            </div>

            <div className="h-[1px] w-full bg-slate-100" />

            <div className="prose prose-slate prose-sm max-w-none prose-headings:text-slate-800 prose-p:text-slate-600 prose-code:text-violet-600 prose-code:bg-violet-50 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
                <ReactMarkdown>{description}</ReactMarkdown>
            </div>

            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100/50 flex gap-3 text-amber-900/70">
                <Info size={18} className="shrink-0 mt-0.5 text-amber-500" />
                <div className="text-[11px] leading-relaxed font-medium">
                    Ensure your function returns the correct output type. Use the console to verify outputs before submitting.
                </div>
            </div>
        </div>
    );
}
