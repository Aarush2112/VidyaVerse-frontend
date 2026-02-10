"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BrainCircuit, Users, Terminal, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InterviewerCardProps {
    name: string;
    role: string;
    description: string;
    type: 'BEHAVIORAL' | 'TECHNICAL_DSA' | 'SYSTEM_DESIGN';
    difficulty: 'Easy' | 'Medium' | 'Hard';
    onSelect: () => void;
}

export function InterviewerCard({ name, role, description, type, difficulty, onSelect }: InterviewerCardProps) {
    const getIcon = () => {
        switch (type) {
            case 'BEHAVIORAL': return <Users className="h-6 w-6 text-violet-600" />;
            case 'TECHNICAL_DSA': return <Terminal className="h-6 w-6 text-blue-600" />;
            case 'SYSTEM_DESIGN': return <BrainCircuit className="h-6 w-6 text-fuchsia-600" />;
            default: return <Users className="h-6 w-6" />;
        }
    };

    const getBgColor = () => {
        switch (type) {
            case 'BEHAVIORAL': return "bg-violet-50 hover:bg-violet-100";
            case 'TECHNICAL_DSA': return "bg-blue-50 hover:bg-blue-100";
            case 'SYSTEM_DESIGN': return "bg-fuchsia-50 hover:bg-fuchsia-100";
            default: return "bg-slate-50";
        }
    };

    return (
        <div
            onClick={onSelect}
            className="group cursor-pointer bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 relative overflow-hidden"
        >
            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className={cn("p-3 rounded-2xl transition-colors", getBgColor())}>
                            {getIcon()}
                        </div>
                        <Badge variant="outline" className="rounded-full border-slate-200 bg-white text-slate-500 font-medium">
                            {difficulty}
                        </Badge>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors mb-1">
                        {name}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 mb-4">{role}</p>

                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                        {description}
                    </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {type.replace('_', ' ')}
                    </span>
                    <Button variant="ghost" size="sm" className="bg-slate-50 text-slate-600 hover:text-purple-700 hover:bg-purple-50 rounded-full gap-2 px-4 transition-all">
                        Select <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Decorative Gradient Blob on Hover */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl -translate-y-10 translate-x-10 rounded-full group-hover:bg-purple-500/10 transition-all" />
        </div>
    );
}
