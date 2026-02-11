"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export interface DashboardData {
    user: {
        firstName: string;
    };
    gamification: {
        xp: number;
        level: number;
        rank: number;
        streak: number;
    };
    activeOperation: {
        courseTitle: string;
        moduleTitle: string;
        progress: number;
        lastAccessedLabel: string;
        lessonId: string | null;
        courseId: string | null;
    } | null;
    schedule: {
        id: string;
        title: string;
        time: string;
        type: "TEST" | "ASSIGNMENT" | "LAB" | "CLASS";
        isToday: boolean;
    }[];
    missions: {
        pendingCount: number;
        nextMission: string | null;
    };
}

export async function fetchCommandCenterData(): Promise<DashboardData> {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const user = await db.user.findUnique({
        where: { clerkId: userId },
        include: {
            gamification: true,
            studentProfile: true,
        }
    });

    if (!user) redirect("/sign-in");

    // 1. Gamification
    const xp = user.gamification?.xp || 0;
    const level = user.gamification?.level || 1;
    const streak = user.gamification?.currentStreak || 0;

    // Calculate Real Rank
    const rank = await db.user.count({
        where: {
            xp: { gt: user.xp || 0 }
        }
    }) + 1;

    // 2. Active Operation (Last Accessed Lesson)
    const lastProgress = await db.userProgress.findFirst({
        where: { userId: user.id },
        orderBy: { updatedAt: "desc" },
        include: {
            lesson: {
                include: {
                    chapter: {
                        include: {
                            course: {
                                include: {
                                    enrollments: {
                                        where: { userId: user.id }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    let activeOperation = null;
    if (lastProgress) {
        const lesson = lastProgress.lesson;
        const chapter = lesson.chapter;
        const course = chapter.course;
        const enrollment = course.enrollments[0];

        activeOperation = {
            courseTitle: course.title,
            moduleTitle: chapter.title,
            progress: enrollment?.percentComplete || 0,
            lastAccessedLabel: "RESUME",
            lessonId: lesson.id,
            courseId: course.id
        };
    } else {
        // Fallback: Check if enrolled in any course
        const enrollment = await db.enrollment.findFirst({
            where: { userId: user.id },
            include: { course: { include: { chapters: { include: { lessons: true } } } } }
        });

        if (enrollment && enrollment.course.chapters.length > 0) {
            const course = enrollment.course;
            activeOperation = {
                courseTitle: course.title,
                moduleTitle: course.chapters[0].title,
                progress: enrollment.percentComplete || 0,
                lastAccessedLabel: "START",
                lessonId: course.chapters[0].lessons[0]?.id || null,
                courseId: course.id
            };
        }
    }

    // 3. Schedule (Assignments & Bookings)
    const now = new Date();
    const assignments = await db.assignment.findMany({
        where: {
            course: {
                enrollments: {
                    some: { userId: user.id }
                }
            },
            dueDate: { gte: now }
        },
        orderBy: { dueDate: "asc" },
        take: 3
    });

    const schedule = assignments.map((a: any) => ({
        id: a.id,
        title: a.title,
        time: a.dueDate ? a.dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "TBD",
        type: "ASSIGNMENT" as const,
        isToday: a.dueDate ? a.dueDate.getDate() === now.getDate() : false
    }));

    return {
        user: {
            firstName: user.name?.split(" ")[0] || "Scholar"
        },
        gamification: {
            xp,
            level,
            rank,
            streak
        },
        activeOperation,
        schedule,
        missions: {
            pendingCount: assignments.length,
            nextMission: assignments[0]?.title || "No pending missions"
        }
    };
}
