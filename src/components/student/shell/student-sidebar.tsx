"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BookOpen,
    FileText,
    Code2,
    Trophy,
    BarChart3,
    Settings,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
    { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
    { name: "My Courses", href: "/student/courses", icon: BookOpen },
    { name: "Assignments", href: "/student/assignments", icon: FileText },
    { name: "IDE / Playground", href: "/student/ide", icon: Code2 },
    { name: "Leaderboard", href: "/student/leaderboard", icon: Trophy },
    { name: "My Results", href: "/student/results", icon: BarChart3 },
];

export function StudentSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col h-full fixed left-0 top-0 z-40 hidden md:flex">
            {/* Logo Stub / Branding */}
            <div className="h-16 flex items-center px-6 border-b border-zinc-800">
                <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3 font-bold text-white">
                    P
                </div>
                <span className="font-bold text-lg tracking-tight text-white">Vidyaverse</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link key={item.href} href={item.href}>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start gap-3 h-11 transition-all duration-200",
                                    isActive
                                        ? "bg-zinc-900 text-white border-l-2 border-indigo-500 rounded-l-none"
                                        : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                                )}
                            >
                                <item.icon className={cn("h-4 w-4", isActive && "text-indigo-400")} />
                                <span>{item.name}</span>
                            </Button>
                        </Link>
                    )
                })}
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-zinc-800 space-y-2">
                <Link href="/student/settings">
                    <Button variant="ghost" className="w-full justify-start gap-3 text-zinc-400 hover:text-white">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                    </Button>
                </Link>
            </div>
        </aside>
    )
}
