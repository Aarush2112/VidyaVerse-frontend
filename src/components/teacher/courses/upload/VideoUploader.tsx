"use client";

import { useState } from "react";
import * as UpChunk from "@mux/upchunk";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, X, CheckCircle, Video } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface VideoUploaderProps {
    endpoint?: string;
    onUploadStart?: () => void;
    onUploadComplete: (res: { playbackId?: string; assetId?: string }) => void;
    onUploadError?: () => void;
}

export const VideoUploader = ({
    endpoint = "/api/upload/mux-url",
    onUploadStart,
    onUploadComplete,
    onUploadError,
}: VideoUploaderProps) => {
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const handleUpload = async (file: File) => {
        setIsUploading(true);
        setErrorMessage("");
        setProgress(0);
        onUploadStart?.();

        try {
            // 1. Get the Upload URL from our server
            const response = await fetch(endpoint, {
                method: "POST",
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error("Failed to get upload URL");
            }

            const uploadUrl = data.url;
            const uploadId = data.id; // Mux upload ID

            // 2. Start the chunked upload directly to Mux
            const upload = UpChunk.createUpload({
                endpoint: uploadUrl,
                file,
                chunkSize: 5120, // 5MB chunks
            });

            upload.on("progress", (progressParams) => {
                setProgress(Math.round(progressParams.detail));
            });

            upload.on("success", () => {
                setIsUploading(false);
                toast.success("Upload complete!");
                // We don't get the playback ID immediately from UpChunk success.
                // Usually, we either poll the asset or rely on the webhook.
                // For simple flows, we might pass the uploadId, but typically Mux sends a webhook.
                // However, standard pattern: Use the asset ID from the upload validation or wait.
                // IMPORTANT: The `createUpload` call gave us an `asset_id` or `id`.
                // Mux `upload` object contains `asset_id` once processed, but here we only have `data` from the initial call.
                // The `data` object from `video.uploads.create` DOES NOT contain `asset_id` yet (it's null).
                // Wait... Mux uploads are async.
                // Strategy: We pass the UPLOAD ID back to the parent, or we rely on the parent to poll/webhook. 
                // BUT for a simple V1, user wants `muxPlaybackId` saved to DB.
                // TRICK: The Mux Upload API returns an `id`. You can poll `video.uploads.get(id)` to see when `asset_id` is populated.
                // OR: We just save the Upload ID to the DB temporarily? 
                // User requested: "Server Webhook: Updates the Lesson record with playbackId".
                // SO: We just act as successful here.

                onUploadComplete({ assetId: data.asset_id ?? undefined }); // Initially asset_id is null usually
            });

            upload.on("error", (err) => {
                setIsUploading(false);
                setErrorMessage("Upload failed. Please try again.");
                toast.error("Upload failed");
                onUploadError?.();
                console.error("UpChunk Error:", err.detail);
            });

        } catch (error) {
            console.error("Upload Setup Error:", error);
            setIsUploading(false);
            setErrorMessage("Could not start upload.");
            toast.error("Could not start upload");
        }
    };

    return (
        <div className="w-full">
            {!isUploading && (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 hover:border-violet-300 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-slate-400 mb-2" />
                        <p className="text-sm text-slate-500 font-medium">Click to upload video</p>
                        <p className="text-xs text-slate-400 mt-1">MP4, MOV, MKV (Max 2GB)</p>
                    </div>
                    <input
                        type="file"
                        className="hidden"
                        accept="video/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleUpload(file);
                        }}
                    />
                </label>
            )}

            {isUploading && (
                <div className="w-full p-4 border border-slate-200 rounded-xl bg-white space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-violet-100 rounded-lg">
                            <Video className="w-5 h-5 text-violet-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900">Uploading Video...</p>
                            <p className="text-xs text-slate-500">{progress}% complete</p>
                        </div>
                    </div>
                    <Progress value={progress} className="h-2" indicatorClassName="bg-violet-600" />
                </div>
            )}

            {errorMessage && (
                <div className="mt-2 text-sm text-red-500 flex items-center gap-2">
                    <X className="w-4 h-4" /> {errorMessage}
                </div>
            )}
        </div>
    );
};
