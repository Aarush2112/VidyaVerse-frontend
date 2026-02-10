"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { EnrollButton } from "./EnrollButton";

interface FluidCourseCardProps {
    id: string;
    title: string;
    instructor: string;
    progress: number;
    image: string;
    category: string;
    isEnrolled: boolean;
    price: number | null;
}

export function FluidCourseCard({ id, title, instructor, progress, image, category, isEnrolled, price }: FluidCourseCardProps) {
    return (
        <motion.div
            className="group relative bg-white rounded-[32px] overflow-hidden shadow-soft-sm cursor-pointer border border-slate-100 flex flex-col h-full"
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            {/* Image Container */}
            <div className="h-48 overflow-hidden relative shrink-0">
                <motion.img
                    src={image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"}
                    alt={title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

                {/* Category Pill */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-violet-700 uppercase tracking-wider shadow-sm">
                    {category}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 relative flex flex-col flex-1">
                {/* Instructor Avatar - Floating Overlap */}
                <div className="absolute -top-6 right-6 h-12 w-12 rounded-full border-4 border-white overflow-hidden shadow-md">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${instructor}`} alt={instructor} className="w-full h-full bg-slate-100" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight group-hover:text-violet-700 transition-colors line-clamp-2">{title}</h3>
                <p className="text-sm text-slate-500 mb-4">{instructor}</p>

                {/* Spacer to push button to bottom */}
                <div className="flex-1" />

                {isEnrolled ? (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                            <span>{progress}% Complete</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-violet-500 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <EnrollButton courseId={id} isEnrolled={isEnrolled} price={price} />
                    </div>
                ) : (
                    <div className="mt-4">
                        <EnrollButton courseId={id} isEnrolled={isEnrolled} price={price} />
                    </div>
                )}
            </div>
        </motion.div>
    );
}
