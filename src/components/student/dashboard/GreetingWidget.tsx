"use client";

import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Link from "next/link";

interface GreetingWidgetProps {
    name: string;
    pendingTasks: number;
    streak?: number;
    lastLessonId?: string;
    lastLessonTitle?: string;
}

export const GreetingWidget = ({
    name,
    pendingTasks,
    streak = 1,
    lastLessonId,
    lastLessonTitle
}: GreetingWidgetProps) => {
    return (
        <div className="md:col-span-2 relative bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between overflow-hidden group">

            <div className="relative z-10">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Good Morning, {name}! 🚀
                </h1>
                <p className="text-slate-400 text-lg mb-6 max-w-md">
                    You're on a <span className="text-amber-400 font-bold">{streak}-day streak</span>.
                    Keep it up! You have {pendingTasks} tasks pending review.
                </p>

                <Link href={`/student/courses/${lastLessonId || ""}`}>
                    <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all">
                        <Play className="h-5 w-5 mr-2 fill-black" />
                        Resume: {lastLessonTitle || "Coursework"}
                    </Button>
                </Link>
            </div>

            {/* Abstract Background Decoration */}
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tl from-cyan-500/10 to-transparent rounded-full blur-3xl translate-x-12 translate-y-12 group-hover:bg-cyan-500/20 transition-colors duration-700" />
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                <svg viewBox="0 0 200 200" className="w-40 h-40 animate-[spin_60s_linear_infinite] text-cyan-500 fill-current">
                    <path d="M100,0 A100,100 0 0,1 100,200 A100,100 0 0,1 100,0 Z M190,100 A90,90 0 0,0 10,100 A90,90 0 0,0 190,100 Z" fillRule="evenodd" opacity="0.5" />
                </svg>
            </div>
        </div>
    )
}
