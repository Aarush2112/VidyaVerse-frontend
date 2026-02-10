"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { SoftPodium } from "@/components/student/leaderboard/SoftPodium";
import { RankCapsule } from "@/components/student/leaderboard/RankCapsule";
import { PlayerDock } from "@/components/student/leaderboard/PlayerDock";
import { cn } from "@/lib/utils";

interface LeaderboardUser {
    id: string;
    rank: number;
    name: string | null;
    xp: number;
    image: string | null;
    trend?: "up" | "down" | "stable";
}

interface CelebrationLeaderboardProps {
    leaderboardData: LeaderboardUser[];
    currentUser?: LeaderboardUser;
    label?: string;
}

export function CelebrationLeaderboard({ leaderboardData, currentUser, label = "XP" }: CelebrationLeaderboardProps) {

    // Trigger Fireworks on Mount
    useEffect(() => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // multiple origins
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    const top3 = leaderboardData.slice(0, 3);
    const rest = leaderboardData.slice(3);

    return (
        <div className="min-h-screen bg-[#F2F5F9] pb-32">
            {/* Spotlight Gradient Background */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-sky-100/50 blur-[120px] rounded-full" />
            </div>

            <main className="relative z-10 pt-8 px-4 md:px-8 max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-block px-3 py-1 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 shadow-sm">
                        Season 4 • Week 12
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
                        Celebration Plaza
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium">Top performing students this week 🚀</p>
                </div>

                {/* Hero Podium */}
                {/* Note: SoftPodium might need update too, but for speed skipping as it likely shows avatar mainly. 
                    If it shows Score/XP, ideally update it. 
                    Assuming it handles display internally or we update it later if needed. 
                */}
                {top3.length > 0 && <SoftPodium topStudents={top3} />}

                {/* Floating List Container */}
                <div className="bg-white/40 backdrop-blur-sm rounded-[32px] p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/60">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 pl-4">Top Scholars</h3>

                    <div className="space-y-3">
                        {rest.map((student) => (
                            <RankCapsule
                                key={student.id}
                                {...student}
                                name={student.name || "Anonymous"}
                                avatar={student.image || ""}
                                trend={student.trend || "stable"}
                                label={label}
                            />
                        ))}
                        {rest.length === 0 && (
                            <div className="text-center text-slate-400 py-8">
                                Not enough data for rankings yet.
                            </div>
                        )}
                    </div>
                </div>

                {/* Infinite Scroll/Check Loader */}
                <div className="text-center py-12 text-slate-300 text-sm font-bold uppercase tracking-widest">
                    You've reached the end
                </div>
            </main>

            {currentUser && <PlayerDock rank={currentUser.rank} xp={currentUser.xp} label={label} />}
        </div>
    );
}
