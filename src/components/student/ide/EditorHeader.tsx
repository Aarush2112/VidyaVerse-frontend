"use client";

import {
    Play,
    Cloud,
    Settings,
    ChevronRight,
    Clock,
    Languages,
    Timer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EditorHeaderProps {
    onRun: () => void;
    onSubmit: () => void;
    isRunning: boolean;
    isSubmitting: boolean;
}

export function EditorHeader({
    onRun,
    onSubmit,
    isRunning,
    isSubmitting
}: EditorHeaderProps) {
    return (
        <div className="h-full px-4 flex items-center justify-between gap-4 select-none">
            {/* Left: Breadcrumbs & Title */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
                    <span>Problems</span>
                    <ChevronRight className="h-3 w-3" />
                    <span className="text-zinc-300 font-bold">102. Two Sum</span>
                </div>
                <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-bold tracking-tight">
                    Easy
                </Badge>
            </div>

            {/* Center: Language & Timer */}
            <div className="flex items-center gap-6">
                <Select defaultValue="javascript">
                    <SelectTrigger className="h-7 w-32 bg-transparent border-white/5 text-[11px] font-mono text-zinc-300 focus:ring-0">
                        <div className="flex items-center gap-2">
                            <Languages className="h-3 w-3 text-indigo-400" />
                            <SelectValue placeholder="Language" />
                        </div>
                    </SelectTrigger>
                    <SelectContent className="bg-[#0d0d0d] border-white/10 text-zinc-300">
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="python">Python 3</SelectItem>
                        <SelectItem value="cpp">C++ 17</SelectItem>
                        <SelectItem value="java">Java 11</SelectItem>
                    </SelectContent>
                </Select>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <Timer className="h-3.5 w-3.5 text-indigo-400" />
                    <span>00:45:12</span>
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-white/5">
                    <Settings className="h-4 w-4" />
                </Button>

                <div className="h-4 w-px bg-white/10 mx-1" />

                <Button
                    onClick={onRun}
                    disabled={isRunning || isSubmitting}
                    className="h-7 px-3 bg-transparent text-emerald-500 hover:bg-emerald-500/10 border border-emerald-500/30 font-bold text-xs gap-1.5"
                >
                    <Play className={cn("h-3 w-3 fill-emerald-500", isRunning && "animate-pulse")} />
                    {isRunning ? "Running..." : "Run"}
                </Button>

                <Button
                    onClick={onSubmit}
                    disabled={isRunning || isSubmitting}
                    className="h-7 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs gap-1.5 shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                >
                    {isSubmitting ? (
                        <div className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Cloud className="h-3 w-3" />
                    )}
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </div>
    );
}
