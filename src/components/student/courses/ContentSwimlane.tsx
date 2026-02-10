"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CinematicCard } from "./CinematicCard";

interface Course {
    id: string;
    title: string;
    thumbnail: string;
    progress?: number;
    match?: string;
    rating?: string;
    duration?: string;
    tags: string[];
}

interface ContentSwimlaneProps {
    title: string;
    courses: Course[];
}

export function ContentSwimlane({ title, courses }: ContentSwimlaneProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <div className="relative group/lane py-8">
            <h2 className="px-8 md:px-16 mb-4 text-2xl font-black italic tracking-tight text-white/90">
                {title}
            </h2>

            <div className="relative">
                {/* Scroll Buttons */}
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-0 bottom-14 w-12 md:w-16 z-40 bg-black/40 opacity-0 group-hover/lane:opacity-100 transition-opacity flex items-center justify-center text-white"
                >
                    <ChevronLeft className="h-10 w-10" />
                </button>

                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto no-scrollbar px-8 md:px-16 pb-14 pt-4"
                >
                    {courses.map((course) => (
                        <CinematicCard key={course.id} course={course} />
                    ))}
                </div>

                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-0 bottom-14 w-12 md:w-16 z-40 bg-black/40 opacity-0 group-hover/lane:opacity-100 transition-opacity flex items-center justify-center text-white"
                >
                    <ChevronRight className="h-10 w-10" />
                </button>
            </div>
        </div>
    );
}
