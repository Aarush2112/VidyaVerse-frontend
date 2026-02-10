"use client";

import React from "react";

export function LiveThreatMap() {
    return (
        <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8 h-[500px] relative overflow-hidden flex flex-col">

            {/* Header / Overlay */}
            <div className="flex justify-between items-start z-10 mb-8">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 font-poppins">Live Traffic Analysis</h2>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm font-medium text-slate-500">Real-time monitoring active</span>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-md border border-slate-100 shadow-sm rounded-full px-4 py-2 text-sm font-mono text-slate-600">
                    Throughput: <span className="font-bold text-blue-600">450 req/s</span>
                </div>
            </div>

            {/* Map Canvas (Abstract CSS/SVG Dotted Map) */}
            <div className="absolute inset-0 top-20 flex items-center justify-center opacity-40 pointer-events-none">
                {/* Simplified World Map Silhouette using Dots */}
                <svg width="800" height="400" viewBox="0 0 800 400" className="w-full h-full max-w-5xl">
                    <defs>
                        <pattern id="dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1.5" className="text-slate-300" fill="currentColor" />
                        </pattern>
                    </defs>
                    {/* Abstract Continental Shapes (Rough Approximation) */}
                    <path
                        d="M150,100 Q200,50 300,80 T450,150 T600,100 T750,150 V300 H150 Z"
                        fill="url(#dot-pattern)"
                        className="opacity-50"
                    />
                    <rect width="100%" height="100%" fill="none" />
                    {/* Note: In a real prod env, we'd use a GeoJSON standard dotted map. 
                        For this generic UI, we simulate the "feel" with a pattern overlay relative to pings. */}
                </svg>
            </div>

            {/* Simulated Pings */}
            <div className="absolute inset-0 top-24 pointer-events-none">
                {/* Ping 1: Valid (US) */}
                <div className="absolute top-[30%] left-[25%]">
                    <div className="h-3 w-3 bg-blue-500 rounded-full animate-ping absolute opacity-75" />
                    <div className="h-3 w-3 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
                </div>

                {/* Ping 2: Blocked (Eastern EU) */}
                <div className="absolute top-[35%] left-[55%]">
                    <div className="h-3 w-3 bg-rose-500 rounded-full animate-ping absolute opacity-75 delay-300" />
                    <div className="h-3 w-3 bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.6)]" />
                </div>

                {/* Ping 3: Valid (Asia) */}
                <div className="absolute top-[45%] left-[75%]">
                    <div className="h-3 w-3 bg-blue-500 rounded-full animate-ping absolute opacity-75 delay-700" />
                    <div className="h-3 w-3 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
                </div>

                {/* Ping 4: Valid (South America) */}
                <div className="absolute top-[65%] left-[30%]">
                    <div className="h-3 w-3 bg-blue-500 rounded-full animate-ping absolute opacity-75 delay-1000" />
                    <div className="h-3 w-3 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
                </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-8 left-8 flex gap-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-blue-500" /> Valid
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-rose-500" /> Blocked
                </div>
            </div>

        </div>
    );
}
