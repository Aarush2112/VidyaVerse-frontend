"use client";

import { motion } from "framer-motion";
import { Plus, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyAssignmentsState() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] w-full text-center p-8 animate-in fade-in zoom-in duration-500">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative mb-8"
            >
                <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
                <svg
                    width="200"
                    height="160"
                    viewBox="0 0 200 160"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10 drop-shadow-2xl"
                >
                    <rect x="40" y="20" width="120" height="120" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
                    <path d="M60 50H140" stroke="#3f3f46" strokeWidth="2" strokeLinecap="round" />
                    <path d="M60 70H140" stroke="#3f3f46" strokeWidth="2" strokeLinecap="round" />
                    <path d="M60 90H100" stroke="#3f3f46" strokeWidth="2" strokeLinecap="round" />

                    {/* Checkbox circles */}
                    <circle cx="50" cy="50" r="3" fill="#6366f1" />
                    <circle cx="50" cy="70" r="3" fill="#6366f1" />
                    <circle cx="50" cy="90" r="3" fill="#3f3f46" />

                    {/* Flooting Code Brackets */}
                    <path d="M160 40L175 55L160 70" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M40 100L25 115L40 130" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </motion.div>

            <div className="max-w-md space-y-2">
                <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">No active assessments</h2>
                <p className="text-zinc-400">
                    Deploy your first coding challenge or theory assessment to start tracking student progress.
                </p>
            </div>

            <div className="mt-8">
                <Button className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                    <Plus className="mr-2 h-4 w-4" /> Create from Template
                </Button>
            </div>
        </div>
    );
}
