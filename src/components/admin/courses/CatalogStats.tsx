"use client";

import React from "react";
import { BookOpen, Users, Hourglass } from "lucide-react";

export function CatalogStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* 1. Live Courses */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                    <div className="text-slate-500 text-sm font-medium mb-1">Live Courses</div>
                    <div className="text-3xl font-bold text-slate-900 font-poppins">24</div>
                    <div className="text-emerald-600 text-xs font-bold mt-2 flex items-center gap-1">
                        <span className="bg-emerald-100 px-1.5 py-0.5 rounded-full">+2 this week</span>
                    </div>
                </div>
                <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                    <BookOpen size={24} />
                </div>
            </div>

            {/* 2. Pending Approval */}
            <div className="bg-white rounded-[24px] p-6 shadow-[0_0_20px_rgba(249,115,22,0.15)] border border-orange-100 flex items-center justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-orange-50 rounded-bl-[100px] -mr-8 -mt-8" />

                <div className="relative z-10">
                    <div className="text-orange-600 text-sm font-bold uppercase tracking-wider mb-1">Action Needed</div>
                    <div className="text-3xl font-bold text-slate-900 font-poppins">5</div>
                    <div className="text-orange-600/80 text-xs font-medium mt-2">
                        Pending Content Review
                    </div>
                </div>
                <div className="relative z-10 h-12 w-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center animate-pulse">
                    <Hourglass size={24} />
                </div>
            </div>

            {/* 3. Total Enrollment */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                    <div className="text-slate-500 text-sm font-medium mb-1">Total Enrollment</div>
                    <div className="text-3xl font-bold text-slate-900 font-poppins">1,240</div>
                    <div className="text-slate-400 text-xs font-medium mt-2">
                        Across all active courses
                    </div>
                </div>
                <div className="h-12 w-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                    <Users size={24} />
                </div>
            </div>
        </div>
    );
}
