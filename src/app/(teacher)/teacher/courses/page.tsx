import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { TeacherCoursesClient } from "@/components/teacher/courses/TeacherCoursesClient";
import { CourseStatus, Stream } from "@/lib/store/useTeacherCourseStore";

export default async function TeacherCoursesPage() {
    const { userId } = await auth();

    if (!userId) {
        return redirect("/");
    }

    // Resolve internal User ID from Clerk ID
    const user = await db.user.findUnique({
        where: { clerkId: userId }
    });

    if (!user) {
        // Handle case where user calls this but isn't in DB yet? 
        // Should have been handled by sync webhook, but for safety:
        return redirect("/");
    }

    const courses = await db.course.findMany({
        where: {
            teacherId: user.id // Use internal UUID
        },
        orderBy: {
            createdAt: 'desc'
        } as any,
        include: {
            _count: {
                select: { enrollments: true }
            }
        }
    });

    // Transform to Store Shape
    // Transform to Store Shape
    const formattedCourses = courses.map((course: any) => ({
        id: course.id,
        title: course.title,
        code: course.code,
        thumbnail: course.thumbnail || 'gradient-violet',
        description: course.description || '',
        semester: course.semester || 'Spring 2026',
        stream: (course.stream as Stream) || 'CSE',
        status: (course.isPublished ? 'LIVE' : course.isArchived ? 'ARCHIVED' : 'DRAFT') as CourseStatus,
        stats: {
            enrolled: course._count?.enrollments || 0, // Real enrollment count
            avgGrade: 0, // Placeholder
            attendance: 0, // Placeholder
            syllabusCompletion: 0 // Placeholder
        },
        collaborators: []
    }));

    return (
        <TeacherCoursesClient initialCourses={formattedCourses} />
    );
}
