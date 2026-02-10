"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calculator, FlaskConical, Languages } from "lucide-react";

export function PopularCourseRail() {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900">Popular courses</h2>
                <div className="flex gap-2">
                    <button className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white hover:shadow-sm hover:text-slate-900 transition-all">
                        <ChevronLeft size={16} />
                    </button>
                    <button className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white hover:shadow-sm hover:text-slate-900 transition-all">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Languages Card */}
                <div className="bg-[#F0F4FF] rounded-[24px] p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute top-0 right-0 p-6 opacity-50 group-hover:opacity-100 transition-opacity">
                        <Languages className="text-blue-300 transform rotate-12" size={64} />
                    </div>
                    <div className="relative z-10">
                        <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm inline-block mb-8">Languages</span>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">German Grammar</h3>
                        <p className="text-sm text-slate-500">Vocabulary & Speaking</p>
                    </div>
                </div>

                {/* Maths Card */}
                <div className="bg-[#FFF4F0] rounded-[24px] p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute top-0 right-0 p-6 opacity-50 group-hover:opacity-100 transition-opacity">
                        <Calculator className="text-orange-300 transform -rotate-12" size={64} />
                    </div>
                    <div className="relative z-10">
                        <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm inline-block mb-8">Maths</span>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Logic and Problem</h3>
                        <p className="text-sm text-slate-500">Solving Techniques</p>
                    </div>
                </div>

                {/* Chemistry Card */}
                <div className="bg-[#F0FFF4] rounded-[24px] p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute top-0 right-0 p-6 opacity-50 group-hover:opacity-100 transition-opacity">
                        <FlaskConical className="text-emerald-300 transform rotate-6" size={64} />
                    </div>
                    <div className="relative z-10">
                        <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm inline-block mb-8">Chemistry</span>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">The Environment</h3>
                        <p className="text-sm text-slate-500">Organic Chemistry</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
