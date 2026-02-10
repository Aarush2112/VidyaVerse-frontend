"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    BookOpen,
    Calendar,
    LineChart,
    Settings,
    Users,
    GraduationCap,
    ListChecks,
    Shield,
    LogOut,
    Code2,
    Trophy,
    Mic
} from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";

type UserRole = "student" | "teacher" | "admin";

interface KnowledgeSidebarProps {
    role: UserRole;
    user: { name: string; email: string; image?: string };
}

const LINKS = {
    student: [
        { label: "Home", icon: LayoutDashboard, href: "/student/dashboard" },
        { label: "AI Interview", icon: Mic, href: "/student/career/interview" },
        { label: "All courses", icon: BookOpen, href: "/student/courses" },
        { label: "Schedule", icon: Calendar, href: "/student/schedule" },
        { label: "My courses", icon: BookOpen, href: "/student/my-courses" },
        { label: "Arena", icon: Code2, href: "/student/ide" },
        { label: "Leaderboard", icon: Trophy, href: "/student/leaderboard" },
        { label: "Assignments", icon: ListChecks, href: "/student/assignments" },
        { label: "Statistics", icon: LineChart, href: "/student/stats" },
        { label: "Settings", icon: Settings, href: "/student/settings" },
    ],
    teacher: [
        { label: "Dashboard", icon: LayoutDashboard, href: "/teacher/dashboard" },
        { label: "My Courses", icon: BookOpen, href: "/teacher/courses" },
        { label: "Students", icon: Users, href: "/teacher/students" },
        { label: "Assignments", icon: ListChecks, href: "/teacher/assignments" },
        { label: "Schedule", icon: Calendar, href: "/teacher/schedule" },
        { label: "Gradebook", icon: GraduationCap, href: "/teacher/grades" },
        { label: "Settings", icon: Settings, href: "/teacher/settings" },
    ],
    admin: [
        { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
        { label: "Users", icon: Users, href: "/admin/users" },
        { label: "Courses", icon: BookOpen, href: "/admin/courses" },
        { label: "Security", icon: Shield, href: "/admin/security" },
        { label: "Settings", icon: Settings, href: "/admin/settings" },
    ]
};

export function KnowledgeSidebar({ role, user }: KnowledgeSidebarProps) {
    const pathname = usePathname();
    const links = LINKS[role] || [];

    const isActive = (href: string) => {
        if (href === "/student" || href === "/teacher" || href === "/admin") {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-transparent flex flex-col p-6 z-50 overflow-y-auto">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="h-10 w-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20">
                    <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-extrabold text-foreground tracking-tight">PoorakVerse</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                {links.map((link) => {
                    const active = isActive(link.href);
                    const Icon = link.icon;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3.5 rounded-full transition-all duration-300 group relative font-medium",
                                active
                                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-purple-500/30 translate-x-1"
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                            )}
                        >
                            <Icon
                                size={20}
                                className={cn(
                                    "transition-colors",
                                    active ? "text-white" : "text-muted-foreground group-hover:text-foreground"
                                )}
                            />
                            <span className="text-sm">{link.label}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* User Profile */}
            <div className="mt-auto">
                {/* <div className="bg-white/50 p-4 rounded-3xl mb-4 border border-white/50 backdrop-blur-sm">
                   Commented out redundant profile card for cleaner look as per ref image which typically puts profile in top bar or keeps sidebar clean
                </div> */}

                <div className="flex items-center gap-2 mb-2">
                    <ModeToggle />
                    <span className="text-sm font-medium text-muted-foreground">Theme</span>
                </div>
                <SignOutButton>
                    <button className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground transition-colors w-full text-left">
                        <LogOut size={20} />
                        <span className="text-sm font-medium">Log out</span>
                    </button>
                </SignOutButton>
            </div>
        </aside>
    );
}
