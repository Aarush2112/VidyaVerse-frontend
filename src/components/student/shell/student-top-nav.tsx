"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "./breadcrumbs";
import { LogoutButton } from "@/components/auth/LogoutButton";

export function StudentTopNav() {
    return (
        <header className="h-16 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-30 w-full">
            <div className="flex items-center">
                <Breadcrumbs />
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                </Button>

                <div className="h-8 w-px bg-zinc-800 mx-2" />

                <LogoutButton className="flex items-center gap-2 text-zinc-400 hover:text-white p-2 rounded-md" />
            </div>
        </header>
    )
}
