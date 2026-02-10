"use client";

import { ReactNode } from "react";

interface DashboardLayoutProps {
    children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30">
            {/* 1. Deep Space Radial Mesh Gradient */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-slate-950" />
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/20 blur-[120px]" />
                <div className="absolute top-[30%] left-[50%] w-[40%] h-[40%] rounded-full bg-indigo-900/10 blur-[100px] translate-x-[-50%]" />

                {/* Starfield / Noise Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 max-w-[1800px] mx-auto p-6 md:p-12">
                {children}
            </div>

            {/* Global Overlay Vignette */}
            <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)] z-20" />
        </div>
    )
}
