"use client";

import React from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

import Link from "next/link";

export function NewCoursePlaceholder() {
    return (
        <Link href="/teacher/courses/create" className="block h-full">
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative h-full min-h-[400px] w-full bg-[#EFF6FF] rounded-[32px] overflow-hidden cursor-pointer flex flex-col items-center justify-center text-center p-8 transition-colors hover:bg-[#DBEAFE]"
            >
                {/* Massive White Circle Button */}
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="h-24 w-24 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-500 mb-6 group-hover:shadow-xl transition-all duration-300"
                >
                    <Plus className="h-10 w-10" />
                </motion.div>

                <h3 className="text-xl font-bold text-blue-900 mb-2">Draft a New Course</h3>
                <p className="text-sm font-medium text-blue-400 max-w-[200px] leading-relaxed">
                    Unlock a new classroom and start managing curriculum.
                </p>

                {/* Decorative Background Circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-300/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            </motion.div>
        </Link>
    );
}
