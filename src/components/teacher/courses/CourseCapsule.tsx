"use client";

import { motion } from "framer-motion";
import { BookOpen, MoreVertical, Edit, FileBarChart, Archive, Users, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export interface CourseData {
    id: string;
    title: string;
    code: string;
    batches: string[];
    coverImage?: string;
    syllabusProgress: number;
    classAverageHistory: { value: number }[]; // For sparkline
    studentCount: number;
    isActive: boolean;
    status: "Live" | "Draft" | "Archived";
}

interface CourseCapsuleProps {
    course: CourseData;
}

export function CourseCapsule({ course }: CourseCapsuleProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="group relative w-full bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden shadow-lg hover:shadow-indigo-500/20 hover:border-indigo-500/30 transition-all duration-300 flex flex-col h-[380px]"
        >
            {/* Visual Header (16:9) */}
            <div className="relative h-44 w-full overflow-hidden">
                {/* Live Status Badge */}
                {course.isActive && (
                    <div className="absolute top-3 right-3 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-green-500/30">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-green-400">Live</span>
                    </div>
                )}

                {/* Cover Image / Gradient */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                        backgroundImage: course.coverImage
                            ? `url(${course.coverImage})`
                            : 'linear-gradient(to bottom right, #3f3f46, #18181b)'
                    }}
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />

                {/* Code & Batches positioned over image */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end z-10">
                    <span className="font-mono text-xs font-bold text-zinc-300 bg-black/50 backdrop-blur-md px-2 py-1 rounded border border-white/10">
                        {course.code}
                    </span>
                    <div className="flex gap-1">
                        {course.batches.map((batch) => (
                            <Badge key={batch} variant="secondary" className="bg-zinc-100/10 text-zinc-200 border-white/10 text-[10px] hover:bg-indigo-500/20">
                                {batch}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            {/* Body Content */}
            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-zinc-100 tracking-tight mb-4 group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {course.title}
                </h3>

                {/* Performance Strip */}
                <div className="flex-1 space-y-4">
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-medium text-zinc-400">
                            <span>Syllabus Progress</span>
                            <span className="text-indigo-400">{course.syllabusProgress}%</span>
                        </div>
                        <Progress value={course.syllabusProgress} className="h-1.5 bg-zinc-800" indicatorClassName="bg-indigo-500" />
                    </div>

                    {/* Mini Sparkline + Stat */}
                    <div className="flex items-center justify-between pt-2">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Avg. Grade</span>
                            <span className="text-xl font-mono text-zinc-200">
                                {course.classAverageHistory[course.classAverageHistory.length - 1]?.value || 0}%
                            </span>
                        </div>
                        <div className="h-10 w-24">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={course.classAverageHistory}>
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#6366f1"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center text-zinc-500 text-xs">
                        <Users className="h-3.5 w-3.5 mr-1.5" />
                        <span>{course.studentCount} Students</span>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-zinc-950 border-white/10 text-zinc-300">
                            <DropdownMenuItem className="cursor-pointer focus:bg-indigo-500/10 focus:text-indigo-400">
                                <Edit className="mr-2 h-4 w-4" /> Edit Syllabus
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer focus:bg-indigo-500/10 focus:text-indigo-400">
                                <FileBarChart className="mr-2 h-4 w-4" /> View Gradebook
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-rose-400 focus:text-rose-400 focus:bg-rose-500/10 cursor-pointer">
                                <Archive className="mr-2 h-4 w-4" /> Archive Course
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </motion.div>
    );
}
