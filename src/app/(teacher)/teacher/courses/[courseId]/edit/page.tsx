import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CurriculumSidebar } from "@/components/teacher/courses/curriculum/CurriculumSidebar";
import { LessonEditor } from "@/components/teacher/courses/curriculum/LessonEditor";
import { CourseActions } from "@/components/teacher/courses/CourseActions";

interface CourseEditPageProps {
    params: Promise<{ courseId: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CourseEditPage({ params, searchParams }: CourseEditPageProps) {
    const { userId } = await auth();
    if (!userId) return redirect("/");

    const { courseId } = await params;
    const { lessonId } = await searchParams;

    // Verify User
    const user = await db.user.findUnique({ where: { clerkId: userId } });
    if (!user || (user.role !== "TEACHER" && user.role !== "ADMIN")) return redirect("/");

    // Fetch Course with everything needed
    const course = await db.course.findUnique({
        where: { id: courseId, teacherId: user.id },
        include: {
            chapters: {
                orderBy: { position: "asc" },
                include: {
                    lessons: {
                        orderBy: { position: "asc" },
                        include: {
                            resources: { orderBy: { createdAt: "desc" } },
                            chapter: true // Need this for courseId in AttachmentUploader
                        }
                    }
                }
            }
        }
    });

    if (!course) return redirect("/teacher/courses");

    // Logic to find selected lesson
    let selectedLesson = null;
    if (lessonId && typeof lessonId === "string") {
        // Search in fetched data to save DB call? Or fetch fresh?
        // Fetching fresh ensures we have specific lesson fields if we optimized the big query above.
        // But we already fetched everything.
        for (const chapter of course.chapters) {
            const found = chapter.lessons.find(l => l.id === lessonId);
            if (found) {
                selectedLesson = found;
                break;
            }
        }
    }

    return (
        <div className="flex h-full w-full overflow-hidden bg-slate-50">
            {/* Left Rail: Curriculum Tree */}
            <div className="w-[350px] flex-shrink-0 h-full overflow-hidden border-r border-slate-200 bg-white">
                <CurriculumSidebar course={course} />
            </div>

            {/* Main Canvas: Editor Area */}
            <div className="flex-1 h-full overflow-y-auto relative">
                <div className="max-w-4xl mx-auto p-8 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8 shrink-0">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 leading-tight">{course.title}</h1>
                            <p className="text-slate-500 text-sm">Course Studio</p>
                        </div>
                        <div className="flex gap-2">
                            <CourseActions
                                courseId={course.id}
                                isPublished={course.isPublished}
                                disabled={course.chapters.length === 0} // Basic validation
                            />
                        </div>
                    </div>

                    {/* Canvas */}
                    <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-8 overflow-y-auto">
                        {selectedLesson ? (
                            <LessonEditor lesson={selectedLesson} />
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                <div className="p-4 bg-slate-100 rounded-full mb-4">
                                    <span className="text-4xl">👈</span>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">Select a lesson</h3>
                                <p className="text-sm text-slate-500 max-w-xs mt-1">
                                    Click on any lesson in the sidebar to start editing its content, video, and resources.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
