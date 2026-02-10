"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonNavigationProps {
    courseId: string;
    prevLessonId?: string;
    nextLessonId?: string;
    isCompleted?: boolean;
}

export function LessonNavigation({
    courseId,
    prevLessonId,
    nextLessonId,
    isCompleted
}: LessonNavigationProps) {
    return (
        <div className="flex items-center justify-between gap-4 py-6">
            {/* Previous Button */}
            <div className="flex-1">
                {prevLessonId ? (
                    <Link href={`/student/courses/${courseId}/lessons/${prevLessonId}`}>
                        <button className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-violet-200 hover:bg-violet-50/50 transition-all w-full md:w-auto">
                            <div className="p-2 rounded-xl bg-slate-100 group-hover:bg-white group-hover:text-violet-600 transition-colors text-slate-500">
                                <ArrowLeft className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Previous</span>
                                <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">Lesson</span>
                            </div>
                        </button>
                    </Link>
                ) : (
                    <div className="w-full md:w-auto px-6 py-4 opacity-0 pointer-events-none">
                        {/* Spacer to keep layout balanced if needed, or just hidden */}
                    </div>
                )}
            </div>

            {/* Next Button */}
            <div className="flex-1 flex justify-end">
                {nextLessonId ? (
                    <Link href={`/student/courses/${courseId}/lessons/${nextLessonId}`}>
                        <button className={cn(
                            "group flex items-center gap-3 px-8 py-4 rounded-2xl shadow-lg transition-all w-full md:w-auto justify-between md:justify-start",
                            isCompleted
                                ? "bg-gradient-to-r from-emerald-500 to-teal-400 hover:shadow-emerald-500/25 hover:scale-105"
                                : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:shadow-violet-600/25 hover:scale-105"
                        )}>
                            <div className="flex flex-col items-start px-2">
                                <span className="text-xs font-bold text-white/70 uppercase tracking-wider">
                                    {isCompleted ? "Completed" : "Next Up"}
                                </span>
                                <span className="text-base font-bold text-white">
                                    Continue
                                </span>
                            </div>
                            <div className="p-2 rounded-xl bg-white/20 text-white group-hover:bg-white group-hover:text-violet-600 transition-colors">
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </button>
                    </Link>
                ) : (
                    <button disabled className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-bold">Course Completed</span>
                    </button>
                )}
            </div>
        </div>
    );
}
