import React from "react";
import { KnowledgeDashboardLayout } from "@/components/student/dashboard/KnowledgeDashboardLayout";
import { CourseHeader } from "@/components/student/my-courses/CourseHeader";
import { ActiveHero } from "@/components/student/my-courses/ActiveHero";
import { CourseCard } from "@/components/student/my-courses/CourseCard";
import { CourseHydrator } from "@/components/student/my-courses/CourseHydrator";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Course, CourseStatus } from "@/lib/store/useCourseStore";
import { MyCoursesGrid } from "@/components/student/my-courses/MyCoursesGrid"; // New Client Component wrapper

async function getMyCourses(): Promise<Course[]> {
    const { userId } = await auth();
    // In a real app, restrict to enrolled courses. 
    // For now, to ensure visibility, we show ALL published courses.
    const dbCourses = await db.course.findMany({
        where: { isPublished: true },
        include: {
            chapters: {
                include: { lessons: true }
            },
            teacher: true
        }
    });

    return dbCourses.map(c => {
        // Mock progress for now since we haven't implemented full progress calculation in this query
        const totalModules = c.chapters.length || 1;
        const completedModules = 0;

        return {
            id: c.id,
            title: c.title,
            instructor: c.teacher.name || "Unknown Instructor",
            thumbnail: c.thumbnail || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop", // Fallback
            tags: [c.stream.toString(), c.difficulty.toString()],
            totalModules,
            completedModules,
            lastAccessed: c.updatedAt,
            status: 'IN_PROGRESS' as CourseStatus, // Default to IN_PROGRESS so it shows up in default filters
            difficulty: c.difficulty === 'ADVANCED' ? 'Advanced' : c.difficulty === 'BEGINNER' ? 'Beginner' : 'Intermediate',
        };
    });
}

export default async function MyCoursesPage() {
    const courses = await getMyCourses();

    return (
        <KnowledgeDashboardLayout hideRightSidebar>
            <CourseHydrator courses={courses} />
            <div className="min-h-screen bg-[#F3F4F6] pb-24 font-friendly">

                {/* 1. Liquid Navigation */}
                <CourseHeader />

                <MyCoursesGrid /> {/* Moved client logic here */}
            </div>
        </KnowledgeDashboardLayout>
    );
}

