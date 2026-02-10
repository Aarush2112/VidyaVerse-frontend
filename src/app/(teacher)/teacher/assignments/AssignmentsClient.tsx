"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SoftAssignmentsLayout } from "@/components/teacher/assignments/SoftAssignmentsLayout";
import { InsightWidget } from "@/components/teacher/assignments/InsightWidget";
import { SoftAssignmentTable } from "@/components/teacher/assignments/SoftAssignmentTable";
import { TeacherAssignment } from "@/app/actions/teacher";

interface AssignmentsClientProps {
    initialAssignments: TeacherAssignment[];
}

export default function AssignmentsClient({ initialAssignments }: AssignmentsClientProps) {
    const router = useRouter();
    const [filter, setFilter] = useState("All");

    const filteredAssignments = initialAssignments.filter(a => {
        if (filter === "All") return true;
        if (filter === "Active") return a.status === "Active";
        if (filter === "Drafts") return a.status === "Draft";
        if (filter === "Past") return a.status === "Closed";
        return true;
    });

    // Calculate metrics
    const activeCount = initialAssignments.filter(a => a.status === "Active").length;
    const pendingReviewCount = initialAssignments.reduce((sum, a) => sum + (a.pendingCount || 0), 0);
    // Determine trend or velocity if possible, else mock
    // Example: average submission rate? 
    // submittedCount / totalCount
    let totalSubmissions = 0;
    let totalCapacity = 0;
    initialAssignments.forEach(a => {
        totalSubmissions += a.submittedCount;
        totalCapacity += a.totalCount;
    });
    const avgVelocity = totalCapacity > 0 ? Math.round((totalSubmissions / totalCapacity) * 100) : 0;

    return (
        <SoftAssignmentsLayout
            title="Creative Studio"
            filter={filter}
            setFilter={setFilter}
            onCreate={() => router.push("/teacher/assignments/create")}
        >
            <div className="space-y-10">
                {/* 1. Insight Widgets */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InsightWidget
                        type="active"
                        value={activeCount.toString().padStart(2, '0')}
                        label="Active Campaigns"
                        trend="+1 this week" // This would require historical data, leaving as static or random
                    />
                    <InsightWidget
                        type="grading"
                        value={pendingReviewCount.toString().padStart(2, '0')}
                        label="Pending Review"
                        trend={pendingReviewCount > 10 ? "Urgent" : "On Track"}
                    />
                    <InsightWidget
                        type="score"
                        value={`${avgVelocity}%`}
                        label="Avg. Class Velocity"
                    />
                </div>

                {/* 2. Task Stream (Table View) */}
                <div>
                    <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-6 px-2">Task Registry</h2>
                    <SoftAssignmentTable assignments={filteredAssignments} />
                </div>
            </div>
        </SoftAssignmentsLayout>
    );
}
