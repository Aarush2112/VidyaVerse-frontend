"use client";

import { motion } from "framer-motion";
import { Play, Plus, Info, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSpotlight() {
    return (
        <section className="relative h-[85vh] w-full overflow-hidden bg-black select-none">
            {/* Background Image / Placeholder */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent z-10" />
                <img
                    src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
                    alt="Featured Course"
                    className="w-full h-full object-cover opacity-60 scale-105"
                />
            </div>

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col justify-end px-8 md:px-16 pb-20 md:pb-32 max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <div className="flex items-center gap-4">
                        <Badge className="bg-amber-500 text-black font-black uppercase tracking-widest text-[10px] items-center gap-1 px-3">
                            <Star className="h-3 w-3 fill-black" /> Trending #1
                        </Badge>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
                            24 Modules • 12H 45M • Advanced
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white leading-[0.9]">
                        ADVANCED REACT <br /> <span className="text-cyan-500">ENGINEERING</span>
                    </h1>

                    <p className="max-w-xl text-lg text-zinc-400 font-medium leading-relaxed">
                        Master the internal reconciliation engine, concurrent rendering, and senior-level architectural patterns used at Fortune 500 companies.
                    </p>

                    <div className="flex items-center gap-4 pt-4">
                        <Button className="h-14 px-10 bg-white hover:bg-zinc-200 text-black font-black text-lg gap-3 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all active:scale-95">
                            <Play className="h-6 w-6 fill-black" /> Start Watching
                        </Button>
                        <Button variant="ghost" className="h-14 px-6 bg-white/10 hover:bg-white/20 text-white font-bold text-lg gap-3 rounded-xl backdrop-blur-md border border-white/10 transition-all active:scale-95">
                            <Plus className="h-6 w-6" /> Add to List
                        </Button>
                        <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all active:scale-95">
                            <Info className="h-6 w-6" />
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* Cinematic Noise Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-30" />
        </section>
    );
}
