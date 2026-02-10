import { fetchTeacherAssignments } from "@/app/actions/teacher";
import AssignmentsClient from "./AssignmentsClient";

export default async function AssignmentsPage() {
    const assignments = await fetchTeacherAssignments();

    return <AssignmentsClient initialAssignments={assignments} />;
}
