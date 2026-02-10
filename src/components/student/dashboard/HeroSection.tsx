"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface HeroSectionProps {
    name: string;
}

export const HeroSection = ({ name }: HeroSectionProps) => {
    const [text, setText] = useState("");
    const fullText = `Good Morning, ${name}`;

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.substring(0, i));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 100);
        return () => clearInterval(interval);
    }, [name, fullText]);

    return (
        <div className="relative h-64 md:h-80 w-full flex items-center justify-center overflow-hidden mb-8">
            {/* Animated Orb Geometry Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
                        className={`absolute border border-cyan-500/${20 - i * 5} rounded-full`}
                        style={{ width: `${300 + i * 150}px`, height: `${300 + i * 150}px` }}
                    />
                ))}
                {/* Glowing Core */}
                <div className="w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
            </div>

            <div className="relative z-10 text-center">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-slate-400 font-sans mb-4 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                    {text}<span className="animate-blink">_</span>
                </h1>
                <p className="text-slate-400 font-mono text-sm uppercase tracking-[0.3em]">
                    System Online • Synchronization Complete
                </p>
            </div>
        </div>
    )
}
