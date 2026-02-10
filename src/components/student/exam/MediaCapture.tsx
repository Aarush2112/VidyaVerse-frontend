"use client"

import { useEffect, useRef } from "react"
import { uploadEvidence } from "@/app/actions/proctor"
import { toast } from "sonner"

export function MediaCapture({ examId, active }: { examId: string, active: boolean }) {
    const webcamVideoRef = useRef<HTMLVideoElement>(null)
    const screenVideoRef = useRef<HTMLVideoElement>(null)

    // Start Webcam & Screen Share
    useEffect(() => {
        if (!active) return

        const startMedia = async () => {
            try {
                // 1. Webcam
                const webcamStream = await navigator.mediaDevices.getUserMedia({ video: true })
                if (webcamVideoRef.current) {
                    webcamVideoRef.current.srcObject = webcamStream
                    webcamVideoRef.current.play()
                }

                // 2. Screen Share
                const screenStream = await navigator.mediaDevices.getDisplayMedia({
                    video: { width: 1280, height: 720 }
                })
                if (screenVideoRef.current) {
                    screenVideoRef.current.srcObject = screenStream
                    screenVideoRef.current.play()
                }

                screenStream.getVideoTracks()[0].onended = () => {
                    toast.error("Screen sharing ended! Please restart to continue.")
                }

            } catch (err) {
                console.error("Error starting media:", err)
                toast.error("Camera and Screen permission required.")
            }
        }

        startMedia()
    }, [active])

    useEffect(() => {
        if (!active) return

        const interval = setInterval(async () => {
            captureAndUpload()
        }, 15000)

        return () => clearInterval(interval)
    }, [active, examId])

    const captureAndUpload = async () => {
        try {
            const canvas = document.createElement("canvas")
            canvas.width = 320
            canvas.height = 180
            const ctx = canvas.getContext("2d")
            if (!ctx) return

            // Capture Webcam
            let webcamImage = null
            if (webcamVideoRef.current) {
                ctx.drawImage(webcamVideoRef.current, 0, 0, canvas.width, canvas.height)
                webcamImage = canvas.toDataURL("image/jpeg", 0.5)
            }

            // Capture Screen
            let screenImage = null
            if (screenVideoRef.current) {
                ctx.drawImage(screenVideoRef.current, 0, 0, canvas.width, canvas.height)
                screenImage = canvas.toDataURL("image/jpeg", 0.5)
            }

            if (webcamImage || screenImage) {
                await uploadEvidence(examId, screenImage, webcamImage)
                console.log("Evidence uploaded")
            }

        } catch (error) {
            console.error("Failed to upload evidence", error)
        }
    }

    return (
        <div className="fixed bottom-4 right-4 z-50 opacity-20 hover:opacity-100 transition-opacity">
            <div className="flex gap-2">
                <video
                    ref={webcamVideoRef}
                    className="w-[100px] h-[75px] bg-black rounded-lg border border-slate-700 object-cover"
                    muted
                    playsInline
                />
                <video
                    ref={screenVideoRef}
                    className="w-[100px] h-[75px] bg-black rounded-lg border border-slate-700 object-cover"
                    muted
                    playsInline
                />
            </div>
            <p className="text-[10px] text-center text-slate-500 mt-1">Proctoring Active</p>
        </div>
    )
}
