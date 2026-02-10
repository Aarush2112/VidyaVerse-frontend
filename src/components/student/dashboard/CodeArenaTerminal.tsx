"use client";

import { useEffect, useState } from "react";
import { HolographicCard } from "./HolographicCard";
import { Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";

export const CodeArenaTerminal = () => {
    const [lines, setLines] = useState<string[]>([]);
    const codeSnippet = [
        "> INITIALIZING IDE...",
        "> CONNECTING TO PISTON...",
        "> READY. AWAITING INPUT_"
    ];

    useEffect(() => {
        let lineIndex = 0;
        const interval = setInterval(() => {
            if (lineIndex < codeSnippet.length) {
                setLines(prev => [...prev, codeSnippet[lineIndex]]);
                lineIndex++;
            } else {
                clearInterval(interval);
            }
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <Link href="/student/ide" className="h-full block">
            <HolographicCard className="h-full p-0 flex flex-col group cursor-pointer" glowColor="#10b981">
                {/* Window Bar */}
                <div className="h-8 bg-black/40 border-b border-white/10 flex items-center px-3 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    <span className="ml-2 text-[10px] font-mono text-slate-500 flex items-center">
                        <Terminal className="h-3 w-3 mr-1" /> terminal.exe
                    </span>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 font-mono text-xs text-emerald-400 bg-black/20 overflow-hidden relative">
                    {lines.map((line, i) => (
                        <div key={i} className="mb-1">{line}</div>
                    ))}

                    {/* Call to Action Overlay on Hover */}
                    <div className="absolute inset-0 bg-emerald-900/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="flex items-center gap-2 text-white font-bold tracking-widest text-lg">
                            ENTER ARENA <ArrowRight className="h-5 w-5" />
                        </div>
                    </div>
                </div>
            </HolographicCard>
        </Link>
    )
}
