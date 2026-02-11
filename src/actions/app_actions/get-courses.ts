"use server";

import { db } from "@/lib/db";
import type { Course } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

// Fallback for Stream enum if missing from client
enum Stream {
    CSE = 'CSE',
    ECE = 'ECE',
    MECH = 'MECH',
    AI_ML = 'AI_ML'
}

interface GetCoursesParams {
    title?: string;
    categoryId?: string; // This maps to Stream
}

export async function getCourses({ title, categoryId }: GetCoursesParams) {
    try {
        const { userId } = await auth();
        // Students can browse without login? Assuming protected route for now based on app structure.

        let query: any = {
            isPublished: true,
        };

        if (title) {
            query.title = {
                contains: title,
                mode: "insensitive",
            };
        }

        if (categoryId) {
            // Validate if categoryId is a valid Stream
            if (Object.values(Stream).includes(categoryId as Stream)) {
                query.stream = categoryId as Stream;
            }
        }

        const courses = await db.course.findMany({
            where: query,
            include: {
                teacher: {
                    select: {
                        name: true,
                    }
                },
                chapters: {
                    where: { isPublished: true },
                    select: { id: true }
                },
                // Include enrollment status if user is logged in
                ...(userId && {
                    enrollments: {
                        where: { user: { clerkId: userId } },
                        select: { id: true }
                    }
                })
            } as any,
            orderBy: {
                createdAt: "desc",
            } as any,
        });

        // Transform to match UI needs and include enrollment flag
        return courses.map((course: any) => ({
            id: course.id,
            title: course.title,
            instructor: course.teacher.name || "Unknown Instructor",
            chaptersLength: course.chapters.length,
            isEnrolled: userId ? course.enrollments.length > 0 : false,
            category: course.stream || "General",
            progress: 0, // Placeholder
            image: course.thumbnail || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
            price: course.price,
            description: course.description
        }));

    } catch (error) {
        console.error("[GET_COURSES]", error);
        return [];
    }
}
