"use client";

import React, { useEffect, useState } from 'react';
import { getInterviewResult } from '@/app/actions/interview';
import { SkillsRadar } from '@/components/interview/SkillsRadar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, AlertCircle, ArrowLeft, Share2, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NeuCard } from '@/components/neu/NeuCard';
import { NeuButton } from '@/components/neu/NeuButton';

export default function InterviewResultPage({ params }: { params: Promise<{ sessionId: string }> }) {
    const { sessionId } = React.use(params);
    const [feedback, setFeedback] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        // Fetch result on mount
        getInterviewResult(sessionId).then(setFeedback);
    }, [sessionId]);

    const handleDownload = () => {
        window.print();
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        // Could add toast here
        alert("Link copied to clipboard!");
    };

    if (!feedback) {
        return (
            <div className="min-h-screen bg-neu-base flex items-center justify-center">
                <div className="flex flex-col items-center gap-6">
                    <div className="h-16 w-16 border-4 border-neu-accent border-t-transparent rounded-full animate-spin shadow-neu-convex-md" />
                    <p className="text-neu-text-sub font-mono text-sm animate-pulse tracking-widest">ANALYZING SESSION DATA...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neu-base text-neu-text-main p-6 md:p-12 font-sans selection:bg-neu-accent/30 pb-32 print:p-0 print:bg-white">
            <div className="max-w-6xl mx-auto space-y-12 print:space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between print:hidden">
                    <NeuButton
                        variant="ghost"
                        onClick={() => router.push('/student/career/interview')}
                        className="text-neu-text-sub hover:text-neu-text-main gap-2 pl-2"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back to Lobby
                    </NeuButton>
                    <div className="flex gap-4">
                        <NeuButton variant="icon" onClick={handleShare}>
                            <Share2 className="h-5 w-5" />
                        </NeuButton>
                        <NeuButton variant="filled" onClick={handleDownload}>
                            <Download className="mr-2 h-4 w-4" /> Download Report
                        </NeuButton>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 print:block print:space-y-8">
                    <div className="lg:col-span-2 space-y-10">
                        {/* Title Section */}
                        <div className="space-y-4">
                            <h1 className="text-5xl font-bold tracking-tight text-neu-text-main neu-text-chiselled print:text-black">Interview Analysis</h1>
                            <div className="flex items-center gap-4">
                                <span className="text-neu-text-sub font-mono print:text-gray-600">Session ID: <span className="font-bold text-neu-text-main print:text-black">#{sessionId.slice(-6)}</span></span>
                                <span className="px-3 py-1 rounded-full bg-neu-base shadow-neu-concave-sm text-neu-accent text-xs font-bold uppercase tracking-widest border border-transparent print:border-gray-300 print:shadow-none">
                                    COMPLETED
                                </span>
                            </div>
                        </div>

                        {/* Executive Summary Card */}
                        <NeuCard className="relative overflow-hidden group print:shadow-none print:border print:border-gray-200">
                            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                                <div className="flex-1 space-y-4">
                                    <h3 className="text-lg font-bold text-neu-text-main uppercase tracking-widest print:text-black">Executive Summary</h3>
                                    <p className="text-neu-text-sub leading-relaxed text-lg print:text-gray-700">
                                        {feedback.executiveSummary}
                                    </p>
                                </div>
                                <div className="flex flex-col items-center justify-center p-6 bg-neu-base shadow-neu-concave-md rounded-2xl min-w-[160px] print:shadow-none print:bg-transparent">
                                    <span className="text-xs font-bold text-neu-text-sub uppercase tracking-widest mb-2 print:text-gray-500">Decision</span>
                                    <span className={cn(
                                        "text-2xl font-black neu-text-chiselled",
                                        feedback.hiringDecision === 'HIRE' ? "text-neu-success" :
                                            feedback.hiringDecision === 'NO HIRE' ? "text-neu-danger" : "text-amber-500"
                                    )}>
                                        {feedback.hiringDecision}
                                    </span>
                                </div>
                            </div>
                        </NeuCard>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2">
                            {/* Strengths */}
                            <NeuCard className="print:shadow-none print:border print:border-gray-200">
                                <h4 className="flex items-center gap-3 text-neu-success font-bold mb-6 text-lg">
                                    <div className="p-2 rounded-full shadow-neu-convex-sm bg-neu-base text-neu-success print:shadow-none print:bg-transparent">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    Key Strengths
                                </h4>
                                <ul className="space-y-4">
                                    {feedback.strengths.map((s: string, i: number) => (
                                        <li key={i} className="text-sm text-neu-text-main flex items-start gap-3 print:text-black">
                                            <span className="mt-1.5 h-2 w-2 rounded-full bg-neu-success shadow-neu-convex-sm flex-shrink-0 print:bg-green-500 print:shadow-none" />
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </NeuCard>

                            {/* Weaknesses */}
                            <NeuCard className="print:shadow-none print:border print:border-gray-200">
                                <h4 className="flex items-center gap-3 text-neu-danger font-bold mb-6 text-lg">
                                    <div className="p-2 rounded-full shadow-neu-convex-sm bg-neu-base text-neu-danger print:shadow-none print:bg-transparent">
                                        <AlertCircle className="h-5 w-5" />
                                    </div>
                                    Areas for Improvement
                                </h4>
                                <ul className="space-y-4">
                                    {feedback.weaknesses.map((w: string, i: number) => (
                                        <li key={i} className="text-sm text-neu-text-main flex items-start gap-3 print:text-black">
                                            <span className="mt-1.5 h-2 w-2 rounded-full bg-neu-danger shadow-neu-convex-sm flex-shrink-0 print:bg-red-500 print:shadow-none" />
                                            {w}
                                        </li>
                                    ))}
                                </ul>
                            </NeuCard>
                        </div>
                    </div>

                    <div className="space-y-8 print:break-before-page">
                        {/* Skills Radar */}
                        <NeuCard className="flex flex-col items-center print:shadow-none print:border print:border-gray-200">
                            <h3 className="text-xs font-bold text-neu-text-sub uppercase tracking-[0.2em] mb-8">Skill Matrix</h3>
                            <SkillsRadar data={feedback.chartData} />
                        </NeuCard>

                        {/* Metric Cards */}
                        <div className="grid grid-cols-2 gap-6">
                            <NeuCard className="text-center p-6 flex flex-col items-center justify-center aspect-square print:shadow-none print:border print:border-gray-200">
                                <div className="text-5xl font-bold text-neu-accent mb-2 neu-text-chiselled">{feedback.technicalScore}</div>
                                <div className="text-[10px] uppercase font-bold text-neu-text-sub tracking-widest">Technical</div>
                            </NeuCard>
                            <NeuCard className="text-center p-6 flex flex-col items-center justify-center aspect-square print:shadow-none print:border print:border-gray-200">
                                <div className="text-5xl font-bold text-sky-500 mb-2 neu-text-chiselled">{feedback.communicationScore}</div>
                                <div className="text-[10px] uppercase font-bold text-neu-text-sub tracking-widest">Communication</div>
                            </NeuCard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
