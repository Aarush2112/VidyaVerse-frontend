"use client";

import { motion } from "framer-motion";
import { Course } from "@/lib/store/useTeacherCourseStore";
import { Users, MoreHorizontal, TrendingUp, BookOpen, Edit, Copy, Archive } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CourseCardProps {
    course: Course;
    onDuplicate: (id: string) => void;
    onArchive: (id: string) => void;
}

const gradientMap: Record<string, string> = {
    'gradient-violet': 'from-violet-900 via-purple-800 to-indigo-900',
    'gradient-emerald': 'from-emerald-900 via-teal-800 to-green-900',
    'gradient-rose': 'from-rose-900 via-pink-800 to-red-900',
    'gradient-orange': 'from-orange-900 via-amber-800 to-yellow-900',
    'gradient-dark': 'from-slate-900 via-gray-800 to-zinc-900',
};

import { useRouter } from "next/navigation";

export const CourseCard = ({ course, onDuplicate, onArchive }: CourseCardProps) => {
    const router = useRouter();
    const isDraft = course.status === 'DRAFT';
    const isArchived = course.status === 'ARCHIVED';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className={cn(
                "group relative bg-white rounded-[24px] overflow-hidden shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] border transition-all duration-300",
                isDraft ? "border-2 border-dashed border-violet-200 bg-violet-50/10" : "border-slate-100"
            )}
        >
            {/* Top Half: Visual */}
            <div className={cn("h-36 w-full relative p-4 flex flex-col justify-between transition-colors",
                isDraft ? "bg-violet-50" : `bg-gradient-to-br ${gradientMap[course.thumbnail] || gradientMap['gradient-violet']}`
            )}>
                {/* Badges */}
                <div className="flex justify-between items-start z-10">
                    <span className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                        course.status === 'LIVE' ? "bg-emerald-400/20 border-emerald-400/30 text-emerald-100" :
                            isDraft ? "bg-slate-200 border-slate-300 text-slate-500" :
                                "bg-rose-400/20 border-rose-400/30 text-rose-100" // Archived
                    )}>
                        {course.status}
                    </span>
                    <span className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md border border-white/20",
                        isDraft ? "text-slate-500 bg-slate-200/50" : "text-white"
                    )}>
                        {course.code}
                    </span>
                </div>

                {!isDraft && (
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
                )}
            </div>

            {/* Bottom Half: Data */}
            <div className="p-5">
                <h3 className={cn("font-bold text-lg mb-1 line-clamp-2 leading-tight group-hover:text-violet-700 transition-colors",
                    isDraft ? "text-slate-500 italic" : "text-slate-900"
                )}>
                    {course.title}
                </h3>

                {/* Metrics */}
                {!isDraft && !isArchived ? (
                    <div className="mt-4 space-y-3">
                        {/* Syllabus Progress */}
                        <div>
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                <span>Syllabus</span>
                                <span>{course.stats.syllabusCompletion}% Complete</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${course.stats.syllabusCompletion}%` }}
                                    className="h-full bg-cyan-400 rounded-full"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-slate-400">Avg. Grade</span>
                                <div className="flex items-center gap-1 text-slate-900 font-bold">
                                    <TrendingUp size={14} className="text-emerald-500" />
                                    {course.stats.avgGrade}%
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] uppercase font-bold text-slate-400">Enrolled</span>
                                <div className="flex items-center gap-1 text-slate-900 font-bold">
                                    <Users size={14} className="text-violet-500" />
                                    {course.stats.enrolled}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mt-4 h-[84px] flex items-center justify-center border-t border-slate-100 border-dashed">
                        <p className="text-xs text-slate-400 font-medium">
                            {isDraft ? "Course setup in progress..." : "This course is archived."}
                        </p>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between items-center">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-6 w-6 rounded-full border-2 border-white bg-slate-200" />
                        ))}
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-slate-100 data-[state=open]:bg-slate-100">
                                <MoreHorizontal size={16} className="text-slate-400" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px] rounded-xl">
                            <DropdownMenuItem className="gap-2" onClick={() => router.push(`/teacher/courses/${course.id}`)}>
                                <Edit size={14} /> Edit Course
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onDuplicate(course.id)} className="gap-2">
                                <Copy size={14} /> Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onArchive(course.id)} className="gap-2 text-rose-600 focus:text-rose-600 focus:bg-rose-50">
                                <Archive size={14} /> Archive
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Draft Overlay Hover */}
            {isDraft && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                        onClick={() => router.push(`/teacher/courses/${course.id}`)}
                        className="rounded-full bg-violet-600 hover:bg-violet-700 text-white shadow-lg"
                    >
                        Continue Setup
                    </Button>
                </div>
            )}
        </motion.div>
    );
};
