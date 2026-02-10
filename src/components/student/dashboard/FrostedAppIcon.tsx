"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface FrostedAppIconProps {
    icon: React.ReactElement;
    label: string;
    href: string;
    colorClass: string; // e.g. "bg-purple-100 text-purple-600"
}

export function FrostedAppIcon({ icon, label, href, colorClass }: FrostedAppIconProps) {
    return (
        <Link
            href={href}
            className="group flex flex-col items-center justify-center gap-4 bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full w-full"
        >
            <div className={cn(
                "h-16 w-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                colorClass
            )}>
                {React.cloneElement(icon as React.ReactElement, { size: 32 } as any)}
            </div>
            <span className="font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                {label}
            </span>
        </Link>
    );
}
