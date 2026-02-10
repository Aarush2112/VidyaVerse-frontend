"use client";

import React from "react";
import { ActiveHero } from "@/components/student/my-courses/ActiveHero";
import { CourseCard } from "@/components/student/my-courses/CourseCard";
import { useCourseStore } from "@/lib/store/useCourseStore";
import { AnimatePresence, motion } from "framer-motion";
import { BookX } from "lucide-react";

export function MyCoursesGrid() {
    const { filteredCourses, courses } = useCourseStore();
    // Determine active course (most recent 'IN_PROGRESS' or 'NOT_STARTED')
    const activeCourses = courses
        .filter(c => c.status === 'IN_PROGRESS' || c.status === 'NOT_STARTED')
        .sort((a, b) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime());

    const mostRecentCourse = activeCourses[0];
    const displayCourses = filteredCourses();

    return (
        <main className="max-w-[1600px] mx-auto p-6 md:p-8 space-y-8">
            {/* 2. Active Focus Hero */}
            {mostRecentCourse && (
                <section>
                    <ActiveHero activeCourse={mostRecentCourse} />
                </section>
            )}

            {/* 3. Portfolio Grid */}
            <section>
                <AnimatePresence mode="popLayout">
                    {displayCourses.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {displayCourses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-24 text-center"
                        >
                            <div className="h-24 w-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-6">
                                <BookX size={48} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No courses found</h3>
                            <p className="text-slate-500 max-w-sm mx-auto">
                                Try adjusting your search or filters to find what you're looking for.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </main>
    );
}
