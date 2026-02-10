"use client";

import { Lesson, Resource, Chapter } from "@prisma/client";
import { useState } from "react";
import { VideoUploader } from "@/components/teacher/courses/video/VideoUploader";

interface LessonWithData extends Lesson {
    resources: Resource[];
    chapter: Chapter;
}

interface LessonEditorProps {
    lesson: LessonWithData;
}

export const LessonEditor = ({ lesson }: LessonEditorProps) => {
    // In a real implementation, we would use a form here to update title, description, etc.
    // For now, we focus on the Video Upload part as requested.

    const onVideoUploadComplete = (assetId: string) => {
        // Here we would call a server action to update the lesson with the assetId
        console.log("Video uploaded, assetId:", assetId);
        // updateLessonVideo(lesson.id, assetId); 
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">{lesson.title}</h2>
                <p className="text-sm text-slate-500">
                    Chapter: {lesson.chapter.title}
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-medium mb-2">Lesson Video</h3>
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <VideoUploader
                            onUploadComplete={onVideoUploadComplete}
                            initialData={{ muxPlaybackId: lesson.muxPlaybackId }}
                        />
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-medium mb-2">Content</h3>
                    <div className="p-4 border border-slate-200 rounded-lg text-slate-400 text-sm italic">
                        Rich Text Editor coming in Phase 2... (Tiptap Implementation)
                    </div>
                </div>
            </div>
        </div>
    );
};
