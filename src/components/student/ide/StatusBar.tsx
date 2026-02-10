"use client";

import { CheckCircle2, Wifi, Share2, Info } from "lucide-react";

export function StatusBar() {
    return (
        <div className="h-full px-4 flex items-center justify-between text-[10px] font-mono text-zinc-500 select-none bg-indigo-600 text-white font-bold">
            {/* Left: VS Code Status */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 hover:bg-white/10 px-2 h-full cursor-pointer transition-colors">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Wifi className="h-3 w-3" />
                    <span>Cloud Sync Active</span>
                </div>
            </div>

            {/* Right: Info */}
            <div className="flex items-center gap-4 h-full">
                <div className="hover:bg-white/10 px-2 h-full flex items-center cursor-pointer">
                    Ln 14, Col 5
                </div>
                <div className="hover:bg-white/10 px-2 h-full flex items-center cursor-pointer">
                    Spaces: 4
                </div>
                <div className="hover:bg-white/10 px-2 h-full flex items-center cursor-pointer">
                    UTF-8
                </div>
                <div className="hover:bg-white/10 px-2 h-full flex items-center cursor-pointer gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,1)]" />
                    JavaScript
                </div>
            </div>
        </div>
    );
}
