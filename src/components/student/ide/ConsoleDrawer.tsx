"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
    CheckCircle2,
    AlertCircle,
    Terminal as TerminalIcon,
    Play
} from "lucide-react";

interface ConsoleDrawerProps {
    activeTab: "test-cases" | "console";
    setActiveTab: (tab: "test-cases" | "console") => void;
    testResults: any[];
    output: string[];
}

export function ConsoleDrawer({ activeTab, setActiveTab, testResults, output }: ConsoleDrawerProps) {
    return (
        <div className="h-full flex flex-col bg-neu-base text-slate-600 font-mono">
            {/* Header Tabs */}
            <div className="flex items-center px-6 pt-4 gap-6 shrink-0">
                {[
                    { id: "test-cases", label: "Test Cases" },
                    { id: "console", label: "Console Output" }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                            "text-[11px] font-bold uppercase tracking-widest transition-all pb-2 relative",
                            activeTab === tab.id
                                ? "text-neu-text-main"
                                : "text-neu-text-sub hover:text-neu-text-main"
                        )}
                    >
                        <span className="opacity-50 mr-1">[</span>
                        {tab.label}
                        <span className="opacity-50 ml-1">]</span>

                        {/* Active Indicator */}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neu-accent shadow-[0_0_8px_rgba(124,58,237,0.5)] rounded-full" />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area - Recessed */}
            <div className="flex-1 overflow-hidden p-6 pt-2">
                <div className="h-full w-full rounded-[1.5rem] border-2 border-neu-shadow-convex-light/10 shadow-neu-concave-sm bg-neu-base overflow-y-auto p-5 text-[11px] leading-relaxed no-scrollbar relative">
                    {activeTab === "test-cases" ? (
                        <div className="space-y-4">
                            {testResults.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3 opacity-60">
                                    <Play size={24} />
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-black">Ready to Execute</span>
                                </div>
                            ) : (
                                testResults.map((result, idx) => (
                                    <div
                                        key={idx}
                                        className={cn(
                                            "p-4 rounded-2xl border transition-all duration-300",
                                            result.passed
                                                ? "bg-emerald-50 border-emerald-100/50"
                                                : "bg-rose-50 border-rose-100/50"
                                        )}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className={cn(
                                                    "p-1 rounded-full shadow-sm",
                                                    result.passed ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                                                )}>
                                                    {result.passed ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                                                </div>
                                                <span className="font-black uppercase tracking-widest text-[9px] text-slate-500">Test {idx + 1}</span>
                                            </div>
                                            <div className={cn(
                                                "text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest",
                                                result.passed ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                                            )}>
                                                {result.passed ? "Pass" : "Fail"}
                                            </div>
                                        </div>

                                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                                            <div className="space-y-1">
                                                <span className="text-[9px] uppercase font-bold text-slate-400 block px-1">Input</span>
                                                <code className="block p-2.5 rounded-xl bg-white shadow-sm text-slate-600 border border-slate-100 font-medium">
                                                    {JSON.stringify(result.input)}
                                                </code>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[9px] uppercase font-bold text-slate-400 block px-1">Expected</span>
                                                <code className="block p-2.5 rounded-xl bg-white shadow-sm text-emerald-600 border border-slate-100 font-medium">
                                                    {JSON.stringify(result.expected)}
                                                </code>
                                            </div>
                                            {!result.passed && (
                                                <div className="sm:col-span-2 space-y-1 mt-1">
                                                    <span className="text-[9px] uppercase font-bold text-rose-400 block px-1 text-center">Actual Output</span>
                                                    <code className="block p-3 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 text-center font-bold shadow-sm">
                                                        {JSON.stringify(result.actual)}
                                                    </code>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    ) : (
                        <div className="space-y-1.5 font-medium">
                            {output.length === 0 ? (
                                <div className="flex items-center justify-center h-40 gap-2 text-slate-400/60 italic">
                                    <TerminalIcon size={16} />
                                    Awaiting output...
                                </div>
                            ) : (
                                output.map((line, idx) => (
                                    <div key={idx} className="flex gap-4 p-1 px-2 rounded-lg hover:bg-slate-100/50 transition-colors">
                                        <span className="text-slate-300 shrink-0 font-bold select-none w-6 text-right">{idx + 1}</span>
                                        <span className={cn(
                                            line.startsWith("Error") || line.startsWith("✘") ? "text-rose-500 font-bold" :
                                                line.startsWith("✔") ? "text-emerald-600 font-bold" :
                                                    line.startsWith("System") ? "text-violet-500 font-bold" :
                                                        "text-slate-600"
                                        )}>
                                            {line}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Legend/Status - Minimalist */}
            <div className="h-8 shrink-0 px-6 flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-slate-400 opacity-60">
                <div className="flex gap-4">
                    <span className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-sm" /> Ready</span>
                </div>
                <span>Output Stream</span>
            </div>
        </div>
    );
}
