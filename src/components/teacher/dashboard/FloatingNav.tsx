"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Calendar,
    Users,
    BookOpen,
    ClipboardList,
    BarChart3,
    Settings,
    Search,
    User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
    { name: "Studio", icon: LayoutDashboard, href: "/teacher/dashboard" },
    { name: "Schedule", icon: Calendar, href: "/teacher/schedule" },
    { name: "Registry", icon: Users, href: "/teacher/students" },
    { name: "Curriculum", icon: BookOpen, href: "/teacher/courses" },
    { name: "Assessments", icon: ClipboardList, href: "/teacher/assignments" },
    { name: "Analytics", icon: BarChart3, href: "/teacher/grading" },
];

export function FloatingNav() {
    const pathname = usePathname();

    return (
        <nav className="w-20 m-4 rounded-[40px] border border-slate-100 bg-[#F8FAFC] h-[calc(100vh-2rem)] flex flex-col items-center py-8 space-y-8 soft-shadow-md z-50 transition-all duration-700 relative overflow-hidden">
            {/* Logo / Brand */}
            <div className="relative group">
                <div className="h-12 w-12 rounded-[20px] bg-gradient-to-tr from-[#5B86E5] to-[#36D1DC] text-white flex items-center justify-center shadow-lg shadow-blue-500/20 transition-transform duration-500 group-hover:scale-110">
                    <span className="font-serif italic font-black text-xl select-none">P</span>
                </div>
            </div>

            <button className="h-10 w-10 flex items-center justify-center rounded-2xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-all mb-4">
                <Search className="h-4 w-4" />
            </button>

            <div className="flex-1 flex flex-col gap-5 relative z-10 w-full px-4 text-center">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href} className="relative flex justify-center">
                            <div className="group relative">
                                <div className={cn(
                                    "flex items-center justify-center h-12 w-12 rounded-2xl transition-all duration-500 relative z-10",
                                    isActive
                                        ? "text-[#5B86E5] bg-white shadow-sm ring-1 ring-slate-200/50 scale-105"
                                        : "text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
                                )}>
                                    <item.icon className={cn("h-5 w-5 transition-transform duration-500")} />
                                </div>

                                {/* Tooltip */}
                                <div className="absolute left-full ml-6 px-3 py-1.5 rounded-xl bg-white border border-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-500 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all pointer-events-none z-[60] whitespace-nowrap shadow-xl">
                                    {item.name}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="flex flex-col gap-6 pt-6 border-t border-slate-100 relative z-10 w-full items-center">
                <button className="h-10 w-10 flex items-center justify-center rounded-2xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-all">
                    <Settings className="h-5 w-5" />
                </button>

                <div className="h-10 w-10 rounded-full border-2 border-slate-100 overflow-hidden hover:border-[#5B86E5]/30 transition-all cursor-pointer shadow-sm">
                    <div className="h-full w-full bg-slate-100 flex items-center justify-center">
                        <User className="h-4 w-4 text-slate-400" />
                    </div>
                </div>
            </div>
        </nav>
    );
}
