"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2, Target, BrainCircuit, Zap } from "lucide-react";
import { generateAIProblem } from "@/app/actions/ide";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface GenerateProblemModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function GenerateProblemModal({ isOpen, onClose }: GenerateProblemModalProps) {
    const router = useRouter();
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async () => {
        if (!topic) return;
        setIsGenerating(true);
        try {
            const result = await generateAIProblem(topic, difficulty);
            if (result.success) {
                router.push(`/student/ide?problemId=${result.problemId}`);
                onClose();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[450px] bg-neu-base rounded-[32px] border-none shadow-neu-convex-lg p-8">
                <DialogHeader>
                    <div className="h-14 w-14 rounded-2xl bg-neu-base shadow-neu-convex-sm flex items-center justify-center text-violet-600 mb-4 mx-auto">
                        <Sparkles className="animate-pulse" size={28} />
                    </div>
                    <DialogTitle className="text-2xl font-bold text-center text-slate-700 tracking-tight">
                        AI Problem Forge
                    </DialogTitle>
                    <DialogDescription className="text-center text-slate-500 mt-2">
                        Describe a concept or topic, and I'll forge a unique coding challenge for you.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="space-y-3">
                        <Label htmlFor="topic" className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                            Focus Area
                        </Label>
                        <Input
                            id="topic"
                            placeholder="e.g. Binary Trees, Array Sliders, DP..."
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="h-12 rounded-2xl border-none shadow-neu-concave-sm bg-neu-base focus:ring-0 transition-all text-slate-700 placeholder:text-slate-400"
                        />
                    </div>

                    <div className="space-y-3">
                        <Label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                            Intensity Level
                        </Label>
                        <div className="grid grid-cols-3 gap-3">
                            {(['Easy', 'Medium', 'Hard'] as const).map((d) => (
                                <button
                                    key={d}
                                    onClick={() => setDifficulty(d)}
                                    className={cn(
                                        "h-12 rounded-2xl text-xs font-bold transition-all shrink-0",
                                        difficulty === d
                                            ? "bg-neu-base text-violet-600 shadow-neu-concave-sm"
                                            : "bg-neu-base text-slate-400 shadow-neu-convex-sm active:shadow-neu-concave-sm hover:text-slate-600"
                                    )}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex flex-col gap-3">
                    <Button
                        onClick={handleGenerate}
                        disabled={isGenerating || !topic}
                        className="w-full h-14 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-base gap-2 shadow-lg shadow-violet-200 transition-all active:scale-[0.98]"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Forging Reality...
                            </>
                        ) : (
                            <>
                                <Target size={18} />
                                Generate Challenge
                            </>
                        )}
                    </Button>
                    <button
                        onClick={onClose}
                        className="w-full py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest"
                    >
                        Cancel
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
