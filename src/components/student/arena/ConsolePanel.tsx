"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useArenaStore } from "@/lib/store/useArenaStore";
import { CheckCircle2, XCircle, Terminal, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ConsolePanel() {
    const { executionResult, isExecuting, activeTab, setActiveTab } = useArenaStore();

    if (!executionResult && !isExecuting) return null;

    return (
        <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="h-64 rounded-[24px] bg-white/90 backdrop-blur-xl border border-white/60 shadow-[0_-10px_40px_-5px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col z-20 absolute bottom-0 left-0 right-0 m-6"
        >
            {/* Header / Tabs */}
            <div className="flex items-center gap-4 px-6 py-3 border-b border-white/20 bg-white/40">
                <button
                    onClick={() => setActiveTab('CONSOLE')}
                    className={cn(
                        "text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2",
                        activeTab === 'CONSOLE' ? "text-violet-600" : "text-slate-400 hover:text-slate-600"
                    )}
                >
                    <Terminal size={14} /> Console
                </button>

                {/* Close Button or Minify could go here */}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 font-mono text-sm relative">
                {isExecuting ? (
                    <div className="flex items-center justify-center h-full text-slate-400 gap-2">
                        <Loader2 className="animate-spin text-violet-500" /> Running Tests...
                    </div>
                ) : executionResult ? (
                    <div className="space-y-4">
                        {/* Console Output (Standard Out) */}
                        {executionResult.consoleOutput && (
                            <div className="mb-4 text-slate-600">
                                <strong className="block text-xs uppercase text-slate-400 mb-1">Output:</strong>
                                <pre className="whitespace-pre-wrap">{executionResult.consoleOutput}</pre>
                            </div>
                        )}

                        {/* Test Results */}
                        <div className="space-y-2">
                            {executionResult.results.map((res, i) => (
                                <div key={i} className={cn(
                                    "p-3 rounded-xl border flex items-center justify-between text-xs",
                                    res.passed ? "bg-emerald-50/50 border-emerald-100" : "bg-red-50/50 border-red-100"
                                )}>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 font-bold">
                                            <span className="text-slate-500">Input:</span>
                                            <span className="bg-white/50 px-1 py-0.5 rounded">{res.input}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-slate-500">Expected:</span>
                                            <span className="text-emerald-600 font-mono">{res.expected}</span>
                                        </div>
                                        {!res.passed && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-slate-500">Actual:</span>
                                                <span className="text-red-500 font-mono">{res.actual}</span>
                                            </div>
                                        )}
                                    </div>

                                    {res.passed ? (
                                        <div className="flex items-center gap-1 text-emerald-600 font-bold uppercase">
                                            <CheckCircle2 size={16} /> Passed
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1 text-red-500 font-bold uppercase">
                                            <XCircle size={16} /> Failed
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </motion.div>
    );
}
