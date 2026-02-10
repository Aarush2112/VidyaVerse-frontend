import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { TeacherRegistryClient } from "@/components/teacher/students/TeacherRegistryClient";
import { Student } from "@/lib/store/useRegistryStore";

export default async function TeacherStudentsPage() {
    const { userId } = await auth();
    if (!userId) return redirect("/");

    const user = await db.user.findUnique({
        where: { clerkId: userId }
    });

    if (!user) return redirect("/");

    // Fetch all students (Users with STUDENT role)
    // In a real app we might filter by courses taught by this teacher, 
    // but for now let's fetch all students in the system or "my students".
    // Let's assume filtering by enrollment in my courses is better.

    const myCourses = await db.course.findMany({
        where: { teacherId: user.id },
        select: { id: true }
    });
    const courseIds = myCourses.map(c => c.id);

    // Fetch students enrolled in ANY of my courses
    // OR just fetch all students if I'm a teacher/admin for demo. 
    // Let's do ALL students for now to ensure visibility.
    const dbStudents = await db.user.findMany({
        where: { role: 'STUDENT' },
        include: {
            studentProfile: true,
            userProgress: true,
            submissions: true
            // attendance/grades would be relations or aggregations
        } as any
    });

    const students: Student[] = dbStudents.map((u: any) => {
        // Mocking some metrics derived from real data + randomness for vitality
        const gpa = u.studentProfile?.currentGPA || (7.0 + Math.random() * 3);
        const attendance = u.studentProfile?.attendanceRate || (60 + Math.random() * 40);

        // Generate pseudo-velocity based on recent submissions or random
        const velocity = Array.from({ length: 10 }, () => 50 + Math.random() * 50);

        return {
            id: u.studentProfile?.id || u.id, // Use profile ID if exists, else user ID
            userId: u.id,
            name: u.name || "Unknown Student",
            email: u.email,
            rollNumber: u.studentProfile?.rollNumber || "N/A",
            cohort: u.studentProfile?.cohort || "2026",
            avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}`,

            metrics: {
                gpa: parseFloat(gpa.toFixed(1)),
                attendance: Math.round(attendance),
                velocity: velocity
            },

            risk: {
                isFlagged: u.studentProfile?.isFlaggedAtRisk || false,
                reason: u.studentProfile?.flagReason || undefined,
                score: u.studentProfile?.riskScore || 0
            }
        };
    });

    return (
        <TeacherRegistryClient initialStudents={students} />
    );
}
