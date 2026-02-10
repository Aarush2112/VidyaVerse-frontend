"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Terminal,
    CheckCircle2,
    XCircle,
    Play,
    ChevronRight,
    CornerDownRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TestCaseRunner() {
    const [selectedCase, setSelectedCase] = useState(1);

    return (
        <div className="h-full flex flex-col bg-[#0d0d0d]">
            <Tabs defaultValue="testcases" className="w-full h-full flex flex-col">
                <div className="px-4 h-9 flex items-center justify-between border-b border-white/5 bg-[#09090b]">
                    <TabsList className="bg-transparent h-full p-0 gap-4">
                        <TabsTrigger
                            value="testcases"
                            className="h-full data-[state=active]:bg-transparent data-[state=active]:text-emerald-500 data-[state=active]:shadow-none text-zinc-500 text-[10px] font-black uppercase tracking-widest gap-2 p-0 border-b-2 border-transparent data-[state=active]:border-emerald-500 rounded-none transition-none"
                        >
                            <Terminal className="h-3 w-3" /> Test Cases
                        </TabsTrigger>
                        <TabsTrigger
                            value="console"
                            className="h-full data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none text-zinc-500 text-[10px] font-black uppercase tracking-widest gap-2 p-0 border-b-2 border-transparent data-[state=active]:border-indigo-500 rounded-none transition-none"
                        >
                            Console Output
                        </TabsTrigger>
                    </TabsList>
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto p-4">
                    <TabsContent value="testcases" className="m-0 space-y-4">
                        {/* Case Selector */}
                        <div className="flex items-center gap-2">
                            {[1, 2, 3].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setSelectedCase(num)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all flex items-center gap-2",
                                        selectedCase === num
                                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                                            : "bg-white/5 border-white/5 text-zinc-500 hover:bg-white/10"
                                    )}
                                >
                                    {num === 1 ? <CheckCircle2 className="h-3 w-3" /> : (num === 2 ? <XCircle className="h-3 w-3 text-rose-500" /> : <div className="h-3 w-3 rounded-full border border-zinc-500" />)}
                                    Case {num}
                                </button>
                            ))}
                        </div>

                        {/* Case Details */}
                        <div className="space-y-4 animate-in fade-in duration-300">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Input</label>
                                <div className="p-3 bg-[#141414] border border-white/5 rounded-lg font-mono text-xs text-zinc-300">
                                    nums = [2,7,11,15], target = 9
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Expected</label>
                                    <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg font-mono text-xs text-emerald-400">
                                        [0,1]
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 text-rose-500">Yours</label>
                                    <div className={cn(
                                        "p-3 rounded-lg font-mono text-xs",
                                        selectedCase === 2 ? "bg-rose-500/5 border border-rose-500/10 text-rose-400" : "bg-white/5 border border-white/5 text-zinc-300"
                                    )}>
                                        {selectedCase === 2 ? "[0,0]" : "[0,1]"}
                                    </div>
                                </div>
                            </div>

                            {selectedCase === 2 && (
                                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-center gap-3">
                                    <XCircle className="h-4 w-4 text-rose-500 flex-shrink-0" />
                                    <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Wrong Answer: Incorrect indices returned for target 9.</p>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="console" className="m-0">
                        <div className="font-mono text-[11px] leading-relaxed">
                            <div className="flex items-center gap-2 text-zinc-500 mb-1">
                                <ChevronRight className="h-3 w-3" />
                                <span>Starting execution node v18.16.0...</span>
                            </div>
                            <div className="flex items-center gap-4 py-1">
                                <span className="text-zinc-600 shrink-0">14:02:11</span>
                                <span className="text-zinc-300">Synchronizing Judge0 cluster... OK</span>
                            </div>
                            <div className="flex items-center gap-4 py-1">
                                <span className="text-zinc-600 shrink-0">14:02:12</span>
                                <span className="text-emerald-500 font-bold">STDOUT:</span>
                                <span className="text-zinc-400">Processing input nums=[2,7,11,15] limit=104</span>
                            </div>
                            <motion.div
                                animate={{ opacity: [1, 0] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="h-4 w-1.5 bg-indigo-500 ml-16 mt-1"
                            />
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
