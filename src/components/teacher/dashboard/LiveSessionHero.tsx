"use client";

import { motion } from "framer-motion";
import { Play, Share, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LiveSessionHeroProps {
    session?: {
        subject: string;
        location: string;
        attendanceCount: number;
        totalStudents: number;
        isLive: boolean;
    };
}

export const LiveSessionHero = ({ session }: LiveSessionHeroProps) => {
    if (!session || !session.isLive) {
        // Fallback or "Start Session" state
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative w-full h-[280px] rounded-[32px] overflow-hidden bg-slate-900 shadow-xl flex items-center justify-center border border-slate-800"
            >
                <div className="text-center space-y-4">
                    <div className="h-16 w-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400">
                        <Radio className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white">No Live Session</h3>
                    <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">Start Class</Button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full h-[280px] rounded-[32px] overflow-hidden shadow-2xl shadow-violet-900/20 group cursor-pointer"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#6D28D9] via-[#7C3AED] to-[#8B5CF6] z-0" />

            {/* Animated Mesh / Pulse */}
            <div className="absolute inset-0 opacity-30 z-0">
                <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] bg-violet-400 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-30%] right-[-10%] w-[400px] h-[400px] bg-indigo-500 rounded-full blur-[80px]" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 h-full p-10 flex flex-col justify-between">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <div className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                            </span>
                            <span className="text-white text-xs font-bold uppercase tracking-widest">Live Now</span>
                        </div>
                        <span className="text-violet-200 text-sm font-medium">{session.location}</span>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                        <Radio className="text-white h-5 w-5" />
                    </div>
                </div>

                {/* Title & Stats */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-white tracking-tight leading-tight max-w-2xl text-ellipsis overflow-hidden whitespace-nowrap">
                        {session.subject}
                    </h1>
                    <div className="flex items-center gap-6">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-10 w-10 rounded-full border-2 border-violet-600 bg-violet-800" />
                            ))}
                        </div>
                        <div className="text-white">
                            <span className="block text-2xl font-bold">{session.attendanceCount}/{session.totalStudents}</span>
                            <span className="text-xs text-violet-200 font-medium uppercase tracking-wider">Students Present</span>
                        </div>
                    </div>
                </div>

                {/* Actions (Floating) */}
                <div className="absolute bottom-10 right-10 flex gap-4">
                    <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md rounded-full px-6 h-12 font-medium">
                        <Share className="h-4 w-4 mr-2" /> Share Screen
                    </Button>
                    <Button className="bg-white text-violet-700 hover:bg-violet-50 rounded-full px-8 h-12 font-bold shadow-lg shadow-violet-900/10">
                        <Play className="h-4 w-4 mr-2 fill-violet-700" /> Resume
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};
