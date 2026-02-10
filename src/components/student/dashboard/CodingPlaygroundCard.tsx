"use client";

import { Code2, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export const CodingPlaygroundCard = () => {
    return (
        <Link href="/student/ide" className="group">
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-indigo-950/50 to-slate-900/50 backdrop-blur-md border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden h-full flex flex-col justify-center hover:border-indigo-500/50 transition-all cursor-pointer"
            >
                <div className="relative z-10 flex flex-col h-full">
                    <div className="h-10 w-10 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4 text-indigo-400 group-hover:text-white group-hover:bg-indigo-500 transition-all shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                        <Code2 className="h-6 w-6" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">Coding Playground</h3>
                    <p className="text-slate-400 text-sm">Jump into the IDE. Practice Python, JS, C++.</p>

                    <div className="absolute bottom-6 right-6">
                        <ArrowUpRight className="h-6 w-6 text-indigo-500/50 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>

                {/* Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -translate-y-10 translate-x-10 pointer-events-none" />
            </motion.div>
        </Link>
    )
}
