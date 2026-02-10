import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { VideoPlayer } from "@/components/student/courses/VideoPlayer";
import { LessonNavigation } from "@/components/student/courses/LessonNavigation";
import { Separator } from "@/components/ui/separator";
import { FileText, Sparkles } from "lucide-react";

export default async function LessonIdPage({
    params
}: {
    params: Promise<{ courseId: string; lessonId: string }>;
}) {
    const { userId } = await auth();
    if (!userId) return redirect("/");

    const { courseId, lessonId } = await params;

    // 1. Fetch the specific lesson with details
    const lesson = await (db as any).lesson.findUnique({
        where: { id: lessonId, isPublished: true },
        include: {
            chapter: { include: { course: true } },
            resources: true,
            userProgress: { where: { userId } }
        }
    });

    if (!lesson) return redirect(`/student/courses/${courseId}`);

    // 2. Fetch context for navigation (Prev/Next)
    // We fetch the course with chapters and lessons to determine order
    const course = await (db as any).course.findUnique({
        where: { id: courseId },
        include: {
            chapters: {
                where: { isPublished: true },
                orderBy: { position: "asc" },
                include: {
                    lessons: {
                        where: { isPublished: true },
                        orderBy: { position: "asc" }
                    }
                }
            }
        }
    });

    const publishedLessons = course?.chapters.flatMap((c: any) => c.lessons) || [];
    const currentLessonIndex = publishedLessons.findIndex((l: any) => l.id === lessonId);

    const prevLessonId = currentLessonIndex > 0 ? publishedLessons[currentLessonIndex - 1].id : null;
    const nextLessonId = currentLessonIndex < publishedLessons.length - 1 ? publishedLessons[currentLessonIndex + 1].id : null;

    const isCompleted = lesson.userProgress?.[0]?.isCompleted;

    return (
        <div className="flex flex-col max-w-5xl mx-auto space-y-8">
            {/* Video Player Section */}
            {lesson.muxPlaybackId ? (
                <div className="rounded-[32px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-white/50 bg-slate-900 relative ring-4 ring-white/30 backdrop-blur-sm">

                    {/* Ambient Glow */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 blur-2xl opacity-50 pointer-events-none" />

                    <div className="relative aspect-video z-10">
                        <VideoPlayer
                            playbackId={lesson.muxPlaybackId}
                            courseId={courseId}
                            lessonId={lesson.id}
                            chapterId={lesson.chapterId}
                            nextLessonId={nextLessonId}
                            title={lesson.title}
                            completeOnFinish={true}
                        />
                    </div>
                </div>
            ) : (
                <div className="h-[200px] flex flex-col items-center justify-center rounded-[32px] bg-slate-100 border-2 border-dashed border-slate-200">
                    <Sparkles className="h-10 w-10 text-slate-300 mb-2" />
                    <p className="text-slate-500 font-medium font-mono uppercase tracking-wider text-sm">Text-only Lesson</p>
                </div>
            )}

            <div className="flex flex-col gap-6">

                {/* Navigation Controls */}
                <LessonNavigation
                    courseId={courseId}
                    prevLessonId={prevLessonId}
                    nextLessonId={nextLessonId}
                    isCompleted={!!isCompleted}
                />

                {/* Content Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/60 relative overflow-hidden">

                    {/* Decor */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-violet-100/50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                            <div className="space-y-4 flex-1">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 rounded-full bg-violet-100/80 text-violet-700 text-[10px] font-bold uppercase tracking-widest border border-violet-200">
                                        {lesson.type}
                                    </span>
                                    <span className="text-slate-300 text-sm font-medium">/</span>
                                    <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">{lesson.chapter.title}</span>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight font-serif tracking-tight">
                                    {lesson.title}
                                </h2>
                            </div>
                        </div>

                        <Separator className="my-10 bg-slate-100" />

                        {/* Text Content */}
                        {lesson.textContent && (
                            <div
                                className="prose prose-slate prose-lg max-w-none 
                                prose-headings:font-serif prose-headings:text-slate-800 
                                prose-p:text-slate-600 prose-p:leading-relaxed
                                prose-a:text-violet-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-slate-800 prose-strong:font-bold
                                "
                                dangerouslySetInnerHTML={{ __html: lesson.textContent }}
                            />
                        )}

                        {/* Resources */}
                        {lesson.resources.length > 0 && (
                            <div className="mt-16 space-y-6">
                                <h3 className="text-lg font-bold flex items-center gap-3 text-slate-800">
                                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    Course Resources
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {lesson.resources.map((resource: any) => (
                                        <a
                                            key={resource.id}
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center p-4 bg-white rounded-2xl border border-slate-200 hover:border-violet-300 hover:shadow-[0_4px_20px_rgba(124,58,237,0.1)] transition-all group relative overflow-hidden"
                                        >
                                            <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center shadow-sm mr-4 group-hover:scale-110 transition-transform z-10">
                                                <FileText className="h-5 w-5 text-slate-400 group-hover:text-violet-500 transition-colors" />
                                            </div>
                                            <div className="flex flex-col overflow-hidden z-10">
                                                <span className="font-bold text-slate-700 text-sm truncate group-hover:text-violet-900 transition-colors">{resource.name}</span>
                                                <span className="text-[10px] text-slate-400 uppercase font-extrabold tracking-widest mt-0.5">Download</span>
                                            </div>

                                            {/* Hover Fill */}
                                            <div className="absolute inset-0 bg-violet-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

