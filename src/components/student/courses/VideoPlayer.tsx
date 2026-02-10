"use client";

import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { updateUserProgress } from "@/app/actions/curriculum";
import { toast } from "sonner";
import confetti from "canvas-confetti";

interface VideoPlayerProps {
    playbackId: string;
    courseId: string;
    lessonId: string; // [NEW]
    chapterId: string;
    nextLessonId?: string;
    title: string;
    isLocked?: boolean;
    completeOnFinish?: boolean;
    onComplete?: () => void;
}

export const VideoPlayer = ({
    playbackId,
    courseId,
    lessonId, // [NEW]
    chapterId,
    nextLessonId,
    title,
    isLocked,
    completeOnFinish = true,
    onComplete
}: VideoPlayerProps) => {
    const [isReady, setIsReady] = useState(false);
    const router = useRouter();

    const onEnd = async () => {
        // Optimistic? No need, just call
        try {
            await updateUserProgress(lessonId, true);
            toast.success("Lesson Completed!");
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            if (nextLessonId) {
                toast.success("Lesson Complete! Continuing...", { duration: 2000 });
                router.push(`/student/courses/${courseId}/lessons/${nextLessonId}`);
            } else {
                router.refresh(); // Just refresh if no next lesson (end of course)
            }
        } catch {
            toast.error("Failed to mark complete");
        }
    };


    if (isLocked) {
        return (
            <div className="relative aspect-video flex flex-col items-center justify-center gap-y-4 bg-slate-900 rounded-xl text-white">
                <Lock className="h-8 w-8 text-slate-400" />
                <p className="text-sm font-medium text-slate-300">This lesson is locked.</p>
            </div>
        );
    }

    return (
        <div className="relative aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
            {!isReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-10">
                    <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
            )}
            <MuxPlayer
                title={title}
                className={cn(!isReady && "hidden")}
                onCanPlay={() => setIsReady(true)}
                onEnded={onEnd}
                autoPlay={false} // Don't auto-burn students unless settings allow
                playbackId={playbackId}
                accentColor="#7c3aed" // Violet-600
            />
        </div>
    );
}
