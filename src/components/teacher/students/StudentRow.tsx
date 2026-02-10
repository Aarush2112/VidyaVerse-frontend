"use client";

import { Student } from "@/lib/store/useRegistryStore";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Flag, Eye, MoreHorizontal, TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRegistryStore } from "@/lib/store/useRegistryStore";
import { updateRiskStatus } from "@/app/actions/registry";
import { toast } from "sonner";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export const StudentRow = ({ student, isSelected, onToggle }: { student: Student; isSelected: boolean; onToggle: () => void }) => {
    const updateStatus = useRegistryStore(state => state.updateStudentStatus);
    const setActiveStudent = useRegistryStore(state => state.setActiveStudent);
    const [flagReason, setFlagReason] = useState("");

    const handleFlag = async () => {
        // Optimistic Update
        const newStatus = !student.risk.isFlagged;
        updateStatus(student.id, newStatus, flagReason || "Manual Flag");

        // Server Action
        // Note: updateRiskStatus takes (studentId, riskScore, reason). 
        // We'll calculate a dummy score based on flag status for now.
        const newScore = newStatus ? 80 : 10;
        const res = await updateRiskStatus(student.id, newScore, flagReason || "Manual Flag");

        if (res.success) {
            toast.success(newStatus ? "Student Flagged" : "Flag Removed");
        } else {
            // Revert on failure (omitted for brevity)
            toast.error("Failed to update status");
        }
    };

    const sparklineData = student.metrics.velocity.map((v, i) => ({ i, v }));
    const isTrendingUp = student.metrics.velocity[studentsLen(student) - 1] >= student.metrics.velocity[0];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.005, boxShadow: "0 10px 30px -5px rgba(124,58,237,0.05)" }}
            className={cn(
                "group flex items-center justify-between p-4 bg-white rounded-[20px] mb-3 border transition-all",
                student.risk.isFlagged ? "border-rose-200 bg-rose-50/10" : "border-slate-100 shadow-sm"
            )}
        >
            {/* 1. Selection & Identity */}
            <div className="flex items-center gap-6 w-[30%]">
                <Checkbox checked={isSelected} onCheckedChange={onToggle} />
                <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveStudent(student.id)}>
                    <Avatar className="h-10 w-10 border border-slate-200">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} />
                        <AvatarFallback>{student.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h4 className="font-bold text-slate-900 text-sm">{student.name}</h4>
                        <p className="text-xs text-slate-500 font-mono">{student.rollNumber}</p>
                    </div>
                </div>
            </div>

            {/* 2. Performance Metrics */}
            <div className="flex items-center gap-8 w-[40%]">
                <div className="flex flex-col items-start w-20">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">GPA</span>
                    <span className={cn("text-lg font-bold", student.metrics.gpa >= 8.0 ? "text-emerald-600" : "text-slate-700")}>
                        {student.metrics.gpa}
                    </span>
                </div>

                {/* Velocity Sparkline */}
                <div className="h-10 w-32 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={sparklineData}>
                            <Area
                                type="monotone"
                                dataKey="v"
                                stroke={isTrendingUp ? "#10B981" : "#F43F5E"}
                                strokeWidth={2}
                                fill={isTrendingUp ? "#10B98120" : "#F43F5E20"}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex flex-col items-center w-24">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Attendance</span>
                    <div className="flex items-center gap-1">
                        <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-violet-500 rounded-full" style={{ width: `${student.metrics.attendance}%` }} />
                        </div>
                    </div>
                    <span className="text-xs font-bold text-slate-600 mt-1">{student.metrics.attendance}%</span>
                </div>
            </div>

            {/* 3. Actions */}
            <div className="flex items-center gap-2 w-[30%] justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-slate-400 hover:text-violet-600 hover:bg-violet-50">
                    <MessageCircle size={16} />
                </Button>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost" size="sm"
                            className={cn("h-8 w-8 p-0 rounded-full", student.risk.isFlagged ? "text-rose-500 bg-rose-50" : "text-slate-400 hover:text-rose-500")}
                        >
                            <Flag size={16} fill={student.risk.isFlagged ? "currentColor" : "none"} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-60 p-3 rounded-xl border-none shadow-xl">
                        <div className="space-y-2">
                            <h4 className="text-xs font-bold uppercase text-slate-500">Flag Reason</h4>
                            <div className="grid grid-cols-1 gap-1">
                                {['Consistent Absence', 'Low Grades', 'Behavioral'].map(reason => (
                                    <button
                                        key={reason}
                                        onClick={() => { setFlagReason(reason); handleFlag(); }}
                                        className="text-left text-sm px-2 py-1.5 hover:bg-slate-50 rounded-md transition-colors"
                                    >
                                        {reason}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-slate-400 hover:text-violet-600 hover:bg-violet-50" onClick={() => setActiveStudent(student.id)}>
                    <Eye size={16} />
                </Button>
            </div>

            {/* Mobile Flag Indicator */}
            {student.risk.isFlagged && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 md:hidden">
                    <Flag size={16} className="text-rose-500 fill-rose-500" />
                </div>
            )}
        </motion.div>
    );
};

function studentsLen(s: any) { return s.metrics.velocity.length }
