"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Clock,
    AlertCircle,
    Play,
    FileCode2,
    BrainCircuit,
    TerminalSquare,
    CheckCircle2,
    Search,
    Filter
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface AssignmentData {
    id: string;
    title: string;
    course: string;
    type: string;
    dueDate: string | null;
    status: 'ACTIVE' | 'UPCOMING' | 'COMPLETED' | 'MISSED' | 'SAVED';
    duration: string;
    questions: number;
    score?: number;
    isProctored: boolean;
}

interface AssignmentClientProps {
    initialAssignments: AssignmentData[];
}

export function AssignmentClient({ initialAssignments }: AssignmentClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("ALL");

    const filteredAssignments = initialAssignments.filter(assignment => {
        const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            assignment.course.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === "ALL" || assignment.status === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-[#F3F4F6] p-6 md:p-10 font-friendly max-w-7xl mx-auto">

            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Assignments</h1>
                    <p className="text-slate-500 font-medium">Manage your exams, labs, and quizzes.</p>
                </div>

                <div className="flex gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" size={18} />
                        <Input
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 rounded-full border-slate-200 bg-white shadow-soft-sm focus-visible:ring-violet-500 w-64 transition-all"
                        />
                    </div>
                    {/* Simple Filter Toggle for demo */}
                    <Button
                        variant="outline"
                        onClick={() => setFilter(filter === "ALL" ? "ACTIVE" : "ALL")}
                        className={cn(
                            "rounded-full border-slate-200 font-bold transition-all",
                            filter !== "ALL" ? "bg-violet-50 text-violet-600 border-violet-200" : "text-slate-600 hover:bg-white hover:text-violet-600 hover:border-violet-100"
                        )}
                    >
                        <Filter size={16} className="mr-2" />
                        {filter === "ALL" ? "Filter" : "Active Only"}
                    </Button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredAssignments.length > 0 ? (
                        filteredAssignments.map((assignment, index) => (
                            <AssignmentCard key={assignment.id} data={assignment} index={index} />
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full py-20 text-center text-slate-400"
                        >
                            No assignments found.
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </div>
    );
}

function AssignmentCard({ data, index }: { data: AssignmentData, index: number }) {
    const isProctored = data.isProctored || data.type === "PROCTORED_EXAM" || data.type === "CONTEST"; // Map types
    const isActive = data.status === "ACTIVE";
    const isCompleted = data.status === "COMPLETED";

    // Determine link based on type
    const href = isProctored
        ? `/student/exam/${data.id}` // Exam runner
        : `/student/ide?assignmentId=${data.id}`; // Standard coding lab

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
                "group relative bg-white rounded-[32px] p-8 shadow-soft-sm border border-slate-100 flex flex-col md:flex-row gap-6 md:items-center overflow-hidden transition-all hover:shadow-soft-lg hover:-translate-y-1 duration-300",
                isActive && "ring-2 ring-violet-500/10 border-violet-100"
            )}
        >
            {/* Decoration for Proctored */}
            {isProctored && isActive && (
                <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-violet-500 to-rose-500" />
            )}

            {/* Icon Box */}
            <div className={cn(
                "h-20 w-20 rounded-3xl flex items-center justify-center shrink-0 shadow-inner transition-colors",
                data.type === 'CONTEST' || data.type === 'PROCTORED_EXAM' ? "bg-rose-50 text-rose-500" :
                    data.type === 'ASSIGNMENT' ? "bg-violet-50 text-violet-500" :
                        "bg-blue-50 text-blue-500"
            )}>
                {(data.type === 'CONTEST' || data.type === 'PROCTORED_EXAM') && <BrainCircuit size={32} strokeWidth={1.5} />}
                {data.type === 'ASSIGNMENT' && <TerminalSquare size={32} strokeWidth={1.5} />}
                {data.type === 'QUIZ' && <FileCode2 size={32} strokeWidth={1.5} />}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                    <StatusBadge status={data.status} />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{data.course}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-800 leading-tight mb-3 group-hover:text-violet-700 transition-colors">
                    {data.title}
                </h3>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold text-slate-500">
                    <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                        <Clock size={14} className="text-slate-400" /> {data.duration}
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                        <FileCode2 size={14} className="text-slate-400" /> {data.questions} Questions
                    </span>
                    {data.dueDate && (
                        <span className={cn(
                            "flex items-center gap-1.5 px-2 py-1 rounded-md",
                            data.status === 'ACTIVE' ? "bg-rose-50 text-rose-600" : "bg-slate-50"
                        )}>
                            <AlertCircle size={14} className={data.status === 'ACTIVE' ? "text-rose-500" : "text-slate-400"} />
                            Due: {data.dueDate}
                        </span>
                    )}
                </div>
            </div>

            {/* Action Button */}
            <div className="md:ml-auto flex-shrink-0">
                {isCompleted ? (
                    <Button variant="ghost" className="rounded-full px-6 text-slate-400 bg-slate-50 hover:bg-slate-100" disabled>
                        <CheckCircle2 size={18} className="mr-2" /> Score: {data.score || 0}%
                    </Button>
                ) : (
                    <Link href={href}>
                        <Button className={cn(
                            "rounded-full font-bold px-8 h-12 shadow-md transition-all",
                            isActive
                                ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:shadow-violet-500/30 text-white hover:scale-105"
                                : "bg-slate-900 text-white hover:bg-slate-800"
                        )}>
                            {isActive ? (
                                <>
                                    <Play size={18} className="mr-2 fill-current" /> Start
                                </>
                            ) : "View"}
                        </Button>
                    </Link>
                )}
            </div>
        </motion.div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles = {
        ACTIVE: "bg-emerald-100 text-emerald-700",
        UPCOMING: "bg-slate-100 text-slate-600",
        SAVED: "bg-amber-100 text-amber-700",
        COMPLETED: "bg-slate-100 text-slate-400 line-through decoration-slate-300",
        MISSED: "bg-rose-100 text-rose-600"
    };

    return (
        <span className={cn(
            "px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide",
            styles[status as keyof typeof styles] || styles.UPCOMING
        )}>
            {status}
        </span>
    );
}
