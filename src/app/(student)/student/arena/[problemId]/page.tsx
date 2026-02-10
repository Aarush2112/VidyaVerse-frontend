import React from "react";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { CodeEditor } from "@/components/student/arena/CodeEditor";
import { ControlBar } from "@/components/student/arena/ControlBar";
import { ConsolePanel } from "@/components/student/arena/ConsolePanel";
import { Separator } from "@/components/ui/separator";

export default async function ArenaPage({
    params
}: {
    params: Promise<{ problemId: string }>;
}) {
    // 1. Resolve Params & Fetch Problem
    const { problemId } = await params;

    // Try to find by UUID first, then Slug (for "two-sum" links)
    let problem = await db.problem.findUnique({
        where: { id: problemId }
    });

    if (!problem) {
        problem = await db.problem.findUnique({
            where: { slug: problemId }
        });
    }

    if (!problem) {
        // Fallback to "two-sum" if not found, just for demo robustness (or 404)
        problem = await db.problem.findUnique({
            where: { slug: 'two-sum' }
        });
        if (problem) return redirect(`/student/arena/${problem.slug}`);
        return <div>Problem not found</div>;
    }

    // Calculate XP based on difficulty (since it's not in DB)
    const xpReward = problem.difficulty === 'HARD' ? 100 : problem.difficulty === 'MEDIUM' ? 50 : 20;

    return (
        <div className="h-screen w-full bg-[#F3F4F6] flex flex-col font-friendly overflow-hidden">

            {/* 1. Header Control Bar */}
            <ControlBar problemId={problem.id} title={problem.title} />

            {/* 2. Main Workspace (Grid) */}
            <div className="flex-1 flex overflow-hidden p-6 gap-6">

                {/* LEFT: Problem Description Content */}
                <div className="w-[35%] h-full bg-white rounded-[32px] shadow-sm border border-slate-100 p-8 overflow-y-auto">
                    <div className="prose prose-slate max-w-none">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-bold uppercase tracking-wider">
                                {problem.difficulty}
                            </span>
                            <span className="text-slate-400 text-xs font-bold uppercase">
                                +{xpReward} XP
                            </span>
                        </div>

                        <h2 className="text-3xl font-bold text-slate-800 mb-6">{problem.title}</h2>
                        <Separator className="my-6" />

                        {/* Markdown Rendering (Simple pre-wrap for now, need ReactMarkdown for full implementation) */}
                        <div className="whitespace-pre-wrap text-slate-600 leading-relaxed font-medium">
                            {problem.description}
                        </div>
                    </div>
                </div>

                {/* RIGHT: Editor & Execution */}
                <div className="flex-1 h-full relative flex flex-col">
                    <CodeEditor defaultValue={problem.starterCode} />

                    {/* Console (Slide up overlay) */}
                    <ConsolePanel />
                </div>

            </div>
        </div>
    );
}
