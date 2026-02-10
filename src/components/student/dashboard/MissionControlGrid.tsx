"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "./HeroSection";
import { QuantumStats } from "./QuantumStats";
import { ActiveMissionLaser } from "./ActiveMissionLaser";
import { CodeArenaTerminal } from "./CodeArenaTerminal";
import { MissionTimeline } from "./MissionTimeline"; // Reusing Phase 14 component as it fits well

// Mock Data
const mockData = {
    user: { name: "Poorak", xp: 12450, level: 5, rank: 42 },
    currentMission: { title: "Full Stack Development", progress: 67 },
}

export const MissionControlGrid = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        setTimeout(() => setData(mockData), 500);
    }, []);

    if (!data) return <div className="text-cyan-500 font-mono animate-pulse">INITIALIZING SYSTEM...</div>;

    // Staggered Entrance Animation Variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
        >
            {/* 1. Hero */}
            <motion.div variants={item}>
                <HeroSection name={data.user.name} />
            </motion.div>

            {/* 2. Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">

                {/* A. Stats Command (Span 4) */}
                <motion.div variants={item} className="md:col-span-4 h-64">
                    <QuantumStats
                        xp={data.user.xp}
                        level={data.user.level}
                        rank={data.user.rank}
                        rankTrend="up"
                    />
                </motion.div>

                {/* B. Active Mission Centerpiece (Span 6) */}
                <motion.div variants={item} className="md:col-span-5 h-64">
                    <ActiveMissionLaser
                        course={data.currentMission.title}
                        progress={data.currentMission.progress}
                    />
                </motion.div>

                {/* C. Code Arena (Span 2) */}
                <motion.div variants={item} className="md:col-span-3 h-64">
                    <CodeArenaTerminal />
                </motion.div>

                {/* Row 2 */}

                {/* D. Mission Timeline (Span 3) */}
                {/* Reusing the vertical timeline but wrapping in motion */}
                <motion.div variants={item} className="md:col-span-3 h-96">
                    <MissionTimeline />
                </motion.div>

                {/* E. Quick Actions / Modules (Span 9) */}
                {/* (For now, just a placeholder or could reuse QuickLaunchCards) */}
                <motion.div variants={item} className="md:col-span-9 h-96 flex items-center justify-center border border-white/5 rounded-2xl bg-white/5 backdrop-blur-sm">
                    <p className="text-slate-500 font-mono text-sm tracking-widest">ADDITIONAL MODULES OFFLINE</p>
                </motion.div>
            </div>
        </motion.div>
    )
}
