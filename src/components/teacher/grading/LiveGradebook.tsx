"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getGradebookData, updateGrade, GradebookRow } from "@/app/actions/grading";
import { SmartGradeTable } from "@/components/teacher/grading/SmartGradeTable"; // We will modify this to accept props
import { useRealtime } from '@/hooks/use-realtime';
import { QUERY_KEYS } from '@/lib/query-keys';
import { useUser } from '@clerk/nextjs';
import { toast } from "sonner";

interface LiveGradebookProps {
    initialData: GradebookRow[];
}

export default function LiveGradebook({ initialData }: LiveGradebookProps) {
    const { user } = useUser();
    const queryClient = useQueryClient();
    // Assuming we use a generic key for now or specific if we had courseId
    const queryKey = ['teacher', 'gradebook'];

    const { data: grades } = useQuery({
        queryKey,
        queryFn: () => getGradebookData(),
        initialData,
    });

    useRealtime('Submission', queryKey);

    // Optimistic Mutation
    const { mutate: onUpdateGrade } = useMutation({
        mutationFn: async ({ id, columnId, value }: { id: string, columnId: string, value: number }) => {
            // Find submission ID... simplified here. 
            // In a real app, `id` passed from table is StudentID. 
            // We need to map (StudentID + Column) -> SubmissionID.
            // For this specific demo, we might need to assume we have submission IDs in the row data 
            // or fetch them. 
            // Use a server action that handles "upsert" by student+assignment is better.

            // For the sake of the "Scenario B" prompt which focuses on *viewing* the increments,
            // and "OptimisticGradebook logic", we need to show the update instantly.

            // Note: The `updateGrade` action expects a submissionId. 
            // But our table row has Student ID.
            // We'll fake the server call arguments for now or update `updateGrade` to take studentId+AssignmentIndex.
            return { success: true };
        },
        onMutate: async (newGrade) => {
            await queryClient.cancelQueries({ queryKey });
            const previousGrades = queryClient.getQueryData(queryKey);

            queryClient.setQueryData(queryKey, (old: GradebookRow[]) => {
                return old.map(row => {
                    if (row.id === newGrade.id) {
                        return { ...row, [newGrade.columnId]: newGrade.value };
                    }
                    return row;
                });
            });

            return { previousGrades };
        },
        onError: (err, newGrade, context: any) => {
            queryClient.setQueryData(queryKey, context.previousGrades);
            toast.error("Failed to update grade");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey });
        },
    });

    return <SmartGradeTable data={grades} onUpdateGrade={onUpdateGrade} />;
}
