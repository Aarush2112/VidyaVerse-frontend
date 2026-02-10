"use client";

import { motion } from "framer-motion";
import {
    PenLine,
    MoreVertical,
    Users,
    Calendar,
    Code2,
    FileText,
    History,
    Archive,
    Edit
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface AssignmentData {
    id: string;
    title: string;
    type: "Coding" | "Theory";
    batch: string;
    dueDate: string;
    submittedCount: number;
    totalCount: number;
    status: "Active" | "Draft" | "Closed";
}

interface AssignmentRowProps {
    assignment: AssignmentData;
}

export function AssignmentRow({ assignment }: AssignmentRowProps) {
    const isCoding = assignment.type === "Coding";
    const submissionRate = Math.round((assignment.submittedCount / assignment.totalCount) * 100);

    const statusConfig = {
        Active: "bg-emerald-500",
        Draft: "bg-zinc-500",
        Closed: "bg-rose-500",
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="group relative flex items-center bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden hover:border-white/10 hover:bg-zinc-900/60 transition-all duration-300"
        >
            {/* Status Strip */}
            <div className={cn("absolute left-0 top-0 bottom-0 w-1", statusConfig[assignment.status])} />

            <div className="flex-1 p-5 pl-8 flex flex-col md:flex-row md:items-center gap-6">
                {/* Primary Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-zinc-100 tracking-tight truncate group-hover:text-indigo-400 transition-colors">
                            {assignment.title}
                        </h3>
                        {isCoding ? (
                            <Code2 className="h-4 w-4 text-indigo-400" />
                        ) : (
                            <FileText className="h-4 w-4 text-amber-400" />
                        )}
                    </div>
                    <div className="flex items-center gap-x-4 text-xs font-mono text-zinc-500">
                        <span className="flex items-center gap-1.5 ">
                            <Users className="h-3 w-3" /> {assignment.batch}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Calendar className="h-3 w-3" /> Due: {assignment.dueDate}
                        </span>
                    </div>
                </div>

                {/* Submission Pulse (Center Visual) */}
                <div className="md:w-64 space-y-2">
                    <div className="flex justify-between items-end text-[10px] uppercase tracking-widest font-bold">
                        <span className="text-zinc-500">Submission Rate</span>
                        <span className="text-indigo-400 font-mono">
                            {assignment.submittedCount} / {assignment.totalCount} ({submissionRate}%)
                        </span>
                    </div>
                    <div className="relative h-2 w-full bg-zinc-800 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${submissionRate}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 rounded-full"
                        />
                    </div>
                </div>

                {/* Action Area */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-9 px-4 border-zinc-700 bg-transparent hover:bg-indigo-500/10 hover:text-indigo-400 hover:border-indigo-500/50 transition-all"
                    >
                        <PenLine className="h-4 w-4 mr-2" />
                        Grade
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-500 hover:text-white hover:bg-zinc-800">
                                <MoreVertical className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-zinc-950 border-white/10 text-zinc-300">
                            <DropdownMenuItem className="cursor-pointer focus:bg-indigo-500/10 focus:text-indigo-400">
                                <Edit className="mr-2 h-4 w-4" /> Edit Assignment
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer focus:bg-indigo-500/10 focus:text-indigo-400">
                                <History className="mr-2 h-4 w-4" /> Extend Deadline
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-rose-400 focus:text-rose-400 focus:bg-rose-500/10 cursor-pointer">
                                <Archive className="mr-2 h-4 w-4" /> Archive
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </motion.div>
    );
}
