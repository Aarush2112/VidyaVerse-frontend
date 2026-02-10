"use client";

import { Star, Clock, User, PlayCircle } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface CinematicCourseCardProps {
    title: string;
    description: string;
    image: string;
    rating: number;
    level: "Beginner" | "Intermediate" | "Advanced";
    duration: string;
    author: string;
    progress?: number;
}

export const CinematicCourseCard = ({
    title, description, image, rating, level, duration, author, progress
}: CinematicCourseCardProps) => {

    // Level Color Logic
    const levelColor =
        level === "Beginner" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" :
            level === "Intermediate" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                "bg-rose-500/20 text-rose-400 border-rose-500/30";

    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="group relative bg-slate-900 border border-white/5 rounded-2xl overflow-hidden shadow-xl"
        >
            {/* Thumbnail (16:9) */}
            <div className="aspect-video relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-800 animate-pulse" /> {/* Skeleton placeholder */}
                <img
                    src={image}
                    alt={title}
                    className="object-cover w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                        <PlayCircle className="w-8 h-8 text-white fill-white/20" />
                    </div>
                </div>

                {/* Progress Bar (if started) */}
                {progress !== undefined && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                        <div className="h-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" style={{ width: `${progress}%` }} />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className={`${levelColor} border text-[10px] font-bold uppercase tracking-wider`}>
                        {level}
                    </Badge>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                        <Star className="h-3 w-3 fill-amber-400" />
                        {rating}
                    </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-cyan-400 transition-colors">
                    {title}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                    {description}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3" /> {duration}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${author}`} alt={author} />
                        </div>
                        {author}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
