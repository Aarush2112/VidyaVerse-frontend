"use client";

import React, { useState, useEffect } from "react";
import { IdeLayout } from "@/components/student/ide/IdeLayout";
import { LightEditorWrapper } from "@/components/student/ide/LightEditorWrapper";
import { ConsoleDrawer } from "@/components/student/ide/ConsoleDrawer";
import { InstructionPad } from "@/components/student/ide/InstructionPad";
import { GenerateProblemModal } from "@/components/student/ide/GenerateProblemModal";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Play,
    Sparkles,
    Send,
    Loader2,
    Layout,
    Code2,
    Terminal as TerminalIcon,
    Sun,
    Moon
} from "lucide-react";
import confetti from "canvas-confetti";
import { useRouter, useSearchParams } from "next/navigation";
import { getProblemById, submitSolution } from "@/app/actions/ide";
import { executeCodeWithAI } from "@/app/actions/sandbox";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function StudentIdePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const problemId = searchParams.get("problemId");

    // Problem State
    const [problem, setProblem] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(!!problemId);

    // Editor & Execution State
    const [code, setCode] = useState("");
    const [isExecuting, setIsExecuting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState<"test-cases" | "console">("console");
    const [testResults, setTestResults] = useState<any[]>([]);
    const [consoleOutput, setConsoleOutput] = useState<string[]>([]);

    // Modal State
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);

    // UI State
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [language, setLanguage] = useState("javascript");

    useEffect(() => {
        async function loadProblem() {
            if (!problemId) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const data = await getProblemById(problemId);
                if (data) {
                    setProblem(data);
                    setCode(data.starterCode || "// Write your solution here...");
                    setConsoleOutput(["System: Problem loaded successfully.", `Topic: ${data.title}`]);
                }
            } catch (error) {
                console.error("Failed to load problem", error);
                toast.error("Error", {
                    description: "Failed to load the coding challenge."
                });
            } finally {
                setIsLoading(false);
            }
        }
        loadProblem();
    }, [problemId]);

    const handleRunCode = async () => {
        if (!code.trim()) return;
        setIsExecuting(true);
        setConsoleOutput([]); // Clear previous

        // Switch to console tab effectively for runs
        // For test cases, we'll switch specific logic below
        setActiveTab("console");

        try {
            // --- OPTION 1: PYTHON (AI SIMULATION) ---
            if (language === "python") {
                setConsoleOutput(["Initializing Python 3.10 Runtime...", "> Executing remote container..."]);

                // Server Action Call
                const result = await executeCodeWithAI(code, "python");

                if (result.success) {
                    setConsoleOutput(prev => [
                        ...prev,
                        "--------------------------------",
                        ...result.output,
                        "--------------------------------",
                        `Process finished with exit code 0`
                    ]);
                } else {
                    setConsoleOutput(prev => ["Error:", ...result.output]);
                }
                setIsExecuting(false);
                return;
            }

            // --- OPTION 2: JAVASCRIPT ---

            // A. PROBLEM MODE (Test Cases)
            if (problem) {
                setActiveTab("test-cases");
                setTestResults([]);
                setConsoleOutput(prev => [...prev, "Running tests against solution..."]);

                // Client-Side JS Execution Runner
                const results = problem.testCases.map((tc: any) => {
                    try {
                        const runUserCode = new Function(`
                            ${code}
                            return solution;
                        `);

                        const solutionFn = runUserCode();
                        let inputArgs;
                        try { inputArgs = JSON.parse("[" + tc.input + "]"); } catch { inputArgs = [tc.input]; }

                        const actualOutput = solutionFn(...inputArgs);
                        const expectedOutput = JSON.parse(tc.expectedOutput);
                        const passed = JSON.stringify(actualOutput) === JSON.stringify(expectedOutput);

                        return { passed, input: tc.input, expected: expectedOutput, actual: actualOutput };
                    } catch (e: any) {
                        return { passed: false, input: tc.input, expected: tc.expectedOutput, actual: e.message, error: true };
                    }
                });

                setTestResults(results);
                const allPassed = results.every((r: any) => r.passed);

                if (allPassed) {
                    setConsoleOutput(prev => [...prev, "✔ All test cases passed!"]);
                    triggerConfetti();
                } else {
                    setConsoleOutput(prev => [...prev, "✘ Some test cases failed. Keep debugging!"]);
                }
            }
            // B. SANDBOX MODE (Simple Output)
            else {
                setConsoleOutput(["> Executing JavaScript (Client V8)...", "--------------------------------"]);

                const logs: string[] = [];
                const mockConsole = {
                    log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
                    error: (...args: any[]) => logs.push("Error: " + args.map(a => String(a)).join(' ')),
                    warn: (...args: any[]) => logs.push("Warn: " + args.map(a => String(a)).join(' '))
                };

                try {
                    // Wrap code to hijack console
                    const sandboxFn = new Function('console', code);
                    sandboxFn(mockConsole);

                    if (logs.length === 0) logs.push("(No output returned)");
                    setConsoleOutput(prev => [...prev, ...logs]);
                } catch (e: any) {
                    setConsoleOutput(prev => [...prev, `Runtime Error: ${e.message}`]);
                }
            }

        } catch (error) {
            console.error(error);
            setConsoleOutput(prev => [...prev, "Error: Execution failed."]);
        } finally {
            setIsExecuting(false);
        }
    };

    const handleSubmit = async () => {
        if (!problem || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const allPassed = testResults.length > 0 && testResults.every((r: any) => r.passed);

            const result = await submitSolution(problem.id, code, allPassed);

            if (result.success) {
                toast.success("Achievement Unlocked!", {
                    description: "Successfully submitted. +" + result.xpEarned + " XP earned!",
                });
                triggerConfetti();
            } else {
                toast.error("Submission Recorded", {
                    description: "Solution submitted but didn't pass all tests.",
                });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const triggerConfetti = () => {
        confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#7C3AED', '#C084FC', '#818CF8']
        });
    };

    if (isLoading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-[#F2F5F9] gap-4">
                <div className="h-20 w-20 relative">
                    <div className="absolute inset-0 rounded-full border-4 border-violet-100 border-t-violet-600 animate-spin" />
                    <div className="absolute inset-4 rounded-full border-4 border-purple-50 border-t-purple-400 animate-[spin_1.5s_linear_infinite_reverse]" />
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] animate-pulse">
                    Forging Workspace
                </div>
            </div>
        );
    }

    // Header Content - Minimalist Title
    const Header = (
        <div className="h-full w-full flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-400 hover:text-violet-600 rounded-xl shadow-neu-convex-sm active:shadow-neu-concave-sm transition-all duration-300 h-10 w-10"
                    onClick={() => router.back()}
                >
                    <ArrowLeft size={18} />
                </Button>
                <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-700 tracking-tight">
                        {problem?.title || "Infinity Studio"}
                    </span>
                    <span className="text-[9px] font-black text-violet-400 uppercase tracking-widest">
                        Neumorphic Environment
                    </span>
                </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-4">
                {/* AI Generate Button - Gradient */}
                <Button
                    className="gap-2 font-bold text-[10px] uppercase tracking-widest bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-xl px-5 h-9 shadow-lg shadow-violet-200 transition-all hover:scale-105 active:scale-95"
                    onClick={() => setIsAiModalOpen(true)}
                >
                    <Sparkles size={14} className="animate-pulse" />
                    AI Generate
                </Button>

                {/* Run Code Button - Emerald */}
                <Button
                    className="gap-2 font-bold text-[10px] uppercase tracking-widest bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl px-5 h-9 shadow-lg shadow-emerald-200 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:shadow-none"
                    onClick={handleRunCode}
                    disabled={isExecuting}
                >
                    {isExecuting ? <Loader2 className="animate-spin" size={14} /> : <Play size={14} fill="currentColor" />}
                    Run Code
                </Button>

                {/* Submit Button - Violet */}
                <Button
                    className="gap-2 font-bold text-[10px] uppercase tracking-widest bg-violet-600 hover:bg-violet-500 text-white rounded-xl px-5 h-9 shadow-lg shadow-violet-200 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:shadow-none"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !problem || testResults.length === 0}
                >
                    {isSubmitting ? <Loader2 className="animate-spin" size={14} /> : <Send size={14} />}
                    Submit
                </Button>

                {/* Language Selector */}
                <div className="hidden md:flex items-center gap-2 px-1 py-1 rounded-xl bg-neu-base shadow-neu-concave-sm">
                    {(['javascript', 'python'] as const).map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            className={cn(
                                "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                                language === lang
                                    ? "bg-neu-base shadow-neu-convex-sm text-violet-600"
                                    : "text-neu-text-sub hover:text-neu-text-main"
                            )}
                        >
                            {lang === 'javascript' ? 'JS' : 'PY'}
                        </button>
                    ))}
                </div>

                {/* Theme Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="h-10 w-10 rounded-xl bg-neu-base shadow-neu-convex-sm active:shadow-neu-concave-sm text-neu-text-sub hover:text-amber-500 transition-all"
                >
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </Button>
            </div>
        </div>
    );

    return (
        <div className={cn("min-h-screen transition-colors duration-300", isDarkMode && "dark")}>
            <IdeLayout
                header={Header}
                footer={
                    <div className="flex w-full items-center justify-between">
                        <div className="flex gap-8 items-center">
                            <span className="flex items-center gap-2 group cursor-help">
                                <Code2 size={14} className="text-emerald-500" />
                                <span className="text-neu-text-sub group-hover:text-neu-text-main transition-colors">
                                    {language === 'javascript' ? 'JS Engine Ready' : 'Python 3.10 Runtime'}
                                </span>
                            </span>
                            <span className="flex items-center gap-2 group cursor-help">
                                <Layout size={14} className="text-violet-400" />
                                <span className="text-neu-text-sub group-hover:text-neu-text-main transition-colors">3-Pane View</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[9px] font-mono text-neu-text-sub">V.1.0.5-NEO</span>
                        </div>
                    </div>
                }
                problemPane={
                    problem ? (
                        <InstructionPad
                            title={problem.title}
                            description={problem.description}
                            difficulty={problem.difficulty}
                        />
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center p-12 text-center gap-8 bg-neu-base/50">
                            <div className="relative">
                                <div className="absolute inset-0 bg-violet-200/20 blur-3xl opacity-20 animate-pulse" />
                                <div className="relative p-8 rounded-[3rem] bg-neu-base shadow-neu-convex-lg border border-white/5">
                                    <Sparkles size={40} className="text-violet-500 animate-bounce" />
                                </div>
                            </div>
                            <div className="space-y-3 max-w-xs">
                                <h3 className="text-xl font-black text-neu-text-main tracking-tight">Infinity Studio</h3>
                                <p className="text-[11px] leading-relaxed text-neu-text-sub font-medium px-4">
                                    Your neural workspace is synchronized. Use <span className="text-violet-600 font-bold">Spark AI</span> to forge a custom challenge or enter the sandbox.
                                </p>
                            </div>
                            <Button
                                onClick={() => setIsAiModalOpen(true)}
                                className="bg-neu-base border border-violet-100/10 text-violet-600 hover:bg-violet-600 hover:text-white rounded-3xl gap-3 font-black text-xs px-10 h-14 shadow-neu-convex-md active:shadow-neu-concave-sm transition-all duration-300 hover:scale-110 active:scale-95 group"
                            >
                                <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                                Begin Operation
                            </Button>
                        </div>
                    )
                }
                editorPane={
                    <div className="h-full flex flex-col relative bg-neu-base">
                        {/* AI Banner - Dedicated space at top to prevent overlap */}
                        <div className="h-8 shrink-0 flex justify-center z-50">
                            <div className="bg-violet-600 text-white px-6 h-full rounded-b-xl shadow-lg shadow-violet-200/50 flex items-center gap-2 transform -translate-y-1">
                                <Sparkles size={10} className="text-violet-200" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">AI Problem Generation by Groq API</span>
                            </div>
                        </div>

                        {/* Editor Container - Fills remaining space */}
                        <div className="flex-1 w-full relative min-h-0">
                            <LightEditorWrapper
                                code={code}
                                onChange={(val) => setCode(val || "")}
                                language={language}
                                theme={isDarkMode ? "dark" : "light"}
                            />
                        </div>
                    </div>
                }
                terminalPane={
                    <ConsoleDrawer
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        testResults={testResults}
                        output={consoleOutput}
                    />
                }
            />

            <GenerateProblemModal
                isOpen={isAiModalOpen}
                onClose={() => setIsAiModalOpen(false)}
            />
        </div>
    );
}
