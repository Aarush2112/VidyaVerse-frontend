"use client";

import { motion } from "framer-motion";
import { Trophy, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PodiumItemProps {
    rank: number;
    name: string;
    xp: number;
    avatar?: string;
    height: string;
    color: "gold" | "silver" | "bronze";
    delay: number;
}

function PodiumItem({ rank, name, xp, avatar, height, color, delay }: PodiumItemProps) {
    const config = {
        gold: {
            border: "border-amber-500/30",
            glow: "shadow-[0_0_40px_rgba(245,158,11,0.2)]",
            text: "text-amber-400",
            bg: "bg-amber-500/10",
            gradient: "from-amber-600/20 to-transparent"
        },
        silver: {
            border: "border-cyan-400/30",
            glow: "shadow-[0_0_40px_rgba(34,211,238,0.2)]",
            text: "text-cyan-400",
            bg: "bg-cyan-500/10",
            gradient: "from-cyan-600/20 to-transparent"
        },
        bronze: {
            border: "border-orange-500/30",
            glow: "shadow-[0_0_40px_rgba(249,115,22,0.2)]",
            text: "text-orange-400",
            bg: "bg-orange-500/10",
            gradient: "from-orange-600/20 to-transparent"
        }
    };

    const style = config[color];

    return (
        <div className="flex flex-col items-center gap-4 relative group">
            {/* Avatar & Floating Icon */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: delay + 0.5, type: "spring" as const, stiffness: 100 }}
                className="relative"
            >
                {rank === 1 && (
                    <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 z-20"
                    >
                        <Crown className="h-10 w-10 text-amber-400 fill-amber-400 filter drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                    </motion.div>
                )}
                <Avatar className={cn(
                    "w-24 h-24 border-2 shadow-2xl",
                    style.border
                )}>
                    <AvatarImage src={avatar} />
                    <AvatarFallback className="bg-zinc-900 text-2xl font-bold">{name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className={cn(
                    "absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-2 border-zinc-950 flex items-center justify-center font-black text-sm bg-zinc-900",
                    style.text
                )}>
                    {rank}
                </div>
            </motion.div>

            {/* Glass Pillar */}
            <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay, duration: 0.8, ease: "circOut" as const }}
                style={{ height, transformOrigin: "bottom" }}
                className={cn(
                    "w-48 bg-zinc-900/40 backdrop-blur-2xl border-t border-x rounded-t-2xl relative overflow-hidden group-hover:bg-zinc-900/60 transition-colors",
                    style.border,
                    style.glow
                )}
            >
                <div className={cn("absolute inset-0 bg-gradient-to-t opacity-30", style.gradient)} />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <h3 className="text-xl font-bold tracking-tight text-white mb-1 group-hover:text-indigo-400 transition-colors">
                        {name}
                    </h3>
                    <p className="font-mono text-sm font-bold text-zinc-500">
                        {xp.toLocaleString()} <span className={cn("text-[10px] uppercase", style.text)}>XP</span>
                    </p>
                </div>

                {/* Decorative Geometry */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/10 blur-sm rounded-full mb-4" />
            </motion.div>
        </div>
    );
}

export function PodiumStage() {
    return (
        <div className="w-full min-h-[500px] flex items-end justify-center gap-4 md:gap-12 relative pb-10 overflow-visible">
            {/* Spotlight Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />

            <PodiumItem
                rank={2}
                name="Ishita R."
                xp={12450}
                avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Ishita"
                height="280px"
                color="silver"
                delay={0.2}
            />

            <PodiumItem
                rank={1}
                name="Aarav P."
                xp={15200}
                avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav"
                height="380px"
                color="gold"
                delay={0}
            />

            <PodiumItem
                rank={3}
                name="Rohan S."
                xp={11900}
                avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan"
                height="220px"
                color="bronze"
                delay={0.4}
            />
        </div>
    );
}
