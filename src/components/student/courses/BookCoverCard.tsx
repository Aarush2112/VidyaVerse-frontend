"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Play, Star, Clock } from "lucide-react";

interface BookCoverCardProps {
    title: string;
    thumbnail: string;
    rating: string;
    duration: string;
    tags: string[];
    onClick?: () => void;
}

export function BookCoverCard({
    title,
    thumbnail,
    rating,
    duration,
    tags,
    onClick
}: BookCoverCardProps) {
    return (
        <motion.div
            whileHover={{ y: -12, scale: 1.02 }}
            onClick={onClick}
            className="group relative flex-shrink-0 w-[280px] h-[380px] bg-white rounded-[32px] overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] transition-all duration-500 cursor-pointer flex flex-col"
        >
            {/* Image Area - Top 70% */}
            <div className="relative h-[70%] overflow-hidden">
                <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                    src={thumbnail}
                    alt={title}
                    className="w-full h-full object-cover"
                />

                {/* Hover Overlay with Play Button */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        className="h-16 w-16 bg-white/90 rounded-full flex items-center justify-center text-slate-900 shadow-lg"
                    >
                        <Play fill="currentColor" className="ml-1" size={24} />
                    </motion.div>
                </div>

                {/* Tags on Top */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 max-w-[90%]">
                    {tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-800 shadow-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="p-5 flex flex-col justify-between flex-1 relative bg-white">
                <h3 className="text-lg font-bold text-slate-800 line-clamp-2 leading-tight group-hover:text-[#4F46E5] transition-colors">
                    {title}
                </h3>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm">
                        <Star fill="currentColor" size={14} />
                        <span>{rating}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium bg-slate-50 px-2 py-1 rounded-full">
                        <Clock size={12} />
                        <span>{duration}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
