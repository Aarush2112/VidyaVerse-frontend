import ProctorDashboard from "@/components/teacher/proctor/ProctorDashboard"
import { getProctorDashboardData } from "@/app/actions/proctor"

export const dynamic = "force-dynamic"

export default async function ProctorPage() {
    const data = await getProctorDashboardData()

    if (!data) {
        return <div className="text-white p-10">No courses found. Create a course first.</div>
    }

    return <ProctorDashboard
        courseId={data.courseId}
        courseTitle={data.courseTitle}
        initialStudents={data.students}
        backHref="/teacher/dashboard"
    />
}
