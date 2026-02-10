"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, FileText, Calendar, Users, BarChart } from "lucide-react";

interface Assignment {
    id: string;
    title: string;
    type: "Coding" | "Theory" | "Quiz";
    batch: string;
    dueDate: string;
    submittedCount: number;
    totalCount: number;
    status: "Active" | "Draft" | "Closed";
}

interface SoftAssignmentTableProps {
    assignments: Assignment[];
}

export const SoftAssignmentTable = ({ assignments }: SoftAssignmentTableProps) => {
    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-2 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">
                <div className="col-span-4">Assignment</div>
                <div className="col-span-2">Batch</div>
                <div className="col-span-2">Due Date</div>
                <div className="col-span-2">Progress</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-1 text-right">Actions</div>
            </div>

            {/* Rows */}
            <div className="space-y-3">
                {assignments.map((assignment) => (
                    <div
                        key={assignment.id}
                        className="group grid grid-cols-12 gap-4 items-center px-6 py-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-violet-100 transition-all duration-300"
                    >
                        {/* Title & Type */}
                        <div className="col-span-4 flex items-center gap-4">
                            <div className={cn(
                                "h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                                assignment.type === "Coding" ? "bg-violet-50 text-violet-600" :
                                    assignment.type === "Theory" ? "bg-blue-50 text-blue-600" :
                                        "bg-amber-50 text-amber-600"
                            )}>
                                <FileText className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-sm font-bold text-slate-700 truncate group-hover:text-violet-700 transition-colors">
                                    {assignment.title}
                                </span>
                                <span className="text-xs text-slate-400 font-medium">
                                    {assignment.type === "Coding" ? "Coding Challenge" : "Theory Assessment"}
                                </span>
                            </div>
                        </div>

                        {/* Batch */}
                        <div className="col-span-2">
                            <div className="flex items-center gap-2">
                                <Users className="w-3 h-3 text-slate-400" />
                                <span className="text-sm font-semibold text-slate-600 font-mono">{assignment.batch}</span>
                            </div>
                        </div>

                        {/* Due Date */}
                        <div className="col-span-2">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-3 h-3 text-slate-400" />
                                <span className="text-sm font-medium text-slate-600">{assignment.dueDate}</span>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="col-span-2">
                            <div className="flex flex-col gap-1.5 w-full max-w-[120px]">
                                <div className="flex justify-between text-[10px] font-bold tracking-wider text-slate-400">
                                    <span>SUBMISSIONS</span>
                                    <span className={cn(
                                        assignment.submittedCount === 0 ? "text-slate-400" : "text-emerald-600"
                                    )}>{Math.round((assignment.submittedCount / assignment.totalCount) * 100)}%</span>
                                </div>
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className={cn(
                                            "h-full rounded-full transition-all duration-1000",
                                            assignment.status === "Closed" ? "bg-slate-300" : "bg-emerald-400"
                                        )}
                                        style={{ width: `${(assignment.submittedCount / assignment.totalCount) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="col-span-1">
                            <Badge variant="secondary" className={cn(
                                "border-none px-2.5 py-0.5 font-bold tracking-wide transition-colors",
                                assignment.status === "Active" ? "bg-emerald-50 text-emerald-600" :
                                    assignment.status === "Draft" ? "bg-amber-50 text-amber-600" :
                                        "bg-slate-100 text-slate-500"
                            )}>
                                {assignment.status.toUpperCase()}
                            </Badge>
                        </div>

                        {/* Actions */}
                        <div className="col-span-1 flex justify-end">
                            <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
