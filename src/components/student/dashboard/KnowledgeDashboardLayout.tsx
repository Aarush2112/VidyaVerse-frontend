"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Search, Bell } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { toast } from "sonner";

interface KnowledgeDashboardLayoutProps {
    children: React.ReactNode;
    rightSidebar?: React.ReactNode;
    hideRightSidebar?: boolean;
    className?: string;
}

export function KnowledgeDashboardLayout({ children, rightSidebar, hideRightSidebar = false, className }: KnowledgeDashboardLayoutProps) {
    return (
        <div className={cn("flex flex-col xl:flex-row h-full min-h-screen bg-[#EBF1F9] p-4 md:p-8 gap-8", className)}>
            {/* Main Content Area (Left/Center) */}
            <div className="flex-1 flex flex-col gap-8 min-w-0">

                {/* Header (Greeting & Balance) */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 font-poppins">Home</h1>
                        <p className="text-slate-500">Welcome back!</p>
                    </div>
                </header>

                <main className="flex-1 space-y-8">
                    {children}
                </main>
            </div>

            {/* Right Sidebar (Fixed width on desktop) */}
            {!hideRightSidebar && (
                <aside className="w-full xl:w-[380px] flex flex-col gap-8 shrink-0">
                    {/* Search Bar - Visual Match */}
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full h-14 pl-12 pr-4 bg-white/50 border-none rounded-[20px] text-slate-700 placeholder:text-slate-400 focus:ring-0 focus:bg-white transition-all shadow-sm"
                            />
                        </div>
                        <button
                            className="h-14 w-14 bg-white rounded-[20px] flex items-center justify-center text-slate-900 shadow-sm hover:scale-105 transition-transform"
                            onClick={() => toast.info("No new notifications")}
                        >
                            <Bell size={20} fill="black" className="text-black" />
                            <span className="absolute top-4 right-4 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                        </button>

                        <div className="h-14 w-14 bg-slate-900 rounded-[20px] flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform overflow-hidden font-sans">
                            <UserButton
                                appearance={{
                                    elements: {
                                        userButtonAvatarBox: "h-14 w-14 rounded-none", // Try to match the square look or fill the container
                                        userButtonTrigger: "h-14 w-14 rounded-[20px] focus:shadow-none",
                                        avatarBox: "h-10 w-10"
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        {rightSidebar}
                    </div>
                </aside>
            )}
        </div>
    );
}
