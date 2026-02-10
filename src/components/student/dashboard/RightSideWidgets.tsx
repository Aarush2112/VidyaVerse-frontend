"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Layout, FlaskConical, Globe, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStudentStore } from "@/lib/store/useStudentStore";
import Link from "next/link";

export function RightSideWidgets() {
    const { activeChallenge, sprintTasks, toggleTask, openModal } = useStudentStore();

    const completedTasks = sprintTasks.filter(t => t.isCompleted).length;
    const totalTasks = sprintTasks.length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    const circumference = 2 * Math.PI * 28;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="space-y-8">

            {/* Problem of the Day - Violet Gradient */}
            <div className="bg-gradient-to-br from-[#7C3AED] to-[#C026D3] rounded-[32px] p-6 text-white shadow-lg shadow-purple-500/25 relative overflow-hidden group">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-wider mb-2">
                        <div className="p-1 rounded-full bg-white/20"><Calculator size={12} /></div>
                        Problem of the Day
                    </div>

                    <h3 className="text-2xl font-bold mb-1">Two Sum</h3>
                    <p className="text-white/80 text-sm mb-6">Solve the classic coding interview question now.</p>

                    <Link href="/student/ide">
                        <Button className="w-full bg-white text-violet-700 hover:bg-white/90 font-bold rounded-full h-11 border-none shadow-none">
                            Solve Now
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Top Students / Leaderboard */}
            <div className="bg-white rounded-[32px] p-6 shadow-soft-sm border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-[#111827]">Top Students</h3>
                    <Link href="/student/leaderboard" className="text-xs font-bold text-violet-600 hover:underline">View All</Link>
                </div>

                <div className="space-y-4">
                    {[1, 2, 3].map(rank => (
                        <div key={rank} className="flex items-center gap-3">
                            <div className="font-bold text-slate-400 text-sm">#{rank}</div>
                            <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Student${rank}`} alt="Avatar" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-slate-900">Student {rank}</div>
                                <div className="text-xs text-slate-500">1{4 - rank}00 XP</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* My Courses List */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900">My courses</h3>
                    <Link href="/student/courses" className="text-sm font-medium text-slate-500 hover:text-slate-900 flex items-center">
                        All subjects <ChevronRight size={14} />
                    </Link>
                </div>

                <div className="space-y-4">
                    <Link href="/student/courses">
                        <CourseListItem
                            icon={<Layout size={20} className="text-orange-500" />}
                            iconBg="bg-orange-50"
                            title="Tags in layout"
                            metadata="10 lecture · 5 practical work"
                        />
                    </Link>
                    <Link href="/student/courses">
                        <CourseListItem
                            icon={<FlaskConical size={20} className="text-indigo-500" />}
                            iconBg="bg-indigo-50"
                            title="Chemistry is easy!"
                            metadata="8 lecture · 4 practical work"
                        />
                    </Link>
                    <Link href="/student/courses">
                        <CourseListItem
                            icon={<Globe size={20} className="text-emerald-500" />}
                            iconBg="bg-emerald-50"
                            title="Economic Geography"
                            metadata="8 lecture · 4 practical work"
                        />
                    </Link>
                    <Link href="/student/courses">
                        <CourseListItem
                            icon={<Calculator size={20} className="text-blue-500" />}
                            iconBg="bg-blue-50"
                            title="Maths in simple terms"
                            metadata="24 lecture · 16 practical work"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}

function CourseListItem({ icon, iconBg, title, metadata }: any) {
    return (
        <div className="flex items-center gap-4 group cursor-pointer p-2 rounded-2xl hover:bg-white hover:shadow-sm transition-all mb-2">
            <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center shrink-0", iconBg)}>
                {icon}
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-slate-900 text-sm">{title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{metadata}</p>
            </div>
            <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
        </div>
    );
}
