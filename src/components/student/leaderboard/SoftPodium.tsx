"use client";

import React from "react";
import { motion } from "framer-motion";


interface LeaderboardUser {
    id: string;
    rank: number;
    name: string | null;
    xp: number;
    image: string | null;
}

interface SoftPodiumProps {
    topStudents: LeaderboardUser[];
}

export function SoftPodium({ topStudents }: SoftPodiumProps) {
    // Map top 3 students to podium positions.
    // Rank 1 is center, Rank 2 is left, Rank 3 is right.
    const rank1 = topStudents.find(s => s.rank === 1);
    const rank2 = topStudents.find(s => s.rank === 2);
    const rank3 = topStudents.find(s => s.rank === 3);

    // Prepare display array in left-to-right visual order: 2, 1, 3
    const podiumDisplay = [
        rank2 && { ...rank2, color: "from-slate-200 to-slate-200", ringColor: "border-slate-200", height: "h-32", delay: 0.2 },
        rank1 && { ...rank1, color: "from-amber-200 to-yellow-200", ringColor: "border-amber-200", height: "h-40", delay: 0 },
        rank3 && { ...rank3, color: "from-orange-200 to-orange-100", ringColor: "border-orange-200", height: "h-24", delay: 0.4 }
    ].filter(Boolean) as (LeaderboardUser & { color: string, ringColor: string, height: string, delay: number })[];

    return (
        <div className="relative w-full max-w-3xl mx-auto h-[400px] flex items-end justify-center gap-4 md:gap-8 pb-12">
            {/* Ambient Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-indigo-500/5 blur-3xl rounded-full -z-10" />

            {podiumDisplay.map((winner) => (
                <div key={winner.rank} className="flex flex-col items-center group relative z-10">

                    {/* Floating Avatar */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: winner.delay
                        }}
                        className="relative mb-6"
                    >
                        {/* Crown for #1 */}
                        {winner.rank === 1 && (
                            <motion.div
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 5, repeat: Infinity }}
                                className="absolute -top-12 left-1/2 -translate-x-1/2 text-5xl filter drop-shadow-lg z-20"
                            >
                                👑
                            </motion.div>
                        )}

                        <div className={`rounded-full p-2 bg-white shadow-xl ring-4 ${winner.ringColor}`}>
                            <div className="h-20 w-20 md:h-28 md:w-28 rounded-full overflow-hidden border-4 border-white">
                                <img src={winner.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${winner.id}`} alt={winner.name || "Student"} className="h-full w-full object-cover" />
                            </div>
                        </div>

                        {/* Name Card */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-1.5 rounded-full shadow-lg border border-slate-50 whitespace-nowrap z-30">
                            <div className="text-sm font-bold text-slate-800">{winner.name || "Student"}</div>
                        </div>
                    </motion.div>

                    {/* Soft Pedestal */}
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        className={`w-28 md:w-40 bg-gradient-to-b ${winner.color} rounded-t-[32px] pt-4 pb-2 relative flex flex-col items-center justify-start shadow-sm`}
                        style={{ height: winner.rank === 1 ? '180px' : winner.rank === 2 ? '140px' : '110px' }}
                    >
                        <div className="text-4xl font-black text-white/80 drop-shadow-sm mt-4 leading-none">
                            {winner.rank}
                        </div>
                        <div className="mt-2 text-sm font-bold text-black/40 uppercase tracking-widest">
                            {winner.xp.toLocaleString()} XP
                        </div>
                    </motion.div>
                </div>
            ))}
        </div>
    );
}
