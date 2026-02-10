"use client";

import React, { useState } from "react";
import {
    Search,
    MoreHorizontal,
    Filter,
    LayoutGrid,
    List
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface AdminCourse {
    id: string;
    title: string;
    code: string;
    teacherName: string;
    teacherId: string;
    capacity: number;
    enrolled: number;
    isPublished: boolean;
    status: string;
}

export function CourseList({ data }: { data: AdminCourse[] }) {
    const [search, setSearch] = useState("");

    const filtered = data.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.code.toLowerCase().includes(search.toLowerCase()) ||
        c.teacherName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex items-center justify-between">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <Input
                        placeholder="Search by title, code, or instructor..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 bg-white border-slate-200 rounded-full"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="border-slate-200 text-slate-600 rounded-full gap-2">
                        <Filter size={14} />
                        Department
                    </Button>
                    <Button variant="outline" className="border-slate-200 text-slate-600 rounded-full gap-2">
                        <Filter size={14} />
                        Status
                    </Button>
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="grid grid-cols-12 px-6 py-4 bg-slate-50/50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <div className="col-span-4">Course Identity</div>
                    <div className="col-span-3">Instructor</div>
                    <div className="col-span-3">Health</div>
                    <div className="col-span-1 text-center">Status</div>
                    <div className="col-span-1 text-end">Actions</div>
                </div>

                <div className="divide-y divide-slate-100">
                    {filtered.map((course) => (
                        <div key={course.id} className="grid grid-cols-12 items-center px-6 py-4 hover:bg-slate-50/80 transition-colors group">
                            {/* Identity */}
                            <div className="col-span-4 flex items-center gap-4">
                                <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs border border-indigo-100 uppercase">
                                    {course.code.split("-")[0]}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-800 text-sm">{course.title}</div>
                                    <div className="text-xs text-slate-500 font-mono">{course.code}</div>
                                </div>
                            </div>

                            {/* Instructor */}
                            <div className="col-span-3 flex items-center gap-3">
                                <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.teacherId}`}
                                    alt="avatar"
                                    className="w-8 h-8 rounded-full bg-slate-100"
                                />
                                <span className="text-sm font-medium text-slate-700">{course.teacherName}</span>
                            </div>

                            {/* Health (Capacity) */}
                            <div className="col-span-3 pr-8">
                                <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                                    <span>{course.enrolled}/{course.capacity} Seats</span>
                                    {/* <span>{Math.round((course.enrolled/course.capacity)*100)}%</span> */}
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className={cn("h-full rounded-full",
                                            course.enrolled >= course.capacity ? "bg-rose-500" : "bg-indigo-500"
                                        )}
                                        style={{ width: `${Math.min(100, (course.enrolled / course.capacity) * 100)}%` }}
                                    />
                                </div>
                            </div>

                            {/* Status */}
                            <div className="col-span-1 flex justify-center">
                                <span className={cn(
                                    "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border",
                                    course.isPublished
                                        ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                        : "bg-slate-100 text-slate-500 border-slate-200"
                                )}>
                                    {course.status}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="col-span-1 flex justify-end">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-600">
                                            <MoreHorizontal size={16} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Message Instructor</DropdownMenuItem>
                                        <DropdownMenuItem>View Curriculum</DropdownMenuItem>
                                        <DropdownMenuItem className="text-rose-600">Suspend Course</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))}

                    {filtered.length === 0 && (
                        <div className="p-12 text-center text-slate-400 text-sm">
                            No courses found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
