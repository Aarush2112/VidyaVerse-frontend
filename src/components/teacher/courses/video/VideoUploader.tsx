"use client";

import MuxUploader, { MuxUploaderDrop } from "@mux/mux-uploader-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2, Video as VideoIcon, CheckCircle2 } from "lucide-react";

interface VideoUploaderProps {
    onUploadComplete: (assetId: string) => void;
    initialData?: {
        muxPlaybackId?: string | null;
    };
}

export const VideoUploader = ({
    onUploadComplete,
    initialData
}: VideoUploaderProps) => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadId, setUploadId] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const onUploadStart = async () => {
        setIsUploading(true);
        try {
            const response = await fetch("/api/upload/mux", {
                method: "POST",
            });
            const data = await response.json();
            setUploadId(data.uploadId);
            return data.uploadUrl;
        } catch (error) {
            toast.error("Failed to start upload");
            setIsUploading(false);
            throw error;
        }
    };

    const onSuccess = () => {
        setIsUploading(false);
        setSuccess(true);
        toast.success("Video uploaded successfully");
        // We'd ideally wait for the webhook to get the asset ID, 
        // but for now we'll pass the upload ID or wait for user to save
        // In a real flow, we'd poll or wait for webhook
    };

    const onUploadError = () => {
        setIsUploading(false);
        toast.error("Error uploading video");
    };

    return (
        <div className="space-y-4">
            <div className={`
                border-2 border-dashed rounded-xl p-10 
                transition-all duration-200 ease-in-out
                ${isUploading ? "border-violet-500 bg-violet-50/50" : "border-slate-200 hover:border-violet-300 hover:bg-slate-50"}
            `}>
                <MuxUploader
                    endpoint={onUploadStart}
                    onSuccess={onSuccess}
                    onUploadError={onUploadError}
                    className="hidden" // Hiding default UI to customize or use slots if preferred, but for now we'll try default
                    id="video-uploader"
                />

                {/* Custom Trigger Area if needed, or just standard Mux Drop */}
                <MuxUploaderDrop muxUploader="video-uploader">
                    <div className="flex flex-col items-center justify-center text-center gap-2 cursor-pointer">
                        {isUploading ? (
                            <>
                                <Loader2 className="h-10 w-10 text-violet-600 animate-spin" />
                                <p className="text-sm font-medium text-violet-700">Uploading to Cloud...</p>
                            </>
                        ) : success ? (
                            <>
                                <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                                <p className="text-sm font-medium text-emerald-700">Upload Complete</p>
                                <p className="text-xs text-slate-500">Processing video...</p>
                            </>
                        ) : (
                            <>
                                <div className="h-12 w-12 rounded-full bg-violet-100 flex items-center justify-center mb-2">
                                    <VideoIcon className="h-6 w-6 text-violet-600" />
                                </div>
                                <p className="text-sm font-medium text-slate-700">
                                    Drag video here or click to browse
                                </p>
                                <p className="text-xs text-slate-500 max-w-xs">
                                    Supports MP4, MOV, AVI up to 2GB. High-speed direct upload.
                                </p>
                            </>
                        )}
                    </div>
                </MuxUploaderDrop>
            </div>

            <p className="text-xs text-slate-400 text-center">
                Powered by Mux Video Infrastructure
            </p>
        </div>
    );
};
