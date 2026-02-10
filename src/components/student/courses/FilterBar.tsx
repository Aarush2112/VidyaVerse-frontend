"use client";

import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const tags = ["All", "Python", "Web Development", "Data Science", "Machine Learning", "System Design"];

export const FilterBar = () => {
    return (
        <div className="sticky top-4 z-30 mb-8 p-1">
            <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between shadow-2xl shadow-black/50">

                {/* Search */}
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search for courses..."
                        className="w-full h-10 bg-slate-800/50 border border-white/5 rounded-xl pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                    />
                </div>

                {/* Tags */}
                <div className="hidden lg:flex items-center gap-2 overflow-x-auto no-scrollbar mask-gradient px-4">
                    {tags.map((tag, i) => (
                        <button
                            key={i}
                            className={`
                                whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium border transition-all
                                ${i === 0
                                    ? "bg-white text-black border-white shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                                    : "bg-transparent text-slate-400 border-white/10 hover:border-white/30 hover:text-white"
                                }
                            `}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Sort / Operations */}
                <div className="flex items-center gap-2 shrink-0">
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        <ArrowUpDown className="h-4 w-4 mr-2" /> Sort
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        <Filter className="h-4 w-4 mr-2" /> Filter
                    </Button>
                </div>
            </div>
        </div>
    )
}
