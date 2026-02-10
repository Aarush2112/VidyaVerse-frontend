'use client';

import React, { useState } from 'react';
import { NeuCard } from '@/components/neu/NeuCard';
import { NeuButton } from '@/components/neu/NeuButton';
import { Search, User as UserIcon } from 'lucide-react';
import Link from 'next/link';

interface CourseListProps {
    courses: any[];
}

export function CourseList({ courses }: CourseListProps) {
    const [filter, setFilter] = useState('All Courses');
    const [search, setSearch] = useState('');

    const categories = ['All Courses', 'CSE', 'ECE', 'MECH', 'AI_ML'];

    const filteredCourses = courses.filter(course => {
        const matchesCategory = filter === 'All Courses' || course.stream === filter;
        const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
            course.tags.some((tag: string) => tag.toLowerCase().includes(search.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="space-y-8">
            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">

                {/* Filter Chips */}
                <div className="flex flex-wrap gap-3">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${filter === cat
                                ? 'bg-neu-accent text-white shadow-neu-convex-sm'
                                : 'bg-neu-base text-neu-text-sub hover:text-neu-text-main shadow-neu-convex-sm hover:shadow-neu-float'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-64">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-neu-base text-neu-text-main px-4 py-3 pl-10 rounded-neu-sm shadow-neu-concave-sm focus:outline-none focus:shadow-neu-concave-md transition-shadow placeholder:text-neu-text-sub/50"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neu-text-sub" />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredCourses.map(course => (
                    <Link href={`/student/courses/${course.id}`} key={course.id}>
                        <NeuCard className="h-full p-0 overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                            {/* Thumbnail */}
                            <div className="relative h-48 bg-gray-200 overflow-hidden">
                                {course.thumbnail ? (
                                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-neu-base to-slate-300 flex items-center justify-center">
                                        <span className="text-4xl">📚</span>
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded text-neu-text-main shadow-sm">
                                    {course.stream}
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-6 space-y-4 flex flex-col h-full">
                                <div className="space-y-2 flex-grow">
                                    <h3 className="text-xl font-bold text-neu-text-main line-clamp-1 group-hover:text-neu-accent transition-colors">
                                        {course.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-neu-text-sub">
                                        <UserIcon className="w-3 h-3" />
                                        <span>{course.teacher?.name || "Unknown Instructor"}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {course.tags.slice(0, 3).map((tag: string) => (
                                            <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-neu-text-sub bg-neu-base shadow-neu-convex-xs px-2 py-1 rounded-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Progress or Enroll Button */}
                                <div className="pt-2">
                                    {course.enrollments?.length > 0 ? (
                                        <>
                                            <div className="flex justify-between text-xs text-neu-text-sub mb-1">
                                                <span>0% Complete</span>
                                                <span>{course.totalLessons} Lessons</span>
                                            </div>
                                            <div className="h-1.5 bg-neu-base shadow-neu-concave-xs rounded-full overflow-hidden">
                                                <div className="h-full bg-neu-accent w-0" />
                                            </div>
                                        </>
                                    ) : (
                                        <div onClick={(e) => e.preventDefault()}>
                                            <NeuButton
                                                variant="primary"
                                                className="w-full text-xs py-2 h-auto"
                                                onClick={async () => {
                                                    const { enrollInCourse } = await import('@/app/actions/enrollment');
                                                    const res = await enrollInCourse(course.id);
                                                    if (res.success) {
                                                        const { toast } = await import('sonner');
                                                        toast.success("Enrolled successfully!");
                                                    } else {
                                                        const { toast } = await import('sonner');
                                                        toast.error(res.error || "Enrollment failed");
                                                    }
                                                }}
                                            >
                                                Enroll Now
                                            </NeuButton>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </NeuCard>
                    </Link>
                ))}
            </div>

            {filteredCourses.length === 0 && (
                <div className="text-center py-20 text-neu-text-sub">
                    <p className="text-lg">No courses found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}
