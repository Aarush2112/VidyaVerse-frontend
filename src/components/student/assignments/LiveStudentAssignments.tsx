"use client";

import { useQuery } from '@tanstack/react-query';
import { getAssignmentsForList, AssignmentListData } from "@/app/actions/student";
import { useRealtime } from '@/hooks/use-realtime';
import { QUERY_KEYS } from '@/lib/query-keys';
import { AssignmentClient, AssignmentData } from "@/components/student/assignments/AssignmentClient";
import { useUser } from '@clerk/nextjs';

interface LiveStudentAssignmentsProps {
    initialAssignments: AssignmentListData[];
}

export default function LiveStudentAssignments({ initialAssignments }: LiveStudentAssignmentsProps) {
    const { user } = useUser();
    const userId = user?.id || "guest";

    const { data: assignments } = useQuery({
        queryKey: QUERY_KEYS.studentAssignments(userId),
        queryFn: () => getAssignmentsForList(),
        initialData: initialAssignments,
    });

    // Subscribe to Assignment and Submission changes
    useRealtime('Assignment', QUERY_KEYS.studentAssignments(userId));
    useRealtime('Submission', QUERY_KEYS.studentAssignments(userId));

    return <AssignmentClient initialAssignments={assignments as AssignmentData[]} />;
}
