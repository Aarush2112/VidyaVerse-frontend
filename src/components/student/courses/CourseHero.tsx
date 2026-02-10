"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CourseHero = () => {
    return (
        <div className="relative h-[400px] w-full rounded-3xl overflow-hidden mb-12 group">
            {/* Cinematic Background */}
            <div className="absolute inset-0 bg-slate-900">
                {/* Imagine a high-res abstract coding wallpaper here */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent" />
            </div>

            {/* Content Content - Bottom Left */}
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3 lg:w-1/2 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                        Continue Watching
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-xl">
                        Advanced React Patterns & Performance
                    </h1>
                    <p className="text-slate-300 text-lg mb-8 line-clamp-2">
                        Master render optimization, suspense, and server components. Build a production-grade LMS from scratch.
                    </p>

                    <div className="flex items-center gap-4">
                        <Button size="lg" className="h-12 px-8 bg-white text-black hover:bg-slate-200 font-bold text-base rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all transform hover:scale-105">
                            <Play className="h-5 w-5 mr-2 fill-black" /> Resume Learning
                        </Button>
                        <Button variant="outline" size="lg" className="h-12 px-8 rounded-full border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
                            More Info
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* Progress Bar over the hero */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
                <div className="h-full bg-cyan-500 w-[65%] shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            </div>
        </div>
    )
}
