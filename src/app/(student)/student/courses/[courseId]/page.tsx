import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function CourseIdPage({
    params
}: {
    params: Promise<{ courseId: string }>;
}) {
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
                        orderBy: { position: "asc" }
                    }
                }
            }
        }
    });

    if (!course) return redirect("/");

    const firstLesson = course.chapters[0]?.lessons[0];

    if (!firstLesson) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
                <p className="text-slate-500">This course has no published lessons yet.</p>
            </div>
        );
    }

    return redirect(`/student/courses/${course.id}/lessons/${firstLesson.id}`);
}
