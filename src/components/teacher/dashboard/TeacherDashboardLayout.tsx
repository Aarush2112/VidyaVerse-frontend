"use client";

import React from "react";
import { KnowledgeSidebar } from "@/components/shared/shell/KnowledgeSidebar";
import { Search, Bell, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TeacherDashboardLayoutProps {
    children: React.ReactNode;
    user: { name: string; email: string; avatar?: string };
}

export const TeacherDashboardLayout = ({ children, user }: TeacherDashboardLayoutProps) => {
    return (
        <div className="min-h-screen bg-background flex font-sans text-foreground selection:bg-primary/20">
            {/* Unified Sidebar */}
            <KnowledgeSidebar role="teacher" user={user} />

            {/* Main Content Wrapper */}
            <main className="pl-64 flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-20 bg-background/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-8 sticky top-0 z-40">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold text-foreground tracking-tight">Spring 2026 Semester</h1>
                        <p className="text-xs font-medium text-muted-foreground">Teacher Dashboard</p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <div className="relative group hidden md:block">
                            <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground group-focus-within:text-violet-500 transition-colors" />
                            <input
                                placeholder="Search students, courses..."
                                className="h-10 w-64 bg-muted border-none rounded-full pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all font-medium"
                            />
                        </div>

                        {/* Quick Actions */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-5 h-10 shadow-lg shadow-violet-500/20 font-bold transition-transform hover:scale-105">
                                    <Plus className="h-4 w-4 mr-2" /> CREATE
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-popover/90 backdrop-blur-xl border-border p-2 rounded-2xl shadow-soft-xl">
                                <DropdownMenuLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 py-1">New Item</DropdownMenuLabel>
                                <DropdownMenuItem className="rounded-lg font-medium cursor-pointer text-foreground focus:bg-violet-50 focus:text-violet-700 dark:focus:bg-violet-900/50 dark:focus:text-violet-300">📜 Assignment</DropdownMenuItem>
                                <DropdownMenuItem className="rounded-lg font-medium cursor-pointer text-foreground focus:bg-violet-50 focus:text-violet-700 dark:focus:bg-violet-900/50 dark:focus:text-violet-300">📢 Announcement</DropdownMenuItem>
                                <DropdownMenuItem className="rounded-lg font-medium cursor-pointer text-foreground focus:bg-violet-50 focus:text-violet-700 dark:focus:bg-violet-900/50 dark:focus:text-violet-300">🗓️ Event</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Notifications */}
                        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 bg-card text-muted-foreground hover:text-violet-600 hover:bg-violet-50 relative border border-border shadow-sm">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-rose-500 rounded-full border-2 border-background" />
                        </Button>

                        {/* Profile Avatar */}
                        <Avatar className="h-10 w-10 border-2 border-background shadow-sm cursor-pointer hover:scale-105 transition-transform">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-900 dark:to-fuchsia-900 text-violet-600 dark:text-violet-200 font-bold">
                                {user.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </header>

                {/* Content Body */}
                <div className="flex-1 p-8 overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
