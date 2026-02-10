"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import Link from "next/link";

export function SpotlightCarousel({ courses }: { courses: any[] }) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Filter for featured courses or just take the first few if passed
    const featured = courses && courses.length > 0 ? courses : [
        {
            id: 'demo-1',
            title: "Advanced React Engineering",
            category: "RECOMMENDED FOR YOU",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
            color: "from-violet-600 to-indigo-600"
        },
        {
            id: 'demo-2',
            title: "System Design & Architecture",
            category: "NEW ARRIVAL",
            image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2070&auto=format&fit=crop",
            color: "from-fuchsia-600 to-pink-600"
        }
    ];

    return (
        <div className="w-full overflow-hidden py-4 cursor-grab active:cursor-grabbing">
            <motion.div
                className="flex gap-6 px-4 md:px-8 w-max"
                drag="x"
                dragConstraints={{ right: 0, left: -600 }}
                dragElastic={0.2}
                whileTap={{ cursor: "grabbing" }}
            >
                {featured.map((course: any, i: number) => (
                    <HeroCard
                        key={course.id || i}
                        title={course.title}
                        tag={course.category || "FEATURED"}
                        image={course.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop"}
                        color={course.color || "from-blue-600 to-cyan-600"}
                        href={`/student/courses/${course.id}`}
                    />
                ))}
            </motion.div>
        </div>
    );
}

function HeroCard({ title, tag, image, color, href }: any) {
    return (
        <motion.div
            className="relative h-[400px] w-[85vw] md:w-[800px] rounded-[32px] overflow-hidden shadow-2xl shrink-0"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            {/* Parallax Background Image (Simulated with simple scale for now) */}
            <motion.img
                src={image}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8 }}
            />

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-40 mix-blend-multiply`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-widest mb-4 border border-white/10"
                >
                    {tag}
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-2xl drop-shadow-lg"
                >
                    {title}
                </motion.h2>

                <Link href={href || "#"}>
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all shadow-lg"
                    >
                        <Play size={20} fill="currentColor" />
                        Resume Lesson
                    </motion.button>
                </Link>
            </div>
        </motion.div>
    )
}
