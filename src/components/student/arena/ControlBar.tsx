"use client";

import React from "react";
import { Play, ChevronLeft, ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useArenaStore } from "@/lib/store/useArenaStore";
import { runCode } from "@/app/actions/arena";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ControlBarProps {
    problemId: string;
    title: string;
}

export function ControlBar({ problemId, title }: ControlBarProps) {
    const { code, setIsExecuting, setExecutionResult, language, setLanguage } = useArenaStore();

    const handleRun = async () => {
        setIsExecuting(true);
        try {
            const result = await runCode(code, problemId);
            setExecutionResult(result);

            if (result.status === "SUCCESS") {
                toast.success("All Test Cases Passed! +50 XP");
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#22d3ee', '#3b82f6', '#10b981'] // Cyan, Blue, Emerald
                });
            } else {
                toast.error("Some test cases failed.");
            }
        } catch (error) {
            toast.error("Execution failed.");
        } finally {
            setIsExecuting(false);
        }
    };

    return (
        <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-white/50 flex items-center justify-between px-6 z-30 sticky top-0">
            {/* Left: Back */}
            <div className="flex items-center gap-4">
                <Link href="/student/dashboard" className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                    <ChevronLeft size={20} />
                </Link>
                <div className="flex flex-col">
                    <h1 className="font-bold text-slate-800 leading-none">{title}</h1>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Coding Arena</span>
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-200 transition-colors outline-none">
                        <span className="capitalize">{language}</span>
                        <ChevronDown size={14} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem onClick={() => setLanguage('python')}>Python</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLanguage('javascript')}>JavaScript</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <button className="text-slate-500 font-bold text-sm hover:text-slate-800 transition-colors px-4 py-2 rounded-full hover:bg-slate-100">
                    Reset
                </button>

                <button
                    onClick={handleRun}
                    className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 transition-all active:scale-95"
                >
                    <Play size={16} fill="currentColor" /> Run Code
                </button>
            </div>
        </header>
    );
}
