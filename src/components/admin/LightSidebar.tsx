"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    BookOpen,
    Settings,
    Shield,
    LogOut,
    Bell
} from "lucide-react";

const NAV_ITEMS = [
    { label: "Overview", icon: LayoutDashboard, href: "/admin" },
    { label: "Users", icon: Users, href: "/admin/users" },
    { label: "Courses", icon: BookOpen, href: "/admin/courses" },
    { label: "Security", icon: Shield, href: "/admin/security" },
    { label: "Settings", icon: Settings, href: "/admin/settings" },
];

import { useClerk, SignOutButton } from "@clerk/nextjs";

export function LightSidebar() {
    const pathname = usePathname();

    return (
        <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-100 flex flex-col z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
            {/* Logo Area */}
            <div className="p-8 flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <Shield size={20} fill="currentColor" className="opacity-90" />
                </div>
                <span className="font-poppins font-bold text-xl text-slate-800 tracking-tight">AdminHQ</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-all duration-200 group",
                                isActive
                                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border border-blue-100 shadow-sm"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <item.icon
                                size={18}
                                strokeWidth={isActive ? 2.5 : 2}
                                className={cn("transition-transform group-hover:scale-110", isActive && "fill-blue-200")}
                            />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 mt-auto">
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-3 mb-4 cursor-pointer hover:bg-slate-100 transition-colors">
                    <div className="h-10 w-10 rounded-full bg-white shadow-sm overflow-hidden border border-slate-100">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" className="h-full w-full object-cover" />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-800">System Admin</div>
                        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Superuser</div>
                    </div>
                </div>

                <SignOutButton redirectUrl="/">
                    <button className="flex items-center gap-3 px-4 py-3 w-full rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors text-sm font-medium">
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </SignOutButton>
            </div>
        </div>
    );
}
