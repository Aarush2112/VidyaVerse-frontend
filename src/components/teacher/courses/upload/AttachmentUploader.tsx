"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { Plus, File, Loader2, X, FileText, Image as ImageIcon, Download } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { createResource, deleteResource } from "@/app/actions/curriculum";
import { Resource } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface AttachmentUploaderProps {
    lessonId: string;
    courseId: string;
    initialResources: Resource[];
}

export const AttachmentUploader = ({ lessonId, courseId, initialResources }: AttachmentUploaderProps) => {
    const [resources, setResources] = useState<Resource[]>(initialResources);
    const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleDelete = (resourceId: string) => {
        if (isDeletingId) return;
        setIsDeletingId(resourceId);
        startTransition(async () => {
            const res = await deleteResource(resourceId, courseId);
            if (res.success) {
                setResources(resources.filter(r => r.id !== resourceId));
                toast.success("Resource deleted");
            } else {
                toast.error("Failed to delete");
            }
            setIsDeletingId(null);
        });
    }

    return (
        <div className="space-y-4">
            {/* List of attachments */}
            {resources.length > 0 && (
                <div className="grid grid-cols-1 gap-2">
                    {resources.map((resource) => (
                        <div key={resource.id} className="flex items-center p-3 bg-slate-50 border border-slate-200 rounded-lg group">
                            <div className="p-2 bg-white border border-slate-100 rounded-md mr-3">
                                <FileText className="w-4 h-4 text-violet-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-700 truncate">{resource.name}</p>
                                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-violet-600 hover:underline">
                                    Download
                                </a>
                            </div>
                            {isDeletingId === resource.id ? (
                                <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                            ) : (
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => handleDelete(resource.id)}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Uploader */}
            <div className="border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors p-4">
                <UploadDropzone
                    endpoint="courseAttachment"
                    onClientUploadComplete={(res) => {
                        // Batch create resources
                        startTransition(async () => {
                            let failed = false;
                            const newResources = [];
                            for (const file of res) {
                                const created = await createResource(lessonId, {
                                    name: file.name,
                                    url: file.url,
                                    fileSize: file.size,
                                    fileType: file.name.split('.').pop()?.toUpperCase() || 'FILE'
                                });
                                if (created.success && created.resource) {
                                    newResources.push(created.resource);
                                } else {
                                    failed = true;
                                }
                            }

                            setResources([...resources, ...newResources]);
                            if (failed) toast.warning("Some files failed to save info");
                            else toast.success("Files uploaded!");
                        });
                    }}
                    onUploadError={(error: Error) => {
                        toast.error(`Upload failed: ${error.message}`);
                    }}
                    appearance={{
                        container: "h-32 border-none bg-transparent",
                        uploadIcon: "text-slate-300 w-8 h-8",
                        label: "text-slate-500 hover:text-violet-600",
                        allowedContent: "text-slate-400"
                    }}
                    content={{
                        label: "Drop PDF, Zip, or Images here"
                    }}
                />
            </div>
        </div>
    );
};
