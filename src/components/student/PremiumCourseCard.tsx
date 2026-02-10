"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Play, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface CourseProps {
    id: string;
    title: string;
    instructor: string;
    thumbnail?: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    rating: number;
    students: number;
    duration: string;
    progress?: number; // 0 to 100
}

export const PremiumCourseCard = ({
    title,
    instructor,
    thumbnail,
    level,
    rating,
    students,
    duration,
    progress = 0
}: CourseProps) => {

    // Generate geometric pattern if no thumbnail
    const fallbackGradient = "bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900";

    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="group relative bg-slate-950 border border-slate-800 rounded-xl overflow-hidden hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-300 flex flex-col h-full"
        >
            {/* Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden">
                {thumbnail ? (
                    <Image
                        src={thumbnail}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className={`w-full h-full ${fallbackGradient} relative flex items-center justify-center`}>
                        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                        <Play className="h-12 w-12 text-white/20 group-hover:text-cyan-400 group-hover:scale-125 transition-all duration-300" />
                    </div>
                )}

                {/* Overlay Badge */}
                <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className={`
                        ${level === "Beginner" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : ""}
                        ${level === "Intermediate" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" : ""}
                        ${level === "Advanced" ? "bg-red-500/10 text-red-400 border-red-500/20" : ""}
                        backdrop-blur-md border shadow-sm
                    `}>
                        {level}
                    </Badge>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-white font-bold mb-1 line-clamp-2 min-h-[48px] group-hover:text-cyan-400 transition-colors">
                    {title}
                </h3>
                <p className="text-slate-400 text-xs mb-3">By <span className="text-slate-300">{instructor}</span></p>

                {/* Metadata Row */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {duration}
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-3 w-3 fill-yellow-500" /> {rating} <span className="text-slate-600">({students})</span>
                    </div>
                </div>

                {/* Footer Section (Auto-margin top to stick to bottom) */}
                <div className="mt-auto pt-4 border-t border-slate-900">
                    {progress > 0 ? (
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] text-cyan-400 font-medium">
                                <span>IN PROGRESS</span>
                                <span>{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-1 bg-slate-800" indicatorClassName="bg-cyan-400" />
                            <Button className="w-full h-8 text-xs mt-2 bg-slate-900 border border-cyan-900/50 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300">
                                Continue
                            </Button>
                        </div>
                    ) : (
                        <Button className="w-full h-9 bg-white text-black hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all font-semibold">
                            Enroll Now
                        </Button>
                    )}
                </div>
            </div>

            {/* Hover Glow Effect Border */}
            <div className="absolute inset-0 border-2 border-cyan-500/0 rounded-xl group-hover:border-cyan-500/50 transition-all pointer-events-none" />
        </motion.div>
    )
}
