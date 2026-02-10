"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus, Star } from "lucide-react";

export function SpotlightHero() {
    return (
        <section className="relative w-full h-[500px] mb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full rounded-[40px] bg-gradient-to-br from-[#E0E7FF] via-[#F3E8FF] to-[#FAE8FF] relative overflow-hidden flex items-center p-8 md:p-16 shadow-[0_20px_60px_-15px_rgba(79,70,229,0.15)]"
            >
                {/* Soft Mesh Gradient Overlay */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/40 blur-[100px] rounded-full mix-blend-overlay pointer-events-none" />

                <div className="flex flex-col md:flex-row items-center justify-between w-full relative z-10 gap-12">
                    {/* Left: Content */}
                    <div className="flex-1 max-w-xl space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FEF9C3] text-[#A16207] rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                            <Star size={12} fill="currentColor" />
                            Editor's Choice
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-6xl font-extrabold text-[#1E293B] leading-[1.1] tracking-tight">
                                Mastering <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#9333EA]">
                                    React Patterns
                                </span>
                            </h1>
                            <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-md">
                                Deep dive into advanced component composition, state management, and rendering optimization.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button className="h-14 px-8 rounded-full bg-[#1E293B] hover:bg-[#0F172A] text-white text-base font-bold shadow-lg shadow-slate-900/20 hover:scale-105 transition-all">
                                Start Learning
                            </Button>
                            <Button variant="outline" size="icon" className="h-14 w-14 rounded-full border-2 border-white bg-white/50 backdrop-blur-sm hover:bg-white text-slate-700 hover:text-[#4F46E5] transition-all">
                                <Plus size={24} />
                            </Button>
                        </div>
                    </div>

                    {/* Right: 3D Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="flex-1 flex justify-center md:justify-end relative"
                    >
                        {/* Abstract Floating Shapes (Simulating 3D) */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                            className="relative w-80 h-80 md:w-[450px] md:h-[450px]"
                        >
                            {/* Main Sphere/Shape */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#6366F1] to-[#A855F7] rounded-[60px] transform rotate-12 shadow-2xl opacity-90 blur-sm md:blur-0" />
                            <div className="absolute inset-4 bg-white/20 backdrop-blur-xl border border-white/40 rounded-[50px] transform -rotate-6 flex items-center justify-center shadow-inner">
                                <div className="text-[120px] md:text-[180px]">⚛️</div>
                            </div>

                            {/* Floating Orbitals */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                                className="absolute -top-10 -right-10 w-24 h-24 bg-[#38BDF8] rounded-full blur-xl opacity-60"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                                className="absolute -bottom-5 -left-10 w-32 h-32 bg-[#F472B6] rounded-full blur-xl opacity-60"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
