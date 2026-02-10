"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Mic, Server, Users, Cpu, ArrowRight } from 'lucide-react';
import { NeuCard } from '@/components/neu/NeuCard';
import { NeuButton } from '@/components/neu/NeuButton';
import { KnowledgeDashboardLayout } from '@/components/student/dashboard/KnowledgeDashboardLayout'; // Keeping existing layout wrapper if possible

export default function InterviewLobby() {
    const router = useRouter();

    const handleSelect = (personaId: string) => {
        const sessionId = `session-${Date.now()}`;
        router.push(`/student/career/interview/${sessionId}?persona=${personaId}`);
    };

    return (
        <div className="flex min-h-screen bg-[#E0E5EC] text-[#4A5568]">


            {/* Using existing layout wrapper structure but ensuring the background is correct */}
            <KnowledgeDashboardLayout hideRightSidebar className="!bg-[#E0E5EC] !p-0">
                <main className="flex-1 p-8 lg:p-12 overflow-y-auto w-full max-w-7xl mx-auto">

                    {/* HERO SECTION - CONVEX PANEL */}
                    <div className="rounded-[40px] bg-[#E0E5EC] shadow-neu-convex p-10 mb-12 relative overflow-hidden">
                        <div className="relative z-10 max-w-2xl">
                            <span className="inline-block px-4 py-1.5 rounded-full shadow-neu-concave text-xs font-bold text-violet-600 mb-6 uppercase tracking-wider">
                                AI Voice Interface
                            </span>
                            <h1 className="text-4xl font-bold text-gray-700 mb-4 leading-tight">
                                Master your interview skills with <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">
                                    AI-Powered Personas
                                </span>
                            </h1>
                            <p className="text-gray-500 text-lg mb-8">
                                Select an interviewer persona below to start a real-time voice session.
                            </p>
                        </div>

                        {/* Decorative Orb */}
                        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-64 h-64 rounded-full shadow-neu-convex flex items-center justify-center hidden xl:flex">
                            <div className="w-56 h-56 rounded-full shadow-neu-concave flex items-center justify-center">
                                <Mic className="w-24 h-24 text-violet-500/20" />
                            </div>
                        </div>
                    </div>

                    {/* GRID SECTION */}
                    <h2 className="text-2xl font-bold text-gray-700 mb-8 flex items-center gap-3">
                        <span className="w-3 h-8 rounded-full bg-violet-500 shadow-neu-convex"></span>
                        Available Interviewers
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

                        {/* CARD 1: VIKRAM */}
                        <NeuCard className="flex flex-col gap-6">
                            <div className="flex justify-between items-start">
                                {/* Icon Well */}
                                <div className="w-16 h-16 rounded-full shadow-neu-concave flex items-center justify-center text-violet-600">
                                    <Cpu className="w-8 h-8" />
                                </div>
                                <span className="px-3 py-1 rounded-full shadow-neu-convex text-[10px] font-bold text-gray-500">
                                    HARD
                                </span>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-700">Vikram Singh</h3>
                                <p className="text-xs font-bold text-violet-500 uppercase tracking-wide mb-3">Senior Backend Engineer</p>
                                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                    Strict and detail-oriented. Expect deep questions on algorithms, time complexity, and edge cases.
                                </p>
                            </div>

                            <div className="pt-4 mt-auto">
                                <NeuButton onClick={() => handleSelect('vikram')}>
                                    Start Session <ArrowRight size={16} />
                                </NeuButton>
                            </div>
                        </NeuCard>

                        {/* CARD 2: ALEX */}
                        <NeuCard className="flex flex-col gap-6">
                            <div className="flex justify-between items-start">
                                <div className="w-16 h-16 rounded-full shadow-neu-concave flex items-center justify-center text-violet-600">
                                    <Server className="w-8 h-8" />
                                </div>
                                <span className="px-3 py-1 rounded-full shadow-neu-convex text-[10px] font-bold text-gray-500">
                                    MEDIUM
                                </span>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-700">Alex Chen</h3>
                                <p className="text-xs font-bold text-violet-500 uppercase tracking-wide mb-3">Staff Engineer (Infra)</p>
                                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                    Big picture thinker. Evaluates scalability, system design trade-offs, and failure scenarios.
                                </p>
                            </div>

                            <div className="pt-4 mt-auto">
                                <NeuButton onClick={() => handleSelect('alex')}>
                                    Start Session <ArrowRight size={16} />
                                </NeuButton>
                            </div>
                        </NeuCard>

                        {/* CARD 3: SARAH */}
                        <NeuCard className="flex flex-col gap-6">
                            <div className="flex justify-between items-start">
                                <div className="w-16 h-16 rounded-full shadow-neu-concave flex items-center justify-center text-violet-600">
                                    <Users className="w-8 h-8" />
                                </div>
                                <span className="px-3 py-1 rounded-full shadow-neu-convex text-[10px] font-bold text-gray-500">
                                    EASY
                                </span>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-700">Sarah Jenkins</h3>
                                <p className="text-xs font-bold text-violet-500 uppercase tracking-wide mb-3">HR Manager</p>
                                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                    Friendly but perceptive. Focuses on culture fit, soft skills, and your background story.
                                </p>
                            </div>

                            <div className="pt-4 mt-auto">
                                <NeuButton onClick={() => handleSelect('sarah')}>
                                    Start Session <ArrowRight size={16} />
                                </NeuButton>
                            </div>
                        </NeuCard>

                    </div>
                </main>
            </KnowledgeDashboardLayout>
        </div>
    );
}
