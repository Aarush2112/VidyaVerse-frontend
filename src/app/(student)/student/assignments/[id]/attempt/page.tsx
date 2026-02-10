"use client";

import React from "react";
import { ProctorLobby } from "@/components/student/exam/ProctorLobby";
import { ExamArena } from "@/components/student/exam/ExamArena";
import { useExamStore } from "@/lib/store/useExamStore";
import { Toaster } from "sonner";

export default function AssignmentAttemptPage() {
    const { status } = useExamStore();

    return (
        <>
            <Toaster position="top-center" richColors />
            {status === 'LOBBY' && <ProctorLobby />}
            {status === 'IN_PROGRESS' && <ExamArena />}
            {status === 'SUBMITTED' && (
                <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6]">
                    <h1 className="text-2xl font-bold text-slate-900">Exam Submitted! 🎉</h1>
                </div>
            )}
        </>
    );
}
