"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { Search, LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { SpotlightCarousel } from "./SpotlightCarousel";
import { JellyFilterBar } from "./JellyFilterBar";
import { FluidCourseCard } from "./FluidCourseCard";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";

// Generic Course Interface for Library (Matched with getCourses return type)
export interface LibraryCourse {
    id: string;
    title: string;
    instructor: string;
    progress: number; // Placeholder for now or mapped from enrollment
    category: string;
    image: string;
    isEnrolled: boolean;
    price: number | null;
    description: string | null;
}

interface CourseLibraryPageProps {
    courses: LibraryCourse[];
}

export function CourseLibraryPage({ courses }: CourseLibraryPageProps) {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    // Search State
    const [searchValue, setSearchValue] = useState(searchParams.get("title") || "");
    // Debounce usually should be a hook, but for simplicity/dependency avoidance:
    // If useDebounce hook is not available, I'll rely on onKeyDown or blur for search to avoid thrashing server.
    // Let's assume on Enter or Blur for now to be safe.

    // Update Filter Logic
    const onSearch = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (searchValue) {
            params.set("title", searchValue);
        } else {
            params.delete("title");
        }
        router.push(`${window.location.pathname}?${params.toString()}`);
    };

    // Liquid Header Effect
    useEffect(() => {
        return scrollY.onChange((latest) => {
            setIsScrolled(latest > 50);
        });
    }, [scrollY]);

    return (
        <div className="min-h-screen bg-[#F3F4F6] pb-24">
            {/* Liquid Header */}
            <motion.header
                className={cn(
                    "sticky top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between transition-all duration-300",
                    isScrolled ? "bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-sm" : "bg-transparent"
                )}
                layout
            >
                <div className="flex items-center gap-4">
                    <h1 className={cn("text-2xl font-bold text-slate-900 transition-all", isScrolled ? "text-xl" : "text-3xl")}>Library</h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" size={18} />
                        <Input
                            placeholder="Search courses..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && onSearch()}
                            onBlur={onSearch}
                            className="pl-10 bg-gray-100 border-transparent focus:bg-white focus:border-violet-200 focus:ring-4 focus:ring-violet-500/10 rounded-full w-64 transition-all"
                        />
                    </div>

                    {/* View Toggle */}
                    <div className="hidden md:flex bg-gray-200/50 p-1 rounded-lg">
                        <div className="px-3 py-1.5 rounded-md bg-white shadow-sm cursor-pointer">
                            <LayoutGrid size={18} className="text-slate-900" />
                        </div>
                        <div className="px-3 py-1.5 rounded-md cursor-pointer text-slate-400 hover:text-slate-600">
                            <List size={18} />
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Main Content Scroll View */}
            <main className="space-y-8">

                {/* 1. Spotlight Hero */}
                <section>
                    <SpotlightCarousel courses={courses.slice(0, 3)} />
                </section>

                {/* 2. Smart Filters */}
                <section className="px-6 md:px-8 sticky top-[72px] z-30 pointer-events-none">
                    {/* Inner wrapper to restore pointer events for buttons */}
                    <div className="pointer-events-auto inline-block">
                        <JellyFilterBar />
                    </div>
                </section>

                {/* 3. Course Grid (Masonry/Staggered) */}
                <section className="px-6 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {courses.length === 0 ? (
                            <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-500">
                                <p>No courses found matching your criteria.</p>
                            </div>
                        ) : (
                            courses.map((course, i) => (
                                <motion.div
                                    key={course.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05, duration: 0.5 }}
                                >
                                    <FluidCourseCard {...course} />
                                </motion.div>
                            ))
                        )}
                    </div>
                </section>

            </main>
        </div>
    );
}
