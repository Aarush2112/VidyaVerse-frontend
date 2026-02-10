"use client";

import React from "react";
import { Play, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FocusModuleCard() {
    return (
        <div className="h-full bg-white rounded-[32px] p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col group hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5B86E5] block mb-1">Current Learning</span>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">Mastering Server Actions</h3>
                </div>
                <div className="bg-blue-50 text-blue-600 p-2 rounded-full">
                    <Play size={16} fill="currentColor" />
                </div>
            </div>

            {/* Video Placeholder */}
            <div className="flex-1 bg-slate-50 rounded-2xl relative overflow-hidden group cursor-pointer border border-slate-100">
                {/* This would be an image tag in production */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Play size={20} className="ml-1 text-slate-900 fill-slate-900" />
                    </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-md">
                    12:45
                </div>
            </div>

            {/* Footer */}
            <div className="mt-5 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                    <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-[#5B86E5]" />
                        12:45 Remaining
                    </div>
                    <span>45%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-[45%] bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full" />
                </div>
            </div>
        </div>
    );
}
