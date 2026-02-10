"use client"

import * as React from "react"
import {
    BookOpen,
    Bot,
    Code2,
    Command,
    Frame,
    LifeBuoy,
    Map,
    PieChart,
    Send,
    Settings2,
    SquareTerminal,
    Trophy,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"

const data = {
    user: {
        name: "Student",
        email: "student@poorakverse.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Learning",
            url: "#",
            icon: BookOpen,
            isActive: true,
            items: [
                {
                    title: "My Courses",
                    url: "/student/courses",
                },
                {
                    title: "Assignments",
                    url: "/student/assignments",
                },
            ],
        },
        {
            title: "Performance",
            url: "#",
            icon: Trophy,
            items: [
                {
                    title: "Leaderboard",
                    url: "/student/leaderboard",
                },
                {
                    title: "My Stats",
                    url: "/student/stats",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Support",
            url: "#",
            icon: LifeBuoy,
        },
        {
            title: "Feedback",
            url: "#",
            icon: Send,
        },
    ],
    projects: [
        {
            name: "C++ Masterclass",
            url: "#",
            icon: Frame,
        },
        {
            name: "Data Structures",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Web Dev Bootcamp",
            url: "#",
            icon: Map,
        },
    ],
    admin: [
        {
            title: "Admin",
            url: "/admin",
            icon: Settings2,
            items: [
                {
                    title: "Overview",
                    url: "/admin",
                },
                {
                    title: "User Management",
                    url: "/admin/users",
                },
                {
                    title: "Courses",
                    url: "/admin/courses",
                },
            ],
        },
    ]
}


interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    user: {
        name: string
        email: string
        avatar: string
        role: "STUDENT" | "TEACHER" | "ADMIN"
    }
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {

    return (
        <Sidebar variant="sidebar" {...props} className="border-none bg-neu-base shadow-[5px_0_15px_rgba(163,177,198,0.3)] z-50">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <BookOpen className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold text-foreground">Frappe LMS</span>
                                    <span className="truncate text-xs text-muted-foreground">Clone v1.0</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
                {user.role === 'ADMIN' && (
                    <NavMain items={data.admin} />
                )}
            </SidebarContent>
            <SidebarFooter>
                <div className="p-2 flex justify-between items-center gap-2">
                    <NavUser user={user} />
                    <ModeToggle />
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
