"use client";

import React, { useState } from "react";
import { MoreHorizontal, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CoursePreviewDrawer } from "./CoursePreviewDrawer";
import { cn } from "@/lib/utils";

// Mock Data
const MOCK_COURSES = [
    {
        id: 1,
        title: "Advanced React Patterns",
        code: "CS-401",
        instructor: { name: "Sarah Drasner", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
        enrollment: 45,
        capacity: 60,
        status: "Published",
        date: "Oct 24, 2024"
    },
    {
        id: 2,
        title: "System Design Interview",
        code: "CS-505",
        instructor: { name: "Alex Xu", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
        enrollment: 12,
        capacity: 100,
        status: "Pending Review",
        date: "Oct 23, 2024"
    },
    {
        id: 3,
        title: "Introduction to Python",
        code: "CS-101",
        instructor: { name: "Guido van Rossum", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Guido" },
        enrollment: 88,
        capacity: 90,
        status: "Published",
        date: "Oct 20, 2024"
    },
    {
        id: 4,
        title: "Machine Learning Ops",
        code: "AI-302",
        instructor: { name: "Andrew Ng", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andrew" },
        enrollment: 5,
        capacity: 40,
        status: "Draft",
        date: "Oct 18, 2024"
    },
];

export function RichCourseTable() {
    const [selectedCourse, setSelectedCourse] = useState<any | null>(null);

    return (
        <div className="space-y-4">
            {/* Headers (Visual only) */}
            <div className="grid grid-cols-12 px-6 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <div className="col-span-4">Course Identity</div>
                <div className="col-span-3">Instructor</div>
                <div className="col-span-2">Health</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1 text-right">Actions</div>
            </div>

            {/* Floating Rows */}
            {MOCK_COURSES.map((course) => (
                <div
                    key={course.id}
                    onClick={() => setSelectedCourse(course)}
                    className="group bg-white rounded-[20px] p-4 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer grid grid-cols-12 items-center gap-4"
                >
                    {/* 1. Identity */}
                    <div className="col-span-4 flex items-center gap-4">
                        <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xs font-bold shadow-sm">
                            {course.code.split('-')[0]}
                        </div>
                        <div>
                            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                {course.title}
                            </div>
                            <div className="text-xs text-slate-400 font-medium">
                                {course.code}
                            </div>
                        </div>
                    </div>

                    {/* 2. Instructor */}
                    <div className="col-span-3 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-slate-100 overflow-hidden">
                            <img src={course.instructor.avatar} alt={course.instructor.name} />
                        </div>
                        <span className="text-sm font-medium text-slate-600 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                            {course.instructor.name}
                        </span>
                    </div>

                    {/* 3. Enrollment Health */}
                    <div className="col-span-2">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1.5">
                            <span>{course.enrollment}/{course.capacity} Seats</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                                style={{ width: `${(course.enrollment / course.capacity) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* 4. Status */}
                    <div className="col-span-2">
                        <span className={cn(
                            "px-3 py-1.5 rounded-full text-xs font-bold border",
                            course.status === "Published" && "bg-emerald-50 text-emerald-600 border-emerald-100",
                            course.status === "Pending Review" && "bg-orange-50 text-orange-600 border-orange-100 animate-pulse",
                            course.status === "Draft" && "bg-slate-100 text-slate-500 border-slate-200"
                        )}>
                            {course.status}
                        </span>
                    </div>

                    {/* 5. Actions */}
                    <div className="col-span-1 flex justify-end">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-300 group-hover:text-slate-600 hover:bg-slate-100 rounded-full"
                            onClick={(e) => {
                                e.stopPropagation();
                                // Open dropdown menu
                            }}
                        >
                            <MoreHorizontal size={16} />
                        </Button>
                    </div>
                </div>
            ))}

            <CoursePreviewDrawer
                course={selectedCourse}
                open={!!selectedCourse}
                onClose={() => setSelectedCourse(null)}
            />
        </div>
    );
}
