'use client';

import React from 'react';
import { Play } from 'lucide-react';
import { NeuButton } from '@/components/neu/NeuButton';
import { NeuCard } from '@/components/neu/NeuCard';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface HeroCarouselProps {
    courses: any[];
}

export function HeroCarousel({ courses }: HeroCarouselProps) {
    if (!courses || courses.length === 0) {
        return (
            <NeuCard className="h-[300px] flex items-center justify-center text-neu-text-sub">
                <p>No active courses found. Start exploring below!</p>
            </NeuCard>
        );
    }

    return (
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {courses.map((enrollment) => {
                const course = enrollment.course;
                return (
                    <div key={course.id} className="snap-center shrink-0 w-[85vw] md:w-[600px] h-[300px] relative rounded-3xl overflow-hidden group shadow-neu-convex-md">
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0 bg-neutral-900">
                            {course.thumbnail ? (
                                <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-neu-base to-slate-300 opacity-20" />
                            )}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                        {/* Content */}
                        <div className="absolute bottom-8 left-8 z-10 max-w-[90%]">
                            <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block shadow-sm border border-white/10">
                                Recommended For You
                            </span>
                            <h2 className="text-3xl font-bold text-white mb-2 leading-tight drop-shadow-md">
                                {course.title}
                            </h2>
                            <p className="text-gray-300 text-sm mb-6 line-clamp-2 max-w-sm">
                                {course.description}
                            </p>

                            <div className="flex items-center gap-4">
                                <Link href={`/student/courses/${course.id}`}>
                                    <button className="bg-white text-black font-bold px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gray-100 transition-all active:scale-95 shadow-lg group/btn">
                                        <div className="bg-black rounded-full p-1">
                                            <Play className="w-3 h-3 fill-white text-white" />
                                        </div>
                                        <span>Resume Lesson</span>
                                    </button>
                                </Link>
                                <div className="text-white/80 text-xs font-mono">
                                    {enrollment.percentComplete}% Complete
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar Bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                            <div
                                className="h-full bg-neu-accent shadow-[0_0_10px_rgba(124,58,237,0.5)]"
                                style={{ width: `${enrollment.percentComplete}%` }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
