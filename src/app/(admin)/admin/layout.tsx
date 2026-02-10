import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const user = await db.user.findUnique({
        where: { clerkId: userId }
    });

    if (!user || user.role !== "ADMIN") {
        redirect("/access-denied?source=admin_layout&role=" + (user?.role || "none"));
    }
    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-screen transition-all duration-300 ml-[280px]"> {/* Fixed ml matching sidebar width */}

                {/* Top Nav (Glass) */}
                <header className="sticky top-0 z-40 w-full h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-8 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        SYSTEM: ONLINE
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                            <div className="text-xs font-bold text-slate-900">SUPER_ADMIN</div>
                            <div className="text-[10px] text-slate-500 font-mono">127.0.0.1</div>
                        </div>
                        <ModeToggle />
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </header>

                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
