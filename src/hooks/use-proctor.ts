"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner" // Assuming sonner or use standard alert

import { logProctorEvent } from "@/app/actions/proctor"
import { ProctorEvent } from "@prisma/client"
import { playAlertSound } from "@/lib/audio"

export function useProctor(active: boolean, assignmentId?: string) {
    const [warnings, setWarnings] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(true)

    // Helper to log
    const logViolation = async (event: ProctorEvent) => {
        setWarnings(w => w + 1)
        playAlertSound() // <--- SOUND ALERT

        if (assignmentId) {
            try {
                await logProctorEvent(assignmentId, event, { warnings: warnings + 1 })
            } catch (e) {
                console.error("Failed to log violation", e)
            }
        }
    }

    useEffect(() => {
        if (!active) return

        // 1. Force Fullscreen on Mount
        const enterFullscreen = async () => {
            // ... existing logic
            try {
                if (!document.fullscreenElement) {
                    await document.documentElement.requestFullscreen()
                }
            } catch (e) {
                console.error("Fullscreen denied", e)
            }
        }

        // Initial attempt
        enterFullscreen()

        // 2. Tab Switch / Focus Loss Detection
        const handleVisibilityChange = () => {
            if (document.hidden) {
                toast.error("⚠️ Tab swtich detected! Only 3 warnings allowed.")
                logViolation("TAB_SWITCH" as ProctorEvent) // Check enum import
            }
        }

        const handleBlur = () => {
            // Optional: can be too sensitive
        }

        const handleFullscreenChange = () => {
            const fs = !!document.fullscreenElement
            setIsFullscreen(fs)
            if (!fs) {
                toast.error("⚠️ Fullscreen exited! Please return immediately.")
                logViolation("FULLSCREEN_EXIT" as ProctorEvent)
            }
        }

        // Prevent Copy/Paste
        const handleCopy = (e: ClipboardEvent) => {
            e.preventDefault()
            toast.error("🚫 Copying is disabled during exam.")
        }

        const handlePaste = (e: ClipboardEvent) => {
            e.preventDefault()
            toast.error("🚫 Pasting is disabled during exam.")
        }

        document.addEventListener("visibilitychange", handleVisibilityChange)
        document.addEventListener("fullscreenchange", handleFullscreenChange)
        window.addEventListener("blur", handleBlur)
        document.addEventListener("copy", handleCopy)
        document.addEventListener("paste", handlePaste)

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange)
            document.removeEventListener("fullscreenchange", handleFullscreenChange)
            window.removeEventListener("blur", handleBlur)
            document.removeEventListener("copy", handleCopy)
            document.removeEventListener("paste", handlePaste)
        }
    }, [active, assignmentId])

    return { warnings, isFullscreen }
}
