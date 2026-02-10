"use client";

import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, UploadCloud, Terminal, Code2, Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface CodingConfigPanelProps {
    description: string;
    setDescription: (val: string) => void;
}

export function CodingConfigPanel({ description, setDescription }: CodingConfigPanelProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="space-y-8"
        >
            {/* Problem Statement */}
            <div className="space-y-3">
                <Label className="text-base font-bold text-slate-700">Problem Statement</Label>
                <div className="border border-slate-200 rounded-2xl p-1 bg-white focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                    {/* Mock Toolbar */}
                    <div className="flex gap-2 p-2 border-b border-slate-100 mb-2">
                        <div className="h-8 w-8 rounded hover:bg-slate-100 flex items-center justify-center font-bold text-slate-600 cursor-pointer">B</div>
                        <div className="h-8 w-8 rounded hover:bg-slate-100 flex items-center justify-center italic text-slate-600 cursor-pointer">I</div>
                        <div className="h-8 w-8 rounded hover:bg-slate-100 flex items-center justify-center font-mono text-xs text-slate-600 cursor-pointer">{"<>"}</div>
                    </div>
                    <Textarea
                        placeholder="Describe the algorithm challenge here..."
                        className="min-h-[200px] border-none shadow-none resize-none focus-visible:ring-0 text-slate-600"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>

            {/* Environment Config */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <Label className="text-base font-bold text-slate-700">Allowed Languages</Label>
                    <div className="flex flex-wrap gap-2">
                        {["Python 3.10", "Node.js 18", "C++ 20", "Java 17", "Go 1.20"].map((lang) => (
                            <Badge
                                key={lang}
                                variant="outline"
                                className="px-3 py-1.5 rounded-lg border-slate-200 bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 cursor-pointer transition-colors"
                            >
                                {lang}
                            </Badge>
                        ))}
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full border border-dashed border-slate-300 hover:border-blue-400">
                            <Plus size={14} className="text-slate-400" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <Label className="text-base font-bold text-slate-700">Time Limit (ms)</Label>
                        <div className="relative">
                            <Input defaultValue="2000" className="pl-9 font-mono bg-white border-slate-200" />
                            <ClockIcon />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <Label className="text-base font-bold text-slate-700">Memory (MB)</Label>
                        <div className="relative">
                            <Input defaultValue="256" className="pl-9 font-mono bg-white border-slate-200" />
                            <RamIcon />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <Label className="text-base font-bold text-slate-700">Time Complexity</Label>
                        <select className="w-full h-10 bg-white border border-slate-200 rounded-md px-3 text-sm text-slate-600 font-mono">
                            <option>O(1)</option>
                            <option>O(log n)</option>
                            <option>O(n)</option>
                            <option>O(n log n)</option>
                            <option>O(n²)</option>
                        </select>
                    </div>
                    <div className="space-y-3">
                        <Label className="text-base font-bold text-slate-700">Libraries</Label>
                        <select className="w-full h-10 bg-white border border-slate-200 rounded-md px-3 text-sm text-slate-600 font-mono">
                            <option>Standard Only</option>
                            <option>SciPy / NumPy</option>
                            <option>Custom Allowlist</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Test Cases */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="text-base font-bold text-slate-700">Test Cases</Label>
                    <Button variant="outline" size="sm" className="h-8 gap-2 text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                        <UploadCloud size={14} /> Import .zip
                    </Button>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Badge className="bg-emerald-500/10 text-emerald-600 border-none">Case #1</Badge>
                            <span className="text-xs text-slate-400 font-mono">Public</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-slate-400 hover:text-red-500">
                            <X size={14} />
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Input</span>
                            <div className="bg-white border border-slate-200 rounded-lg p-3 font-mono text-sm text-slate-700">
                                nums = [2, 7, 11, 15] <br /> target = 9
                            </div>
                        </div>
                        <div className="space-y-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Expected Output</span>
                            <div className="bg-white border border-slate-200 rounded-lg p-3 font-mono text-sm text-slate-700">
                                [0, 1]
                            </div>
                        </div>
                    </div>
                </div>

                <Button variant="outline" className="w-full border-dashed border-slate-300 text-slate-500 hover:border-slate-400 hover:text-slate-600">
                    <Plus size={16} className="mr-2" /> Add Test Case
                </Button>
            </div>

            {/* Starter Code */}
            <div className="space-y-3">
                <Label className="text-base font-bold text-slate-700">Boilerplate Code</Label>
                <div className="h-[200px] w-full bg-[#1e1e1e] rounded-xl overflow-hidden border border-slate-300 shadow-sm relative group">
                    <div className="absolute top-3 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="text-[10px] text-white/50 bg-white/10 px-2 py-1 rounded">Read-only preview</div>
                    </div>
                    {/* Mock Editor Look */}
                    <div className="p-4 font-mono text-sm text-blue-300">
                        <span className="text-purple-400">class</span> <span className="text-yellow-300">Solution</span> {"{"} <br />
                        &nbsp;&nbsp;<span className="text-purple-400">def</span> <span className="text-blue-300">twoSum</span>(self, nums: List[int], target: int) -{">"} List[int]: <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-600 text-xs italic"># Write your code here</span> <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">pass</span> <br />
                        {"}"}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-2.5 h-4 w-4 text-slate-400">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const RamIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-2.5 h-4 w-4 text-slate-400">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
);
