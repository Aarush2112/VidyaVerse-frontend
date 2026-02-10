"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface QuickLaunchCardProps {
    title: string;
    description: string;
    icon: React.ElementType;
    color: string; // e.g., "text-purple-600"
    bg: string; // e.g., "bg-purple-50"
    href: string;
    delay?: number;
}

export function QuickLaunchCard({ title, description, icon: Icon, color, bg, href, delay = 0 }: QuickLaunchCardProps) {
    return (
        <Link href={href} className="block group">
            <div className="h-full bg-white rounded-[32px] p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-5">
                    <div className={cn(
                        "h-14 w-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300",
                        bg, color
                    )}>
                        <Icon size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{title}</h4>
                        <p className="text-xs font-medium text-slate-400">{description}</p>
                    </div>
                </div>

                <div className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center transition-colors group-hover:bg-slate-50",
                    "text-slate-300 group-hover:text-blue-500"
                )}>
                    <ArrowUpRight size={20} />
                </div>
            </div>
        </Link>
    );
}
