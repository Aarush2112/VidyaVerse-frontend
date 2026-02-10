"use client";

import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle, Archive, Edit } from "lucide-react";

interface CoursePreviewDrawerProps {
    course: any | null; // Replace 'any' with proper type if available
    open: boolean;
    onClose: () => void;
}

export function CoursePreviewDrawer({ course, open, onClose }: CoursePreviewDrawerProps) {
    if (!course) return null;

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="sm:max-w-md md:max-w-lg overflow-y-auto">
                <SheetHeader className="mb-6">
                    <SheetTitle className="font-poppins text-2xl font-bold text-slate-900">
                        {course.title}
                    </SheetTitle>
                    <SheetDescription>
                        {course.code} • {course.instructor.name}
                    </SheetDescription>
                </SheetHeader>

                <div className="space-y-8">
                    {/* Hero Image */}
                    <div className="h-48 w-full bg-slate-100 rounded-2xl overflow-hidden relative">
                        {/* Placeholder for actual image */}
                        <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                            <BookOpen size={48} />
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="text-xs text-slate-500 font-bold uppercase">Enrollments</div>
                            <div className="text-xl font-bold text-slate-900">{course.enrollment}/{course.capacity}</div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="text-xs text-slate-500 font-bold uppercase">Status</div>
                            <Badge className="mt-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none">
                                {course.status}
                            </Badge>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h4 className="font-bold text-slate-800 mb-2">Description</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            This course covers the fundamentals of {course.title}, designed for students looking to master the core concepts.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-xl">
                            <CheckCircle size={18} className="mr-2" />
                            Quick Approve
                        </Button>
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="h-12 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50">
                                <Edit size={18} className="mr-2" />
                                Edit Content
                            </Button>
                            <Button variant="outline" className="h-12 rounded-xl border-slate-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-100">
                                <Archive size={18} className="mr-2" />
                                Archive
                            </Button>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
