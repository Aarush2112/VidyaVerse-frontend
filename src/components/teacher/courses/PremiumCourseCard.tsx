"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { User, Sparkles } from "lucide-react";
import { LiquidProgressBar } from "@/components/teacher/courses/LiquidProgressBar";

interface PremiumCourseCardProps {
    title: string;
    coverImage: string;
    tags: { label: string; color: "green" | "white" }[];
    progress: number;
    avgGrade: number;
    students: number;
    onClick?: () => void;
}

export function PremiumCourseCard({
    title,
    coverImage,
    tags,
    progress,
    avgGrade,
    students,
    onClick
}: PremiumCourseCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={onClick}
            className="group relative bg-white rounded-[32px] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 cursor-pointer h-full flex flex-col"
        >
            {/* Image Area - Top 50% */}
            <div className="relative h-48 overflow-hidden">
                <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                    src={coverImage}
                    alt={title}
                    className="w-full h-full object-cover"
                />

                {/* Floating Glass Pills */}
                <div className="absolute top-4 left-4 flex gap-2">
                    {tags.map((tag, i) => (
                        <span
                            key={i}
                            className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md shadow-sm border border-white/20",
                                tag.color === "green"
                                    ? "bg-emerald-500/20 text-emerald-100"
                                    : "bg-white/30 text-white"
                            )}
                        >
                            {tag.label}
                        </span>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col justify-between flex-1 gap-6">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 leading-tight mb-4 group-hover:text-[#5B86E5] transition-colors">{title}</h3>
                    <LiquidProgressBar value={progress} label="Syllabus" />
                </div>

                {/* Footer Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-[#FEF9C3] flex items-center justify-center text-[#A16207]">
                            <Sparkles size={14} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase text-slate-400">Avg. Grade</span>
                            <span className="text-sm font-bold text-slate-800">{avgGrade}%</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                            <User size={14} />
                        </div>
                        <span className="text-sm font-bold text-slate-600">{students}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
