"use client";

import { useQuery } from '@tanstack/react-query';
import { getAssignmentsForList } from "@/app/actions/student";
import { useRealtime } from '@/hooks/use-realtime';
import { QUERY_KEYS } from '@/lib/query-keys';
import { AssignmentClient, AssignmentData } from "@/components/student/assignments/AssignmentClient";
interface LiveStudentAssignmentsProps {
    initialAssignments: AssignmentData[];
}

export default function LiveStudentAssignments({ initialAssignments }: LiveStudentAssignmentsProps) {
    const { data: assignments } = useQuery({
        queryKey: QUERY_KEYS.studentAssignments("student"),
        queryFn: () => getAssignmentsForList(),
        initialData: initialAssignments,
    });

    useRealtime('Assignment', QUERY_KEYS.studentAssignments("student"));
    useRealtime('Submission', QUERY_KEYS.studentAssignments("student"));

    return (
        <AssignmentClient 
            initialAssignments={assignments as AssignmentData[]} 
        />
    );
}
