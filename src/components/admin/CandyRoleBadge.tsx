"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Shield, GraduationCap, User } from "lucide-react";

interface CandyRoleBadgeProps {
    role: "ADMIN" | "TEACHER" | "STUDENT";
    onClick?: () => void;
}

export function CandyRoleBadge({ role, onClick }: CandyRoleBadgeProps) {
    return (
        <span
            onClick={onClick}
            className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide cursor-pointer select-none transition-all hover:scale-105 shadow-sm hover:shadow-md",
                role === "ADMIN" && "bg-purple-100 text-purple-700 shadow-purple-500/10 cursor-default",
                role === "TEACHER" && "bg-blue-100 text-blue-700 shadow-blue-500/10",
                role === "STUDENT" && "bg-slate-100 text-slate-600 shadow-slate-500/10"
            )}
        >
            {role === "ADMIN" && <Shield size={12} fill="currentColor" className="opacity-50" />}
            {role === "TEACHER" && <GraduationCap size={12} fill="currentColor" className="opacity-50" />}
            {role === "STUDENT" && <User size={12} fill="currentColor" className="opacity-50" />}
            {role}
        </span>
    );
}
