"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BookOpen,
    Users,
    CheckSquare,
    GraduationCap,
    Calendar,
    Circle,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserButton, SignOutButton } from "@clerk/nextjs";
import { motion } from "framer-motion";

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/teacher/dashboard",
    },
    {
        label: "Courses",
        icon: BookOpen,
        href: "/teacher/courses",
    },
    {
        label: "Assignments",
        icon: CheckSquare,
        href: "/teacher/assignments",
    },
    {
        label: "Students",
        icon: Users,
        href: "/teacher/students",
    },
    {
        label: "Grading",
        icon: GraduationCap,
        href: "/teacher/grading",
    },
    {
        label: "Schedule",
        icon: Calendar,
        href: "/teacher/schedule",
    },
];

interface TeacherSidebarProps {
    user: {
        name: string;
        email: string;
        role: string;
    }
}

export const TeacherSidebar = ({ user }: TeacherSidebarProps) => {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full bg-background border-r border-border w-20 hover:w-64 fixed left-0 top-0 bottom-0 z-50 transition-all duration-500 group/sidebar overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.02)]">
            <div className="px-4 py-10 flex-1 flex flex-col">
                <Link href="/teacher/dashboard" className="flex items-center gap-4 mb-14 px-2">
                    <div className="relative flex-none w-10 h-10 bg-gradient-to-tr from-[#5B86E5] to-[#36D1DC] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex flex-col opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300">
                        <h1 className="text-xl font-bold text-foreground tracking-tight leading-none">
                            Knowledge
                        </h1>
                        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-1">PoorakVerse</span>
                    </div>
                </Link>

                <nav className="space-y-3 flex-1">
                    {routes.map((route) => {
                        const isActive = pathname === route.href;
                        return (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "text-sm group flex p-3.5 w-full justify-start font-semibold cursor-pointer transition-all relative rounded-2xl",
                                    isActive
                                        ? "text-primary bg-card shadow-sm ring-1 ring-border"
                                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                )}
                            >
                                <div className="flex items-center flex-1 z-10 gap-4">
                                    <route.icon className={cn(
                                        "h-5 w-5 flex-none transition-colors",
                                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                    )} />
                                    <span className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                        {route.label}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="px-4 py-8 mt-auto flex flex-col gap-6">
                <div className="flex items-center gap-4 px-3 p-4 bg-card/50 rounded-3xl border border-border shadow-sm transition-all hover:shadow-md cursor-pointer group/user">
                    <div className="flex-none">
                        <UserButton
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: "h-10 w-10 shadow-sm"
                                }
                            }}
                        />
                    </div>
                    <div className="flex flex-col opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 overflow-hidden ml-1">
                        <p className="text-sm font-bold text-foreground truncate">{user.name}</p>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Faculty Member</p>
                    </div>
                </div>

                <SignOutButton>
                    <div className="flex items-center gap-2 px-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group/logout">
                        <LogOut className="h-4 w-4" />
                        <span className="text-xs font-bold opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300">Sign Out</span>
                    </div>
                </SignOutButton>
            </div>
        </div>
    );
};
