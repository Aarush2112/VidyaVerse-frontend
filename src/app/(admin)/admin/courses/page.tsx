import React from "react";
import { getAdminCourses, getCourseStats } from "@/app/actions/admin";
import { CourseList } from "@/components/admin/courses/CourseList";
import { Plus, BookOpen, AlertCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminCoursesPage() {
    const courses = await getAdminCourses();
    const stats = await getCourseStats();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Course Catalog</h1>
                    <p className="text-slate-500">Manage curriculum, review submissions, and track enrollment.</p>
                </div>
                <Button className="rounded-full px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-200 transition-all hover:scale-105">
                    <Plus size={18} className="mr-2" />
                    Create Course
                </Button>
            </div>

            {/* Glance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Live Courses"
                    value={stats.liveCourses}
                    badge="+2 this week"
                    badgeColor="emerald"
                    icon={BookOpen}
                    color="sky"
                />
                <StatCard
                    title="Action Needed"
                    value={stats.pendingReview}
                    subtitle="Pending Content Review"
                    icon={AlertCircle}
                    color="orange"
                />
                <StatCard
                    title="Total Enrollment"
                    value={stats.totalEnrollment.toLocaleString()}
                    subtitle="Across all active courses"
                    icon={Users}
                    color="purple"
                />
            </div>

            {/* The List Logic */}
            <CourseList data={courses} />
        </div>
    );
}

function StatCard({ title, value, badge, badgeColor, subtitle, icon: Icon, color }: any) {
    // Defines styles mapped to color prop
    const styles = {
        sky: { bg: "bg-sky-50", text: "text-sky-600", border: "border-sky-100" },
        orange: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-100" },
        purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100" },
    };

    const theme = styles[color as keyof typeof styles] || styles.sky;

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-1 flex items-center gap-2">
                    {title}
                </div>
                <div className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                    {value}
                    {badge && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full bg-${badgeColor}-100 text-${badgeColor}-700 font-bold tracking-normal align-middle`}>
                            {badge}
                        </span>
                    )}
                </div>
                {subtitle && <div className="text-xs font-medium text-slate-400 mt-1">{subtitle}</div>}
            </div>
            <div className={`p-4 rounded-xl ${theme.bg} ${theme.text}`}>
                <Icon size={24} />
            </div>
        </div>
    );
}
