import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CourseSetupClient } from "@/components/teacher/courses/setup/CourseSetupClient";

interface CourseIdPageProps {
    params: Promise<{
        courseId: string;
    }>;
}

const CourseIdPage = async ({
    params
}: CourseIdPageProps) => {
    const { userId } = await auth();
    if (!userId) return redirect("/");

    const { courseId } = await params;

    const user = await db.user.findUnique({
        where: { clerkId: userId }
    });

    if (!user) return redirect("/");

    const course = await db.course.findUnique({
        where: {
            id: courseId,
            teacherId: user.id
        }
    });

    if (!course) return redirect("/teacher/courses");

    return <CourseSetupClient course={course} />;
}

export default CourseIdPage;
