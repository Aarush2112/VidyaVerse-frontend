'use client';

import React from 'react';
import { Code2, ArrowRight } from 'lucide-react';
import { NeuButton } from '@/components/neu/NeuButton';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface DailyProblemWidgetProps {
    problem: any;
}

export function DailyProblemWidget({ problem }: DailyProblemWidgetProps) {
    if (!problem) return null;

    return (
        <div className="relative rounded-neu overflow-hidden shadow-neu-convex-md group">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-fuchsia-600 opacity-90 transition-opacity group-hover:opacity-100" />

            <div className="relative p-6 text-white space-y-4">
                <div className="flex items-center justify-between">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Code2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2 py-1 rounded text-white/90">
                        Daily Challenge
                    </span>
                </div>

                <div>
                    <h3 className="text-2xl font-bold mb-1">{problem.title}</h3>
                    <p className="text-white/80 text-sm line-clamp-2">
                        {problem.description ? problem.description.substring(0, 100) : "Solve the daily coding challenge to earn XP."}
                    </p>
                </div>

                <div className="pt-2">
                    <Link href={`/student/arena/${problem.slug || problem.id}`}>
                        <button className="w-full bg-white text-violet-600 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-lg">
                            Solve Now
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                </div>
            </div>

            {/* Decorative */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        </div>
    );
}
