"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, Plus, ThumbsUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CinematicCardProps {
    course: {
        id: string;
        title: string;
        thumbnail: string;
        progress?: number;
        match?: string;
        rating?: string;
        duration?: string;
        tags: string[];
    };
}

export function CinematicCard({ course }: CinematicCardProps) {
    return (
        <motion.div
            layoutId={course.id}
            className="relative flex-none w-72 md:w-80 group cursor-pointer"
            whileHover={{
                scale: 1.1,
                zIndex: 50,
                transition: { delay: 0.5, duration: 0.3 }
            }}
        >
            {/* Idle State: Thumbnail */}
            <div className="relative aspect-video rounded-md overflow-hidden bg-zinc-900 shadow-2xl transition-all group-hover:rounded-b-none group-hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                />

                {/* Title Overlay (Corner) */}
                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[10px] font-black uppercase text-white tracking-widest group-hover:opacity-0 transition-opacity">
                    {course.title}
                </div>

                {/* Progress Bar (if active) */}
                {course.progress !== undefined && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,1)]"
                        />
                    </div>
                )}
            </div>

            {/* Hover Expansion Content */}
            <div className="absolute top-full left-0 right-0 bg-[#141414] rounded-b-md p-4 opacity-0 group-hover:opacity-100 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)] scale-100 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <button className="h-8 w-8 rounded-full bg-white flex items-center justify-center hover:bg-zinc-200 transition-colors">
                            <Play className="h-4 w-4 fill-black text-black ml-0.5" />
                        </button>
                        <button className="h-8 w-8 rounded-full border border-zinc-600 flex items-center justify-center hover:border-white transition-colors">
                            <Plus className="h-4 w-4 text-white" />
                        </button>
                        <button className="h-8 w-8 rounded-full border border-zinc-600 flex items-center justify-center hover:border-white transition-colors">
                            <ThumbsUp className="h-4 w-4 text-white" />
                        </button>
                    </div>
                    <button className="h-8 w-8 rounded-full border border-zinc-600 flex items-center justify-center hover:border-white transition-colors">
                        <ChevronDown className="h-4 w-4 text-white" />
                    </button>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-black">
                        <span className="text-emerald-500">{course.match} Match</span>
                        <span className="border border-zinc-600 px-1.5 py-0.5 rounded text-zinc-400 uppercase tracking-tighter">{course.rating}</span>
                        <span className="text-zinc-400 italic font-mono">{course.duration}</span>
                    </div>

                    <div className="flex items-center flex-wrap gap-1.5">
                        {course.tags.map((tag, i) => (
                            <span key={i} className="text-[10px] text-zinc-500 flex items-center gap-1.5">
                                {tag} {i < course.tags.length - 1 && <span className="h-1 w-1 rounded-full bg-zinc-700" />}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
