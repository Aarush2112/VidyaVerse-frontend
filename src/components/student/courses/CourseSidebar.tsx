"use client";

// import { Chapter, Course, Lesson, UserProgress } from "@prisma/client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Check, Lock, Play } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

// Local interfaces to bypass broken Prisma generation
interface CourseSidebarProps {
    course: any; // Explicit any for now to stop the build bleed
    progressCount: number;
}

export const CourseSidebar = ({ course, progressCount }: CourseSidebarProps) => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="h-full border-r border-white/20 flex flex-col overflow-y-auto bg-white/30 backdrop-blur-xl shadow-[inset_-10px_0_20px_rgba(255,255,255,0.2)]">
            {/* Header / Progress */}
            <div className="p-8 pb-6 border-b border-white/20 sticky top-0 bg-white/40 backdrop-blur-2xl z-10 transition-all shadow-sm">
                <h1 className="font-bold text-lg text-slate-800 leading-tight mb-4">{course.title}</h1>

                <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-white/50 rounded-full overflow-hidden border border-white/40">
                        <div
                            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                            style={{ width: `${progressCount}%` }}
                        />
                    </div>
                    <span className="text-xs font-bold text-slate-500 min-w-[3ch] text-right">{Math.round(progressCount)}%</span>
                </div>
            </div>

            {/* Chapters */}
            <div className="flex-1 py-4">
                <Accordion type="multiple" defaultValue={course.chapters.map((c: any) => c.id)} className="w-full space-y-4 px-4">
                    {course.chapters.map((chapter: any) => (
                        <AccordionItem key={chapter.id} value={chapter.id} className="border-none">
                            <AccordionTrigger className="px-4 py-3 hover:bg-white/40 hover:no-underline rounded-xl group transition-all data-[state=open]:bg-white/20">
                                <span className="font-bold text-slate-700 text-sm group-hover:text-violet-700 transition-colors text-left uppercase tracking-tight">
                                    {chapter.title}
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pb-0">
                                <div className="flex flex-col gap-1 pl-2">
                                    {chapter.lessons.map((lesson: any) => {
                                        const isActive = pathname?.includes(lesson.id);
                                        const isCompleted = lesson.userProgress?.[0]?.isCompleted;
                                        const isLocked = false;

                                        return (
                                            <button
                                                key={lesson.id}
                                                onClick={() => router.push(`/student/courses/${course.id}/lessons/${lesson.id}`)}
                                                className={cn(
                                                    "relative flex items-center gap-x-3 px-4 py-3 text-sm font-medium transition-all rounded-xl w-full group overflow-hidden border border-transparent",
                                                    isActive
                                                        ? "text-violet-700 bg-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-white/50 backdrop-blur-md"
                                                        : "text-slate-500 hover:text-slate-700 hover:bg-white/40 hover:shadow-sm hover:border-white/30"
                                                )}
                                            >
                                                {/* Active Indicator Line */}
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="activeLesson"
                                                        className="absolute left-0 top-3 bottom-3 w-1 bg-violet-500 rounded-r-full shadow-[0_0_8px_rgba(139,92,246,0.4)]"
                                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                    />
                                                )}

                                                <div className="shrink-0 w-6 flex justify-center z-10">
                                                    {isLocked ? (
                                                        <Lock className="w-4 h-4 text-slate-300" />
                                                    ) : isCompleted ? (
                                                        <div className="w-5 h-5 rounded-full bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center">
                                                            <Check className="w-3 h-3 text-emerald-600" strokeWidth={3} />
                                                        </div>
                                                    ) : (
                                                        <div className={cn(
                                                            "w-5 h-5 rounded-full flex items-center justify-center border transition-colors",
                                                            isActive ? "border-violet-300 bg-violet-50" : "border-slate-300 group-hover:border-violet-300 bg-white/50"
                                                        )}>
                                                            <Play className={cn(
                                                                "w-2 h-2 ml-0.5 transition-colors",
                                                                isActive ? "fill-violet-600 text-violet-600" : "fill-slate-300 text-slate-300 group-hover:fill-violet-400 group-hover:text-violet-400"
                                                            )} />
                                                        </div>
                                                    )}
                                                </div>

                                                <span className={cn(
                                                    "line-clamp-1 text-left z-10 transition-colors",
                                                    isCompleted && !isActive && "text-slate-400 line-through decoration-slate-300 decoration-2"
                                                )}>
                                                    {lesson.title}
                                                </span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}
