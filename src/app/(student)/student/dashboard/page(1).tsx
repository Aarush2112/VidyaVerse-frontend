import { fetchCommandCenterData } from "@/app/actions/dashboard";
import LiveStudentDashboard from "@/components/student/dashboard/LiveStudentDashboard";

export default async function StudentDashboard() {
    const data = await fetchCommandCenterData();

    return <LiveStudentDashboard initialData={data} />;
}
