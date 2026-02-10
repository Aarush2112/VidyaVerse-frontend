"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Users, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const DATA = [
    { name: "Graded", value: 78, color: "#6B50D6" },
    { name: "Remaining", value: 22, color: "#F3E8FF" },
];

export function PastelStatCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Class Average Donut */}
            <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex items-center gap-6">
                <div className="h-24 w-24 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={DATA}
                                cx="50%"
                                cy="50%"
                                innerRadius={30}
                                outerRadius={45}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {DATA.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-slate-900">78%</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Class Average</span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">Excellent</h3>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#6B50D6]" />
                        <span className="text-[10px] font-bold text-[#6B50D6] uppercase tracking-widest">+4.2% from last wk</span>
                    </div>
                </div>
            </div>

            {/* Grading Status */}
            <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex items-center gap-6 group">
                <div className="h-20 w-20 rounded-[24px] bg-[#FFF1F2] flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                    <div className="relative">
                        <ChecklistIcon className="h-10 w-10 text-[#BE123C]" />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#BE123C]"
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Grading Status</span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">12 / 45 Graded</h3>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full mt-4 overflow-hidden">
                        <div className="h-full bg-[#BE123C] w-[27%] rounded-full" />
                    </div>
                </div>
            </div>

            {/* Top Performers Podium */}
            <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Top Performers</span>
                    <Sparkles className="h-4 w-4 text-[#E67E22]" />
                </div>
                <div className="flex items-end justify-around h-20 px-2">
                    {/* Silver */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full border-2 border-slate-200 overflow-hidden bg-slate-50">
                            <img src="https://ui-avatars.com/api/?name=Alex+Z&background=F1F5F9&color=64748B" alt="Avatar" />
                        </div>
                        <div className="w-8 h-8 rounded-t-lg bg-slate-100 flex items-center justify-center">
                            <span className="text-[10px] font-black text-slate-400">2</span>
                        </div>
                    </div>
                    {/* Gold */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full border-2 border-[#E67E22] overflow-hidden bg-orange-50 p-1">
                            <img src="https://ui-avatars.com/api/?name=Sarah+K&background=FFF7ED&color=E67E22" alt="Avatar" className="rounded-full" />
                        </div>
                        <div className="w-10 h-12 rounded-t-lg bg-[#FFF7ED] flex items-center justify-center border-t-2 border-[#E67E22]/20">
                            <span className="text-xs font-black text-[#E67E22]">1</span>
                        </div>
                    </div>
                    {/* Bronze */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full border-2 border-orange-200 overflow-hidden bg-orange-50/20">
                            <img src="https://ui-avatars.com/api/?name=John+D&background=FEFCE8&color=CA8A04" alt="Avatar" />
                        </div>
                        <div className="w-8 h-6 rounded-t-lg bg-orange-50/50 flex items-center justify-center">
                            <span className="text-[10px] font-black text-[#CA8A04]">3</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Minimal checklist icon fallback if lucide doesn't have it
function ChecklistIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
    );
}
