"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
import {
    User,
    Mail,
    Cpu,
    Trophy,
    Clock,
    FileText,
    Activity,
    AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Student } from "./RegistryTable";

interface StudentDossierProps {
    student: Student | null;
    isOpen: boolean;
    onClose: () => void;
}

export function StudentDossier({ student, isOpen, onClose }: StudentDossierProps) {
    if (!student) return null;

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="w-[450px] sm:w-[540px] bg-[#09090b] border-white/5 p-0 overflow-y-auto no-scrollbar">
                <div className="relative h-full flex flex-col">
                    {/* Digital File Folder Header */}
                    <div className="relative h-48 bg-zinc-900 flex items-end px-8 pb-6 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent z-10" />
                        <div className="absolute top-0 right-0 p-4 z-20">
                            <div className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                                student.risk === "High" ? "bg-rose-500/10 border-rose-500/50 text-rose-500 pulsing-border" : "bg-emerald-500/10 border-emerald-500/50 text-emerald-500"
                            )}>
                                {student.risk} Risk Profile
                            </div>
                        </div>

                        <div className="relative z-20 flex items-center gap-6">
                            <div className="h-20 w-20 rounded-2xl bg-zinc-800 border-2 border-white/10 overflow-hidden shadow-2xl">
                                <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="space-y-1">
                                <h2 className="text-2xl font-black italic tracking-tighter text-white">
                                    {student.name.toUpperCase()}
                                </h2>
                                <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                                    {student.rollId} • Intelligence Class A
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Dossier Body */}
                    <div className="flex-1 p-8 space-y-10">
                        {/* Biometric Vitality (Stats) */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="flex items-center gap-2 mb-2">
                                    <Activity className="h-3 w-3 text-indigo-400" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Academic IQ</span>
                                </div>
                                <div className="text-2xl font-black italic text-white">{student.grade}%</div>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock className="h-3 w-3 text-emerald-400" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Operation Sync</span>
                                </div>
                                <div className="text-2xl font-black italic text-white">{student.attendance}%</div>
                            </div>
                        </div>

                        {/* Recent Missions (Submissions) */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Recent Assignments</h3>
                                <FileText className="h-4 w-4 text-zinc-800" />
                            </div>
                            <div className="space-y-3">
                                {[
                                    { name: "Neural Re-architecture", score: 98, date: "2h ago" },
                                    { name: "Kernel Optimization", score: 85, date: "1d ago" },
                                    { name: "Distributed Sync", score: 42, date: "3d ago", low: true }
                                ].map((mission, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-white/5 group hover:border-white/10 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className={cn("h-1.5 w-1.5 rounded-full", mission.low ? "bg-rose-500" : "bg-emerald-500")} />
                                            <span className="text-xs font-medium text-zinc-300">{mission.name}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-[10px] font-mono">
                                            <span className={cn(mission.low ? "text-rose-500" : "text-zinc-500")}>{mission.score}%</span>
                                            <span className="text-zinc-700">{mission.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Faculty Observations (Notes) */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Faculty Observations</h3>
                            <div className="relative group">
                                <textarea
                                    className="w-full h-32 bg-zinc-900/50 border border-white/5 rounded-2xl p-4 text-sm text-zinc-400 focus:outline-none focus:border-indigo-500/30 transition-all placeholder:text-zinc-800"
                                    placeholder="Annotate student data for private review..."
                                />
                                <div className="absolute right-4 bottom-4 opacity-20 group-hover:opacity-100 transition-opacity">
                                    <Cpu className="h-4 w-4 text-zinc-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Access Actions */}
                    <div className="p-8 border-t border-white/5 bg-zinc-950 flex flex-col gap-3">
                        <button className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                            Initiate Direct Intel (Email)
                        </button>
                        <button className="w-full py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                            Flag for Disciplinary Review
                        </button>
                    </div>
                </div>

                {/* Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50" />
            </SheetContent>
        </Sheet>
    );
}
