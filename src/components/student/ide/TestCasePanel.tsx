"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Terminal, CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface TestCasePanelProps {
    testCases: any[]; // Define structure
    onRun: () => void;
    isRunning: boolean;
}

export const TestCasePanel = ({ testCases = [], onRun, isRunning }: TestCasePanelProps) => {
    const [activeTab, setActiveTab] = useState("cases");
    const [selectedCase, setSelectedCase] = useState(0);

    return (
        <div className="h-full flex flex-col bg-zinc-900 border-t border-zinc-800">
            {/* Tab Header */}
            <div className="flex items-center justify-between px-2 h-9 bg-zinc-950 border-b border-zinc-800">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                    <TabsList className="h-full bg-transparent p-0 gap-4">
                        <TabsTrigger value="cases" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-cyan-400 data-[state=active]:text-cyan-400 px-2 text-xs">
                            <CheckCircle2 className="h-3 w-3 mr-2" /> Test Cases
                        </TabsTrigger>
                        <TabsTrigger value="console" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-cyan-400 data-[state=active]:text-cyan-400 px-2 text-xs">
                            <Terminal className="h-3 w-3 mr-2" /> Console
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Panel Body */}
            <div className="flex-1 p-4 bg-zinc-900/50 overflow-auto font-mono text-sm">
                {activeTab === "cases" && (
                    <div className="flex gap-4 h-full">
                        {/* Case Selector */}
                        <div className="w-32 flex flex-col gap-2 border-r border-zinc-800 pr-4">
                            {[1, 2, 3].map((num, i) => ( // Mock 3 cases
                                <Button
                                    key={i}
                                    variant={selectedCase === i ? "secondary" : "ghost"}
                                    onClick={() => setSelectedCase(i)}
                                    className="justify-start text-xs h-8"
                                >
                                    Case {num}
                                </Button>
                            ))}
                        </div>

                        {/* Case IO Details */}
                        <div className="flex-1 text-slate-300">
                            <div className="mb-4">
                                <p className="text-xs text-slate-500 mb-1">Input</p>
                                <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
                                    nums = [2,7,11,15], target = 9
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Expected Output</p>
                                <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
                                    [0,1]
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "console" && (
                    <div className="text-slate-400">
                        {isRunning ? (
                            <div className="flex items-center gap-2 text-cyan-400">
                                <Loader2 className="h-3 w-3 animate-spin" /> Compiling & Executing...
                            </div>
                        ) : (
                            <>
                                <span className="text-green-500">➜</span> Ready to execute.
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
