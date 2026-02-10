"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Folder, Clock, CheckCircle } from "lucide-react";

interface InsightWidgetProps {
    type: "active" | "grading" | "score";
    value: string;
    label: string;
    trend?: string;
}

export function InsightWidget({ type, value, label, trend }: InsightWidgetProps) {
    const configs = {
        active: {
            icon: Folder,
            iconBg: "bg-blue-100 text-blue-600",
            accent: "text-blue-600",
            Emoji: "📂"
        },
        grading: {
            icon: Clock,
            iconBg: "bg-orange-100 text-orange-600",
            accent: "text-orange-500",
            Emoji: "⏳"
        },
        score: {
            icon: CheckCircle,
            iconBg: "bg-emerald-100 text-emerald-600",
            accent: "text-emerald-600",
            Emoji: "🎯"
        }
    };

    const config = configs[type];

    return (
        <div className="relative group bg-white p-6 rounded-[32px] border border-slate-100 soft-shadow-md hover:soft-shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex justify-between items-start">
                <div className="space-y-4">
                    <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center text-xl shadow-sm", config.iconBg)}>
                        {/* 3D-ish Icon Replacement using Emoji for visual pop */}
                        <span className="text-2xl drop-shadow-sm filter">{config.Emoji}</span>
                    </div>
                    <div>
                        <div className="text-4xl font-black text-slate-900 tracking-tight">{value}</div>
                        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">{label}</div>
                    </div>
                </div>

                {/* Circular Progress or Trend Widget */}
                {type === "score" ? (
                    <div className="relative h-16 w-16">
                        <svg className="h-full w-full rotate-[-90deg]" viewBox="0 0 36 36">
                            <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#F1F5F9"
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                            <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#10B981"
                                strokeWidth="4"
                                strokeDasharray="88, 100" // Mock 88%
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-emerald-600">
                            88%
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-end">
                        {trend && (
                            <span className={cn("px-2 py-1 rounded-full text-[10px] font-bold bg-slate-50 border border-slate-100", config.accent)}>
                                {trend}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
