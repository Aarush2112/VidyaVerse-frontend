"use client";

import { motion } from "framer-motion";
import { Plus, Import } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyLibraryState() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full text-center p-8 animate-in fade-in zoom-in duration-500">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative mb-8"
            >
                <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
                {/* Abstract Digital Classroom SVG */}
                <svg
                    width="240"
                    height="180"
                    viewBox="0 0 240 180"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10 drop-shadow-2xl"
                >
                    <rect x="40" y="40" width="160" height="100" rx="4" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
                    <path d="M40 120H200" stroke="#3f3f46" strokeWidth="2" />
                    <rect x="100" y="60" width="40" height="40" rx="2" fill="#27272a" />
                    <path d="M120 60V100" stroke="#3f3f46" strokeWidth="1" />
                    <path d="M100 80H140" stroke="#3f3f46" strokeWidth="1" />
                    <circle cx="120" cy="80" r="12" fill="#6366f1" fillOpacity="0.8" />

                    {/* Books */}
                    <rect x="60" y="70" width="8" height="30" fill="#3f3f46" />
                    <rect x="72" y="65" width="8" height="35" fill="#52525b" />
                    <rect x="160" y="75" width="8" height="25" fill="#3f3f46" />
                </svg>
            </motion.div>

            <div className="max-w-md space-y-2">
                <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">Your Library is Empty</h2>
                <p className="text-zinc-400">
                    You haven&apos;t published any courses for the <span className="text-indigo-400 font-medium">Spring 2026</span> semester yet.
                </p>
            </div>

            <div className="flex items-center gap-4 mt-8">
                <Button variant="outline" className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300">
                    <Import className="mr-2 h-4 w-4" /> Import from Last Semester
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                    <Plus className="mr-2 h-4 w-4" /> Create New Course
                </Button>
            </div>
        </div>
    );
}
