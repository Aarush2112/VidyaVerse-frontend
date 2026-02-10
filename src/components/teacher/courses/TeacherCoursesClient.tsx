"use client";

import { useTeacherCourseStore, Course } from "@/lib/store/useTeacherCourseStore";
import { ControlDeck } from "@/components/teacher/courses/ControlDeck";
import { CourseCard } from "@/components/teacher/courses/CourseCard";
import { CourseWizardModal } from "@/components/teacher/courses/wizard/CourseWizardModal";
import { useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TeacherCoursesClientProps {
    initialCourses: Course[];
}

export function TeacherCoursesClient({ initialCourses }: TeacherCoursesClientProps) {
    const { courses, filter, duplicateCourse, archiveCourse, setCourses } = useTeacherCourseStore();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Hydrate store with server data on mount
    useEffect(() => {
        // We map the Prisma course shape to the Store Course shape if needed, 
        // but ideally we passed already mapped data.
        // Assuming initialCourses matches Store interface for now, or we map in parent.
        // We need to add setCourses to the store definition first probably, 
        // or just use setState logic. 
        // Wait, the store has `fetchCourses` but not `setCourses`. 
        // I should update the store to allow setting.
        // Or just override here.
        useTeacherCourseStore.setState({ courses: initialCourses });
    }, [initialCourses]);

    const filteredCourses = useMemo(() => {
        return courses.filter(course => {
            // Status Filter
            if (filter.status !== 'ALL' && course.status !== filter.status) return false;

            // Search Filter
            if (filter.searchQuery) {
                const query = filter.searchQuery.toLowerCase();
                if (!course.title.toLowerCase().includes(query) && !course.code.toLowerCase().includes(query)) return false;
            }

            return true;
        });
    }, [courses, filter]);

    return (
        <div className="max-w-7xl mx-auto pb-20 px-6">
            <ControlDeck onCreateClick={() => setIsCreateModalOpen(true)} />

            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8"
            >
                <AnimatePresence mode="popLayout">
                    {filteredCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            onDuplicate={duplicateCourse}
                            onArchive={archiveCourse}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredCourses.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="h-32 w-32 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                        <span className="text-4xl">📚</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">No courses found</h3>
                    <p className="text-slate-500 mt-2">Try adjusting your filters or create a new course.</p>
                </div>
            )}

            <CourseWizardModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </div>
    );
}
