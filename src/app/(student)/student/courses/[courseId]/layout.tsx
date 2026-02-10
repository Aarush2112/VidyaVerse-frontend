import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { CourseSidebar } from "@/components/student/courses/CourseSidebar";

export default async function StudentCourseLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ courseId: string }>;
}) {
    const { userId } = await auth();
    if (!userId) return redirect("/");

    // Resolve params properly
    const { courseId } = await params;

    const course = await db.course.findUnique({
        where: { id: courseId },
        include: {
            chapters: {
                where: { isPublished: true },
                orderBy: { position: "asc" },
                include: {
                    lessons: {
                        where: { isPublished: true },
                        orderBy: { position: "asc" },
                        include: {
                            userProgress: {
                                where: { userId }
                            }
                        }
                    }
                }
            }
        } as any
    });

    if (!course) return redirect("/");

    // Calculate progress
    const publishedLessons = course.chapters.flatMap((c: any) => c.lessons);
    const completedLessons = publishedLessons.filter((l: any) => l.userProgress.some((p: any) => p.isCompleted));
    const progressCount = (completedLessons.length / publishedLessons.length) * 100 || 0;

    return (
        <div className="h-full flex flex-col">
            {/* Mobile Header could go here */}
            <div className="flex-1 flex h-full overflow-hidden">
                <aside className="hidden md:flex w-80 flex-col fixed inset-y-0 z-50 mt-[80px] border-r border-slate-100 bg-white/50 backdrop-blur-xl">
                    <CourseSidebar course={course} progressCount={progressCount} />
                </aside>
                <main className="md:pl-80 h-full w-full overflow-y-auto bg-[#F3F4F6]">
                    <div className="max-w-6xl mx-auto pb-10 px-6 pt-6 md:pt-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
