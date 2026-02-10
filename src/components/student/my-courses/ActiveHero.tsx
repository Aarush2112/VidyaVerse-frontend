"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Course } from "@/lib/store/useCourseStore";
import Link from "next/link";

interface ActiveHeroProps {
    activeCourse: Course;
}

export function ActiveHero({ activeCourse }: ActiveHeroProps) {
    if (!activeCourse) return null;

    const progress = (activeCourse.completedModules / activeCourse.totalModules) * 100;

    return (
        <motion.div
            className="w-full relative h-[300px] md:h-64 rounded-[32px] overflow-hidden shadow-2xl shadow-violet-500/20 cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            whileHover={{ scale: 1.01 }}
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600" />

            {/* Decorative Parallax Background */}
            <motion.div
                className="absolute right-0 top-0 w-1/2 h-full hidden md:flex items-center justify-center opacity-30"
                style={{ perspective: 1000 }}
            >
                {/* Simulated Code Block illustration */}
                <motion.div
                    className="w-64 h-48 bg-black rounded-lg p-4 font-mono text-[10px] text-green-400 leading-relaxed shadow-xl rotate-y-12 rotate-z-6"
                    initial={{ rotateY: -10, rotateZ: 3 }}
                    whileHover={{ rotateY: -5, rotateZ: 6, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                    <span className="text-purple-400">import</span> React <span className="text-purple-400">from</span> <span className="text-yellow-300">'react'</span>;<br /><br />
                    <span className="text-blue-400">function</span> <span className="text-yellow-300">App</span>() {'{'}<br />
                    &nbsp;&nbsp;<span className="text-purple-400">const</span> [data, setData] = useState(<span className="text-blue-400">null</span>);<br />
                    &nbsp;&nbsp;<span className="text-purple-400">return</span> (<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-red-400">div</span>&gt;Hello World&lt;/<span className="text-red-400">div</span>&gt;<br />
                    &nbsp;&nbsp;);<br />
                    {'}'}
                </motion.div>
            </motion.div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-10 max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-wider border border-white/10">
                        Continue Learning
                    </span>
                    <span className="text-violet-200 text-xs font-bold bg-black/20 px-2 py-0.5 rounded">Module {activeCourse.completedModules + 1}</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight drop-shadow-md">
                    {activeCourse.title}
                </h2>
                <p className="text-violet-100 mb-8 font-medium">
                    {activeCourse.instructor} • {activeCourse.totalModules - activeCourse.completedModules} modules remaining
                </p>

                <div className="flex items-center gap-6">
                    <Link href={`/student/courses/${activeCourse.id}`}>
                        <button className="flex items-center gap-2 bg-white text-violet-700 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-violet-50 transition-colors group">
                            <Play size={18} fill="currentColor" /> Resume
                        </button>
                    </Link>

                    <div className="flex-1 max-w-xs">
                        <div className="flex justify-between text-xs text-violet-200 mb-1 font-bold">
                            <span>Progress</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="h-2 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                            <motion.div
                                className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
