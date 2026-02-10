"use client";

import React, { useState, use } from "react";
import ProctorGuard from "@/components/proctor/ProctorGuard";
import { ProctoringReport } from "@/components/student/exam/ProctoringReport";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function StudentExamPage({ params }: { params: Promise<{ assignmentId: string }> }) {
    const { assignmentId } = use(params);
    const [isExamReady, setIsExamReady] = useState(false);
    const [answer, setAnswer] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Stats Tracking
    const [startTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [trustScore, setTrustScore] = useState(100);
    const [stats, setStats] = useState({
        noise: 0,
        tabSwitch: 0,
        fullscreen: 0,
        noFace: 0,
        multipleFaces: 0
    });

    const handleViolation = (type: string) => {
        // Update Stats counts
        setStats(prev => ({
            ...prev,
            noise: type === "HIGH_AUDIO_NOISE" ? prev.noise + 1 : prev.noise,
            tabSwitch: type === "TAB_SWITCH" ? prev.tabSwitch + 1 : prev.tabSwitch,
            fullscreen: type === "FULL_SCREEN_EXIT" ? prev.fullscreen + 1 : prev.fullscreen,
            // Mock others for now as they aren't fully implemented in ProctorGuard yet
        }));

        // Rough trust score calc (ProctorGuard handles its own, but we can sync or approximate here if needed)
        // Actually, let's assume we receive the final score or just calculate it for the report if needed.
        // For better UX, we'll let ProctorGuard drive the termination, but we track counts here.
        setTrustScore(prev => Math.max(0, prev - (type === "TAB_SWITCH" ? 5 : 2)));
    };

    const handleFinish = () => {
        setEndTime(new Date());
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <ProctoringReport
                score={Math.round(trustScore)} // In real app, sync this exactly from ProctorGuard
                stats={stats}
                startTime={startTime}
                endTime={endTime}
            />
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <ProctorGuard
                examId={assignmentId}
                onViolation={handleViolation}
                onReady={() => setIsExamReady(true)}
                onTerminate={() => {
                    setAnswer("EXAM TERMINATED DUE TO LOW TRUST SCORE");
                    handleFinish();
                }}
            />

            {isExamReady && (
                <div className="container mx-auto p-8 max-w-4xl pt-24">
                    <header className="mb-8 border-b pb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-3xl font-bold text-slate-900">Final Exam: Data Structures</h1>
                            <div className="bg-red-50 text-red-600 px-4 py-2 rounded-full font-mono text-sm font-bold animate-pulse">
                                REC ●
                            </div>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            Please implement a Least Recently Used (LRU) Cache in Python.
                            Explain your time complexity for get() and put() operations.
                        </p>
                    </header>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <label className="block text-sm font-bold text-slate-700 mb-2"> Your Solution</label>
                            <Textarea
                                className="min-h-[400px] font-mono text-sm bg-slate-50"
                                placeholder="class LRUCache: ..."
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button
                                size="lg"
                                className="bg-slate-900 hover:bg-slate-800 text-white min-w-[200px]"
                                onClick={handleFinish}
                            >
                                Submit Exam
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
