import Link from "next/link";
import {
    Gamepad2,
    Zap,
    Trophy,
    Code2,
    User,
    LogOut,
    Home
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoutButton } from "@/components/auth/LogoutButton";

const routes = [
    {
        label: "Mission Control",
        icon: Home,
        href: "/student/dashboard",
        activeColor: "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]",
    },
    {
        label: "My Courses",
        icon: Zap,
        href: "/student/courses",
        activeColor: "text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]",
    },
    {
        label: "Arena (IDE)",
        icon: Code2,
        href: "/student/ide",
        activeColor: "text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]",
    },
    {
        label: "Leaderboard",
        icon: Trophy,
        href: "/student/leaderboard",
        activeColor: "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]",
    },
];

interface StudentNavProps {
    user: {
        name: string;
        email: string;
    }
}

export const StudentNav = ({ user }: StudentNavProps) => {
    return (
        <>
            {/* Desktop Rail (Left) */}
            <div className="hidden md:flex flex-col w-20 h-full fixed left-0 top-0 bg-[#F8FAFC] border-r border-slate-100 z-50 items-center py-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.02)]">
                <div className="mb-10 group cursor-pointer">
                    <div className="h-12 w-12 rounded-[20px] bg-gradient-to-tr from-[#5B86E5] to-[#36D1DC] flex items-center justify-center shadow-lg shadow-blue-500/20 transition-transform duration-500 group-hover:scale-110">
                        <Gamepad2 className="h-6 w-6 text-white" />
                    </div>
                </div>

                <div className="flex-1 w-full flex flex-col items-center gap-y-6 mt-4">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className="group flex flex-col items-center gap-y-1 w-full relative"
                        >
                            <div className="p-3.5 rounded-2xl transition-all duration-300 group-hover:bg-white group-hover:shadow-sm group-hover:ring-1 group-hover:ring-slate-200/50">
                                <route.icon className={cn("h-6 w-6 text-slate-400 transition-all duration-300",
                                    "group-hover:text-[#5B86E5]"
                                )} />
                            </div>
                            <span className="absolute left-full ml-4 bg-white border border-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap pointer-events-none z-50 shadow-xl">
                                {route.label}
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="mt-auto mb-6">
                    <LogoutButton className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 text-slate-600 w-full" />
                </div>
            </div>

            {/* Mobile Bottom Bar */}
            <div className="md:hidden fixed bottom-6 left-6 right-6 h-18 bg-white/90 backdrop-blur-xl border border-slate-100 rounded-[32px] z-50 flex items-center justify-around px-6 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)]">
                {routes.slice(0, 4).map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className="p-3 rounded-2xl transition-all hover:bg-slate-50"
                    >
                        <route.icon className="h-6 w-6 text-slate-400 hover:text-[#5B86E5] transition-colors" />
                    </Link>
                ))}
                <div className="p-1">
                    <LogoutButton className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 text-slate-600" />
                </div>
            </div>
        </>
    );
};
