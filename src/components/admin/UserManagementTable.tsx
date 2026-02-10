"use client";

import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CandyRoleBadge } from "./CandyRoleBadge";

// Mock Data
const MOCK_USERS = [
    { id: 1, name: "Sarah Chen", email: "sarah@university.edu", role: "STUDENT", status: "Active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
    { id: 2, name: "Dr. A. Gupta", email: "gupta@university.edu", role: "TEACHER", status: "Active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gupta" },
    { id: 3, name: "Admin System", email: "admin@lms.hq", role: "ADMIN", status: "Active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" },
    { id: 4, name: "Mike Ross", email: "mike.ross@student.edu", role: "STUDENT", status: "Inactive", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" },
    { id: 5, name: "Elena Fisher", email: "elena@history.edu", role: "TEACHER", status: "Active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" },
];

export function UserManagementTable() {
    return (
        <div className="bg-white rounded-[32px] p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">User Directory</h2>
                    <p className="text-xs font-medium text-slate-400 mt-1">Manage roles and permissions</p>
                </div>
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="h-10 px-4 rounded-full bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64 transition-all"
                    />
                    <Button variant="outline" className="rounded-full border-slate-200 text-slate-600 hover:bg-slate-50">Filter</Button>
                </div>
            </div>

            {/* Header Row */}
            <div className="grid grid-cols-12 px-6 pb-4 border-b border-slate-50 mb-4">
                <div className="col-span-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">User Identity</div>
                <div className="col-span-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Role</div>
                <div className="col-span-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</div>
                <div className="col-span-2 text-right text-[10px] font-bold uppercase tracking-widest text-slate-400">Actions</div>
            </div>

            {/* List Rows */}
            <div className="space-y-3">
                {MOCK_USERS.map((user) => (
                    <UserRowCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
}

function UserRowCard({ user }: { user: any }) {
    const [role, setRole] = useState(user.role);

    const toggleRole = () => {
        setRole((prev: string) => prev === "STUDENT" ? "TEACHER" : "STUDENT");
    };

    return (
        <div className="group flex items-center bg-white border border-slate-50 rounded-[20px] p-4 shadow-sm hover:shadow-md hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-200">
            <div className="grid grid-cols-12 w-full items-center">

                {/* User Identity Column */}
                <div className="col-span-5 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-slate-100 p-0.5 ring-2 ring-white shadow-sm overflow-hidden shrink-0">
                        <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0">
                        <div className="font-bold text-slate-800 text-sm truncate">{user.name}</div>
                        <div className="text-xs text-slate-400 font-medium truncate">{user.email}</div>
                    </div>
                </div>

                {/* Role Column */}
                <div className="col-span-3">
                    <CandyRoleBadge
                        role={role}
                        onClick={role === "ADMIN" ? undefined : toggleRole}
                    />
                </div>

                {/* Status Column */}
                <div className="col-span-2">
                    <span className={cn(
                        "inline-flex items-center gap-1.5 text-xs font-bold",
                        user.status === "Active" ? "text-emerald-600" : "text-slate-400"
                    )}>
                        <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", user.status === "Active" ? "bg-emerald-500" : "bg-slate-300")} />
                        {user.status}
                    </span>
                </div>

                {/* Actions Column */}
                <div className="col-span-2 flex justify-end">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 group-hover:text-slate-600 hover:bg-slate-200/50 rounded-full transition-colors opacity-0 group-hover:opacity-100">
                        <MoreHorizontal size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
