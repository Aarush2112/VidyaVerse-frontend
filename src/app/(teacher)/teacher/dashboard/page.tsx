import React from "react";
import { fetchTeacherDashboardData } from "@/app/actions/teacher";
import { TeacherDashboardClient } from "@/components/teacher/dashboard/TeacherDashboardClient";

export default async function FacultyDashboardPage() {
    const data = await fetchTeacherDashboardData();

    return <TeacherDashboardClient data={data} />;
}
