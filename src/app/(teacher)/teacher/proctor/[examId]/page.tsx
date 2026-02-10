import { getExamProctorData } from "@/app/actions/proctor";
import ProctorDashboard from "@/components/teacher/proctor/ProctorDashboard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProctorPage(props: { params: Promise<{ examId: string }> }) {
    const params = await props.params;
    const { examId } = params;
    const data = await getExamProctorData(examId);

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white space-y-4">
                <h1 className="text-2xl font-bold text-red-500">Exam Not Found</h1>
                <p className="text-slate-400">The exam ID {examId} is invalid or you do not have permission to view it.</p>
                <Link href="/teacher/proctor">
                    <Button variant="secondary">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <ProctorDashboard
            courseId={data.courseId}
            courseTitle={`${data.courseTitle} - ${data.assignmentTitle}`}
            initialStudents={data.students}
            backHref="/teacher/proctor"
        />
    );
}
