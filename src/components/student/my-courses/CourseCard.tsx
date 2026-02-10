"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, MoreVertical, Bookmark } from "lucide-react";
import { Course } from "@/lib/store/useCourseStore";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CourseCardProps {
    course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
    const progress = (course.completedModules / course.totalModules) * 100;

    return (
        <Link href={`/student/courses/${course.id}`} className="block h-full">
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="bg-white rounded-[24px] overflow-hidden shadow-[0_20px_40px_-12px_rgba(124,58,237,0.08)] border border-slate-100 group cursor-pointer relative flex flex-col h-full"
            >
                {/* Thumbnail */}
                <div className="h-40 overflow-hidden relative">
                    <motion.img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />

                    {/* Play Overlay (Fade In) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]">
                        <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-violet-600 shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                            <Play size={20} fill="currentColor" />
                        </div>
                    </div>

                    {/* Difficulty Badge */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-700 uppercase shadow-sm">
                        {course.difficulty}
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {course.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="bg-violet-50 text-violet-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h3 className="font-bold text-slate-900 text-lg leading-snug mb-1 line-clamp-2 flex-1">
                        {course.title}
                    </h3>

                    <p className="text-slate-500 text-xs font-medium mb-4 flex items-center justify-between">
                        <span>{course.instructor}</span>
                        <span className="text-violet-600 font-bold">{course.completedModules}/{course.totalModules} Mods</span>
                    </p>

                    {/* Footer Progress */}
                    <div className="mt-auto">
                        <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1.5 uppercase">
                            <span>Progress</span>
                            <span className={cn(progress === 100 ? "text-emerald-500" : "text-violet-500")}>
                                {Math.round(progress)}%
                            </span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden w-full">
                            <motion.div
                                className={cn("h-full rounded-full shadow-sm", progress === 100 ? "bg-emerald-500" : "bg-gradient-to-r from-violet-500 to-indigo-500")}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${progress}%` }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
