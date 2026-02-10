"use client";

import React from "react";
import { CheckCircle, AlertTriangle, Monitor, Mic, Eye, MousePointer, Clock, Calendar, Download, Trash2, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ViolationStats {
    noise: number;
    tabSwitch: number;
    fullscreen: number;
    noFace: number; // Mocked
    multipleFaces: number; // Mocked
}

interface ProctoringReportProps {
    score: number;
    stats: ViolationStats;
    startTime: Date;
    endTime: Date;
}

export function ProctoringReport({ score, stats, startTime, endTime }: ProctoringReportProps) {
    // Determine Score Color
    const scoreColor = score >= 80 ? "text-emerald-500" : score >= 60 ? "text-amber-500" : "text-red-500";
    const ringColor = score >= 80 ? "stroke-emerald-500" : score >= 60 ? "stroke-amber-500" : "stroke-red-500";
    const bgRing = score >= 80 ? "stroke-emerald-100" : score >= 60 ? "stroke-amber-100" : "stroke-red-100";

    // Mock Events Log based on stats
    const events = [
        ...Array(stats.noise).fill({ type: "Noise Detected", time: "06:41:42 PM", icon: Mic, color: "text-blue-500", bg: "bg-blue-50" }),
        ...Array(stats.tabSwitch).fill({ type: "Tab Switched", time: "06:30:15 PM", icon: MousePointer, color: "text-amber-500", bg: "bg-amber-50" }),
        ...Array(stats.fullscreen).fill({ type: "Exited Fullscreen", time: "06:25:22 PM", icon: Monitor, color: "text-red-500", bg: "bg-red-50" }),
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8">

                    {/* User Info */}
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl font-bold text-slate-900">POORAK PANDEY</h1>
                        <p className="text-slate-500">poorak@university.edu</p>
                    </div>

                    {/* Circular Trust Score */}
                    <div className="relative h-40 w-40 flex items-center justify-center">
                        <svg className="h-full w-full transform -rotate-90">
                            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className={cn(bgRing)} />
                            <circle
                                cx="80" cy="80" r="70"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                strokeDasharray={440}
                                strokeDashoffset={440 - (440 * score) / 100}
                                strokeLinecap="round"
                                className={cn(ringColor, "transition-all duration-1000 ease-out")}
                            />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className={cn("text-4xl font-bold", scoreColor)}>{score}%</span>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Trust Score</span>
                        </div>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-sm">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider">
                                <Clock size={14} /> Started
                            </div>
                            <div className="font-semibold text-slate-700">{startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider">
                                <Eye size={14} /> Tracking
                            </div>
                            <div className="flex gap-2 text-slate-600">
                                <Monitor size={16} /> <Mic size={16} /> <Eye size={16} />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider">
                                <Calendar size={14} /> Submitted
                            </div>
                            <div className="font-semibold text-slate-700">{endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider">
                                <Monitor size={14} /> Device
                            </div>
                            <div className="font-semibold text-slate-700">Mac / Chrome</div>
                        </div>
                    </div>
                </div>

                {/* Violation Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <StatCard label="Noise Detected" count={stats.noise} icon={Mic} color="text-blue-500" bg="bg-blue-50" />
                    <StatCard label="Tab Switched" count={stats.tabSwitch} icon={MousePointer} color="text-emerald-500" bg="bg-emerald-50" />
                    <StatCard label="No Face Detected" count={stats.noFace} icon={Eye} color="text-rose-500" bg="bg-rose-50" />
                    <StatCard label="Exited Fullscreen" count={stats.fullscreen} icon={Monitor} color="text-amber-500" bg="bg-amber-50" />
                    <StatCard label="Multiple Faces" count={stats.multipleFaces} icon={AlertTriangle} color="text-orange-500" bg="bg-orange-50" />
                </div>

                {/* Evidence Log */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <h3 className="font-bold text-slate-700">Proctoring Summary</h3>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-8 gap-2 text-slate-600">
                                <Download size={14} /> Report
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 gap-2 text-rose-600 border-rose-100 hover:bg-rose-50">
                                <Trash2 size={14} /> Evidence
                            </Button>
                        </div>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {events.length === 0 ? (
                            <div className="p-12 text-center text-slate-400">
                                <CheckCircle className="mx-auto h-12 w-12 text-emerald-200 mb-4" />
                                <p>Clean Session. No violations detected.</p>
                            </div>
                        ) : (
                            events.map((event, i) => (
                                <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className={cn("h-10 w-10 rounded-full flex items-center justify-center", event.bg, event.color)}>
                                            <event.icon size={20} />
                                        </div>
                                        <div className="font-medium text-slate-700">{event.type}</div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="font-mono text-sm text-slate-500">{event.time}</div>

                                        {/* Mock Evidence Player */}
                                        {event.type.includes("Noise") ? (
                                            <div className="hidden group-hover:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
                                                <Button size="icon" variant="ghost" className="h-6 w-6 rounded-full bg-white shadow-sm"><Play size={10} fill="currentColor" /></Button>
                                                <div className="h-1 w-16 bg-slate-300 rounded-full overflow-hidden">
                                                    <div className="h-full w-1/3 bg-blue-500" />
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-500">0:14</span>
                                            </div>
                                        ) : (
                                            <div className="hidden group-hover:block h-12 w-20 bg-slate-200 rounded-lg overflow-hidden border border-slate-300 relative">
                                                <div className="absolute inset-0 flex items-center justify-center text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                                                    Evidence
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, count, icon: Icon, color, bg }: any) {
    return (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-3 py-6 hover:shadow-md transition-shadow">
            <div className={cn("h-10 w-10 rounded-full flex items-center justify-center mb-1", bg, color)}>
                <Icon size={20} />
            </div>
            <div className="text-center">
                <div className="text-3xl font-bold text-slate-800 mb-1">{count}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</div>
            </div>
        </div>
    );
}
