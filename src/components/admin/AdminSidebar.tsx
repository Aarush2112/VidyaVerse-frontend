"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    ShieldAlert,
    Server,
    Wallet,
    Settings,
    LogOut,
    GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "User Management", href: "/admin/users", icon: Users },
    { label: "Courses & Content", href: "/admin/courses", icon: GraduationCap },
    { label: "Finance", href: "/admin/finance", icon: Wallet },
    { label: "System Health", href: "/admin/health", icon: Server },
    { label: "Audit Logs", href: "/admin/audit", icon: ShieldAlert },
    { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-[280px] bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 z-50">
            {/* Header */}
            <div className="h-16 flex items-center px-6 border-b border-slate-800/50">
                <div className="font-bold text-lg text-white tracking-tight flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-violet-600 flex items-center justify-center text-[10px]">P</div>
                    PoorakVerse <span className="text-violet-400 text-[10px] px-1.5 py-0.5 bg-violet-500/10 rounded border border-violet-500/20">ADMIN</span>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 py-6 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                                isActive
                                    ? "bg-violet-600 text-white shadow-lg shadow-violet-900/20"
                                    : "hover:bg-slate-800/50 hover:text-white"
                            )}
                        >
                            <item.icon size={18} className={cn("transition-colors", isActive ? "text-white" : "text-slate-500 group-hover:text-slate-400")} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800/50">
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
                    <div className="text-xs font-bold text-slate-400 mb-2">MAINTENANCE WINDOW</div>
                    <div className="text-[10px] text-slate-500 mb-3">Scheduled for Sunday, 2 AM EST.</div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="w-[80%] h-full bg-emerald-500/50" />
                    </div>
                </div>
            </div>
        </aside>
    );
}
