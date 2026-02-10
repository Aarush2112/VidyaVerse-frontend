"use client";

import { motion } from "framer-motion";
import { Play, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

export const ResumeLearningHero = () => {
    return (
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-12 group">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000"
                    alt="Latest Course"
                    fill
                    className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 h-full flex flex-col justify-center max-w-2xl px-8 md:px-12 space-y-6">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                            Resume Learning
                        </span>
                        <span className="text-slate-400 text-xs flex items-center gap-1">
                            <Clock className="h-3 w-3" /> Last accessed 2 hours ago
                        </span>
                    </div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-white leading-tight mb-2"
                    >
                        Advanced React Design Patterns
                    </motion.h1>
                    <p className="text-slate-300 text-lg max-w-xl">
                        Master enterprise-level component composition and complex state management techniques.
                    </p>
                </div>

                {/* Progress & Action */}
                <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm font-medium">
                        <span className="text-cyan-400">Lesson 5 of 12</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-300">Compound Components</span>
                    </div>

                    <div className="flex items-center gap-4 max-w-md">
                        <div className="flex-1">
                            <Progress value={45} className="h-2 bg-white/10" indicatorClassName="bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                        </div>
                        <span className="text-white font-mono text-sm">45%</span>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Button size="lg" className="h-12 bg-cyan-500 text-black hover:bg-cyan-400 font-bold text-base px-8 shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all">
                            <Play className="h-5 w-5 mr-2 fill-black" /> Resume Lesson
                        </Button>
                        <Button size="lg" variant="outline" className="h-12 border-slate-700 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-md">
                            <TrendingUp className="h-5 w-5 mr-2" /> View Syllabus
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
