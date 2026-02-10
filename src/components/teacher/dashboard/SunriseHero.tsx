"use client";

import { motion } from "framer-motion";

export function SunriseHero() {
    return (
        <section className="relative w-full py-16 px-10 overflow-hidden rounded-[40px] bg-white border border-slate-100 soft-shadow-md">
            {/* Ambient Soft Lighting */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-12 right-12 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 block">
                        January 20, 2026 • Spring Semester
                    </span>
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
                        Good Morning, <br />
                        <span className="text-[#5B86E5] italic">Professor Pandey.</span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="text-slate-500 text-lg max-w-xl font-medium leading-relaxed"
                >
                    Your studio is prepared. You have <span className="text-slate-900 font-bold">3 missions</span> active today and <span className="text-slate-900 font-bold">12 submissions</span> awaiting your review.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex gap-4 pt-4"
                >
                    <button className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#5B86E5] to-[#36D1DC] text-white font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-blue-500/30 transition-all">
                        Begin Session
                    </button>
                    <button className="px-8 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">
                        View Schedule
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
