"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { IdeLayout } from "@/components/student/ide/IdeLayout";
import { EditorHeader } from "@/components/student/ide/EditorHeader";
import { ProblemDescription } from "@/components/student/ide/ProblemDescription";
import { TestCasePanel } from "@/components/student/ide/TestCasePanel";
import { submitCode } from "@/lib/judge0";
import { submitSolution } from "@/app/actions/submit-solution";

export function IDEClient({ assignment, problem }: { assignment: any, problem: any }) {
    const [code, setCode] = useState("// Write your solution here\n");
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState<"output" | "testcases">("output");

    const languageId = 63; // Hardcoded JS for now, should map from assignment.allowedLanguages

    const handleRun = async () => {
        setIsRunning(true);
        setOutput("Running on Server...");
        try {
            // Using the Sample Test Case input if available, else empty
            const sampleInput = problem.testCases.find((tc: any) => !tc.isHidden)?.input || "";

            const result = await submitCode(code, languageId, sampleInput);

            if (result.status.id === 3) {
                setOutput(result.stdout || "No output");
            } else {
                setOutput(`Error: ${result.status.description}\n${result.stderr || result.compile_output}`);
            }
        } catch (error: any) {
            setOutput(`Execution Error: ${error.message}`);
        } finally {
            setIsRunning(false);
        }
    };

    const handleSubmit = async () => {
        if (!assignment || !problem) return;
        setIsSubmitting(true);
        setOutput("Submitting Solution...");
        try {
            const result = await submitSolution(assignment.id, problem.id, code, languageId);

            if (result.status === "ACCEPTED") {
                setOutput(`✅ ACCEPTED!\n\n${result.stdout || ""}`);
            } else {
                setOutput(`❌ ${result.status}\n\n${result.stderr || result.compile_output || "Wrong Answer"}`);
            }
        } catch (error: any) {
            setOutput(`Submission Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <IdeLayout
            header={<div />}
            footer={<div />}
            problemPane={
                <ProblemDescription
                    title={problem?.title || "Untitled Problem"}
                    difficulty={problem?.difficulty || "Medium"}
                    description={problem?.description || "No description available."}
                />
            }
            editorPane={
                <div className="h-full flex flex-col">
                    <EditorHeader
                        onRun={handleRun}
                        onSubmit={handleSubmit}
                        isRunning={isRunning}
                        isSubmitting={isSubmitting}
                    />
                    <div className="flex-1 relative">
                        <Editor
                            height="100%"
                            defaultLanguage="javascript"
                            theme="vs-dark"
                            value={code}
                            onChange={(val) => setCode(val || "")}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                scrollBeyondLastLine: false,
                                padding: { top: 16 },
                                fontFamily: "JetBrains Mono, monospace",
                                smoothScrolling: true,
                                cursorBlinking: "smooth",
                                cursorSmoothCaretAnimation: "on"
                            }}
                        />
                    </div>
                    {/* Status Bar */}
                    <div className="h-6 bg-zinc-900 border-t border-zinc-800 flex items-center justify-end px-4 text-[10px] text-zinc-500 gap-4 font-mono select-none">
                        <span>Ln {code.split("\n").length}, Col 1</span>
                        <span>UTF-8</span>
                        <span>JavaScript</span>
                        <span className="flex items-center gap-1 text-zinc-400"><span className="w-2 h-2 rounded-full bg-zinc-600"></span> Saved</span>
                    </div>
                </div>
            }
            terminalPane={
                <TestCasePanel
                    testCases={problem?.testCases || []}
                    onRun={handleRun}
                    isRunning={isRunning}
                />
            }
        />
    );
}
