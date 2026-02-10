"use client";

import { motion } from "framer-motion";
import { Crown, Flame, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LeaderboardUser {
    rank: number;
    name: string;
    xp: number;
    avatar: string;
    streak: number;
    batch: string;
}

interface PodiumProps {
    top3: LeaderboardUser[];
}

export const Podium = ({ top3 }: PodiumProps) => {
    // Sort just in case passed unsorted, though rank should be 1, 2, 3
    const [winner, second, third] = top3;

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: (custom: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: custom * 0.2, type: "spring" as const, stiffness: 100 }
        })
    };

    return (
        <div className="flex justify-center items-end gap-4 md:gap-8 mb-12 h-[350px]">
            {/* Rank 2 (Left) */}
            <motion.div
                custom={1}
                initial="hidden"
                animate="visible"
                variants={variants}
                className="flex flex-col items-center"
            >
                <div className="relative">
                    <div className="absolute -inset-4 bg-cyan-500/20 rounded-full blur-xl animate-pulse" />
                    <Avatar className="h-20 w-20 md:h-24 md:w-24 border-4 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)] z-10">
                        <AvatarImage src={second.avatar} />
                        <AvatarFallback className="bg-slate-800 text-cyan-400 font-bold text-xl">{second.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-black font-bold text-xs px-2 py-0.5 rounded-full z-20 shadow-lg border border-white/20">
                        #2
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <h3 className="text-white font-bold text-lg md:text-xl truncate max-w-[120px]">{second.name}</h3>
                    <p className="text-cyan-400 font-mono text-sm">{second.xp.toLocaleString()} XP</p>
                    <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-3 mt-2 border border-cyan-500/30 w-full md:w-32 h-32 flex flex-col justify-end relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent" />
                        <span className="text-xs text-slate-400 relative z-10 text-center">{second.batch}</span>
                    </div>
                </div>
            </motion.div>

            {/* Rank 1 (Center - Elevated) */}
            <motion.div
                custom={2} // Delays slightly more to "drop" last? Or usually Winner drops last for effect. Let's do winner last.
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, type: "spring" as const, bounce: 0.5 }}
                className="flex flex-col items-center z-20 -translate-y-6"
            >
                <div className="relative">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -top-12 left-1/2 -translate-x-1/2 text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]"
                    >
                        <Crown className="h-10 w-10 fill-amber-400" />
                    </motion.div>

                    <div className="absolute -inset-6 bg-amber-500/30 rounded-full blur-2xl animate-pulse" />
                    <Avatar className="h-28 w-28 md:h-32 md:w-32 border-4 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.6)] z-10 ring-4 ring-amber-500/20">
                        <AvatarImage src={winner.avatar} />
                        <AvatarFallback className="bg-slate-800 text-amber-400 font-bold text-2xl">{winner.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-yellow-300 text-black font-bold text-sm px-4 py-1 rounded-full z-20 shadow-[0_0_15px_rgba(245,158,11,0.5)] border border-white/50">
                        CHAMPION
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <h3 className="text-white font-bold text-xl md:text-2xl truncate max-w-[150px]">{winner.name}</h3>
                    <p className="text-amber-400 font-mono text-lg font-bold">{winner.xp.toLocaleString()} XP</p>
                    <div className="flex items-center justify-center gap-1 mt-1 text-xs font-bold text-orange-400">
                        <Flame className="h-3 w-3 fill-orange-400" /> {winner.streak} Day Streak
                    </div>

                    <div className="bg-slate-800/80 backdrop-blur-sm rounded-t-xl p-3 mt-4 border-t border-x border-amber-500/30 w-full md:w-40 h-40 flex flex-col justify-end relative overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-amber-900/10 to-transparent" />
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,1)]" />
                        <span className="text-sm text-slate-300 relative z-10 font-bold">{winner.batch}</span>
                    </div>
                </div>
            </motion.div>

            {/* Rank 3 (Right) */}
            <motion.div
                custom={1}
                initial="hidden"
                animate="visible"
                variants={variants}
                className="flex flex-col items-center"
            >
                <div className="relative">
                    <div className="absolute -inset-4 bg-orange-700/20 rounded-full blur-xl animate-pulse" />
                    <Avatar className="h-20 w-20 md:h-24 md:w-24 border-4 border-orange-700 shadow-[0_0_20px_rgba(194,65,12,0.5)] z-10">
                        <AvatarImage src={third.avatar} />
                        <AvatarFallback className="bg-slate-800 text-orange-600 font-bold text-xl">{third.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-orange-700 text-white font-bold text-xs px-2 py-0.5 rounded-full z-20 shadow-lg border border-white/20">
                        #3
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <h3 className="text-white font-bold text-lg md:text-xl truncate max-w-[120px]">{third.name}</h3>
                    <p className="text-orange-500 font-mono text-sm">{third.xp.toLocaleString()} XP</p>
                    <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-3 mt-2 border border-orange-700/30 w-full md:w-32 h-24 flex flex-col justify-end relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-orange-700/20 to-transparent" />
                        <span className="text-xs text-slate-400 relative z-10 text-center">{third.batch}</span>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
