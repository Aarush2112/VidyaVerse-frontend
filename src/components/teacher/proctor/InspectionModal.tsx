"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { pusherClient } from "@/lib/pusher"
import { getEvidenceById } from "@/app/actions/proctor"
import Image from "next/image"

interface InspectionModalProps {
    isOpen: boolean
    onClose: () => void
    studentId: string
    studentName: string
    courseId: string
}

export function InspectionModal({ isOpen, onClose, studentId, studentName, courseId }: InspectionModalProps) {
    const [evidence, setEvidence] = useState<{ screenshot?: string, webcam?: string }>({})

    useEffect(() => {
        if (!isOpen || !courseId) return

        const channel = pusherClient.subscribe(`course-${courseId}`)

        // Listen for new evidence
        channel.bind("proctor-event", async (data: any) => {
            if (data.event === "EVIDENCE_UPLOADED" && data.studentId === studentId) {
                // 1. Instant update if webcam sent directly
                if (data.webcamUrl) {
                    setEvidence(prev => ({ ...prev, webcam: data.webcamUrl }));
                }

                // 2. Fetch full detail by ID (for screen and if webcam was too big)
                if (data.evidenceId) {
                    try {
                        const evidence = await getEvidenceById(data.evidenceId);
                        if (evidence) {
                            if (evidence.webcam && !data.webcamUrl) {
                                setEvidence(prev => ({
                                    ...prev,
                                    webcam: evidence.webcam || undefined
                                }));
                            }
                            if (evidence.screenshot) {
                                setEvidence(prev => ({
                                    ...prev,
                                    screenshot: evidence.screenshot || undefined
                                }));
                            }
                        }
                    } catch (err) {
                        console.error("Failed to fetch evidence", err);
                    }
                }
            }
        })

        return () => {
            channel.unbind("proctor-event")
        }
    }, [isOpen, courseId, studentId])



    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl bg-slate-900 border-slate-800 text-white">
                <DialogHeader>
                    <DialogTitle>Inspecting: {studentName}</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <h3 className="font-semibold text-slate-400">Screen Share</h3>
                        <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-slate-700 overflow-hidden relative">
                            {evidence.screenshot ? (
                                <img src={evidence.screenshot} alt="Screen" className="object-cover" />
                            ) : (
                                <span className="text-slate-600">Waiting for feed...</span>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-semibold text-slate-400">Webcam Feed</h3>
                        <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-slate-700 overflow-hidden relative">
                            {evidence.webcam ? (
                                <img src={evidence.webcam} alt="Webcam" className="object-cover" />
                            ) : (
                                <span className="text-slate-600">Waiting for feed...</span>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
