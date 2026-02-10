"use client";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from 'react-markdown';

interface ProblemDescriptionProps {
    title: string;
    difficulty: "Easy" | "Medium" | "Hard";
    description: string; // Markdown
}

export const ProblemDescription = ({ title, difficulty, description }: ProblemDescriptionProps) => {

    // Difficulty Colors
    const difficultyColor =
        difficulty === "Hard" ? "bg-red-500/10 text-red-400 border-red-500/20" :
            difficulty === "Medium" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";

    return (
        <div className="h-full flex flex-col bg-zinc-950">
            {/* Header */}
            <div className="p-4 border-b border-zinc-800">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold text-white">{title}</h2>
                    <Badge variant="outline" className={`${difficultyColor} border`}>
                        {difficulty}
                    </Badge>
                </div>
                <div className="flex gap-2">
                    <Tabs defaultValue="description" className="w-full">
                        <TabsList className="bg-zinc-900 border border-zinc-800 h-8 w-full justify-start p-0">
                            <TabsTrigger value="description" className="h-full px-4 text-xs data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Description</TabsTrigger>
                            <TabsTrigger value="hints" className="h-full px-4 text-xs data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Hints</TabsTrigger>
                            <TabsTrigger value="submissions" className="h-full px-4 text-xs data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Submissions</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            {/* Content Area */}
            <ScrollArea className="flex-1 p-4">
                <div className="prose prose-invert prose-sm max-w-none text-slate-300">
                    <ReactMarkdown>
                        {description}
                    </ReactMarkdown>
                </div>
            </ScrollArea>
        </div>
    )
}
