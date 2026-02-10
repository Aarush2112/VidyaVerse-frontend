import React from "react";
import { KnowledgeDashboardLayout } from "@/components/student/dashboard/KnowledgeDashboardLayout";
import { getAssignmentsForList } from "@/app/actions/student";
import LiveStudentAssignments from "@/components/student/assignments/LiveStudentAssignments";

export default async function AssignmentsPage() {
    const assignments = await getAssignmentsForList();

    return (
        <KnowledgeDashboardLayout>
            <LiveStudentAssignments initialAssignments={assignments} />
        </KnowledgeDashboardLayout>
    );
}
