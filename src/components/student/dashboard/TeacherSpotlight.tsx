"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Plus } from "lucide-react";
import { motion } from "framer-motion";

const TEACHERS = [
    { name: "Anna Stewart", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna" },
    { name: "Volter Anderson", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Volter" },
    { name: "Alice Miller", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" },
    { name: "Monica Peterson", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Monica" },
];

export function TeacherSpotlight() {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900">Your teachers</h2>
                <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900 font-medium">
                    See all <ChevronRight size={16} className="ml-1" />
                </Button>
            </div>

            <div className="flex items-center gap-8 overflow-x-auto pb-4 scrollbar-hide">
                {TEACHERS.map((teacher, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-3 min-w-[100px]">
                        <div className="relative group cursor-pointer">
                            <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-white shadow-sm transition-transform group-hover:scale-110">
                                <img src={teacher.image} alt={teacher.name} className="h-full w-full object-cover bg-slate-200" />
                            </div>
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-5 w-5 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-sm">
                                <div className="h-2 w-2 bg-black rounded-full" />
                            </div>
                        </div>
                        <span className="text-sm font-medium text-slate-700 text-center leading-tight w-24">{teacher.name}</span>
                    </div>
                ))}

                <button className="h-16 w-16 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-slate-400 hover:text-slate-600 transition-colors shrink-0 mb-6">
                    <Plus size={24} />
                </button>
            </div>
        </div>
    );
}
