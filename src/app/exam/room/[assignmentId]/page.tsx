"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { getAssignmentById } from "@/app/actions/assignments";
import { ProctorGuard } from "@/components/courses/assignments/ProctorGuard";
import { LightEditorWrapper } from "@/components/student/ide/LightEditorWrapper";
import { ConsoleDrawer } from "@/components/student/ide/ConsoleDrawer";
import { Button } from "@/components/ui/button";
import { Loader2, Timer, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";

export default function ExamRoomPage({ params }: { params: Promise<{ assignmentId: string }> }) {
    const router = useRouter();
    const { assignmentId } = use(params);

    const [assignment, setAssignment] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isExamReady, setIsExamReady] = useState(false);

    // Editor State
    const [code, setCode] = useState("");
    const [isExecuting, setIsExecuting] = useState(false);
    const [activeTab, setActiveTab] = useState<"test-cases" | "console">("test-cases");
    const [testResults, setTestResults] = useState<any[]>([]);

    // Timer State
    const [timeLeft, setTimeLeft] = useState(45 * 60); // Default 45 mins

    useEffect(() => {
        if (assignment?.timeLimit) {
            setTimeLeft(assignment.timeLimit * 60);
        }
    }, [assignment]);

    useEffect(() => {
        if (!isExamReady || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleAutoSubmit(); // Auto-submit on time up
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isExamReady, timeLeft]); // depend on timeLeft to allow clearing

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        async function loadData() {
            try {
                const data = await getAssignmentById(assignmentId);
                if (data) {
                    setAssignment(data);
                    // @ts-ignore
                    const starter = data.problems?.[0]?.starterCode || `// Write your solution for ${data.title}...`;
                    setCode(starter);
                } else {
                    toast.error("Assignment not found");
                    router.push("/student/dashboard");
                }
            } catch (error) {
                console.error("Failed to load assignment", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, [assignmentId, router]);

    const handleRunCode = async () => {
        setIsExecuting(true);
        setActiveTab("console");

        // Simulate Network Delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsExecuting(false);
        setTestResults([
            { id: 1, passed: true, input: "Test 1", output: "Pass", expected: "Pass" }
        ]);
        triggerConfetti();
    };

    const triggerConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#6366f1', '#8b5cf6', '#ec4899']
        });
    };

    const handleAutoSubmit = () => {
        toast.error("AUTO-SUBMITTING: Violation Limit Exceeded");
        // Trigger server action to submit code
        // For now, redirect to dashboard with query param
        router.push("/student/dashboard?status=terminated");
    };

    if (isLoading) {
        return <div className="h-screen w-full flex items-center justify-center bg-[#0B0F19]"><Loader2 className="animate-spin text-white" /></div>;
    }

    if (!isExamReady) {
        return (
            <ProctorGuard
                examId={assignmentId}
                onViolation={(type) => console.log("Log Violation:", type)}
                onReady={() => setIsExamReady(true)}
                onTerminate={handleAutoSubmit}
            />
        );
    }

    return (
        <div className="flex h-screen flex-col bg-[#0B0F19]">
            {/* Security Overlay - Keeps ProctorGuard Active in Background */}
            <div className="absolute top-0 left-0 w-0 h-0 overflow-hidden">
                <ProctorGuard
                    examId={assignmentId}
                    onViolation={(type) => console.log("Log Violation:", type)}
                    onReady={() => { }}
                    onTerminate={handleAutoSubmit}
                />
            </div>

            {/* Exam Header */}
            <header className="flex h-16 items-center justify-between border-b border-white/10 px-6 bg-[#0B0F19]">
                <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
                        Ex
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-white">{assignment?.title}</h1>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-wider">
                            <span className="flex items-center gap-1 text-red-500 font-bold animate-pulse">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> REC
                            </span>
                            <span>•</span>
                            <span>Proctored Session</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-colors ${timeLeft < 300 ? 'bg-red-500/10 border-red-500/30 text-red-400 animate-pulse' : 'bg-white/5 border-white/10 text-slate-300'
                        }`}>
                        <Timer size={14} />
                        <span>{formatTime(timeLeft)}</span>
                    </div>
                    <Button
                        size="sm"
                        onClick={handleRunCode}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                        disabled={isExecuting}
                    >
                        {isExecuting ? <Loader2 className="animate-spin h-4 w-4" /> : "Run Code"}
                    </Button>
                    <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => router.push("/student/dashboard")}
                    >
                        Submit Exam
                    </Button>
                </div>
            </header>

            {/* Exam Body - Split View */}
            <div className="flex-1 flex overflow-hidden">
                {/* Problem Description */}
                <div className="w-1/3 border-r border-white/10 overflow-y-auto p-6 text-slate-300">
                    <h2 className="text-xl font-bold text-white mb-4">Problem Statement</h2>
                    <div className="prose prose-invert prose-sm max-w-none">
                        <p>{assignment.description || "Implement the solution..."}</p>
                        {/* Mock Problem Content */}
                        <h3>Instructions</h3>
                        <ul>
                            <li>Write an efficient algorithm.</li>
                            <li>Do not use external libraries.</li>
                            <li>Ensure time complexity is O(n).</li>
                        </ul>
                    </div>
                </div>

                {/* Editor & Console */}
                <div className="w-2/3 flex flex-col bg-[#1e1e1e]">
                    <div className="flex-1 relative">
                        <LightEditorWrapper
                            code={code}
                            onChange={(val) => setCode(val || "")}
                        // Force dark theme for exam mode in wrapper if possible, 
                        // or we just accept light mode for now as wrapper is "LightEditorWrapper"
                        />
                    </div>

                    {/* Console Output */}
                    <div className="h-48 border-t border-white/10 bg-[#0B0F19]">
                        <ConsoleDrawer
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            testResults={testResults}
                            output={[]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
