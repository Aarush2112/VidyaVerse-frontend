"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { IDEClient } from "@/components/student/ide/ide-client"
import { useProctor } from "@/hooks/use-proctor"
import { AlertTriangle, ShieldAlert } from "lucide-react"
import { MediaCapture } from "./MediaCapture"

export function ExamClient({ assignment, problem }: { assignment: any, problem: any }) {
    const [started, setStarted] = useState(false)
    const { warnings, isFullscreen } = useProctor(started, assignment?.id)

    useEffect(() => {
        console.log("ExamClient Mounted. Assignment:", assignment?.id, "Problem:", problem?.id)
    }, [assignment, problem])

    if (!assignment) {
        return (
            <div className="h-screen flex items-center justify-center bg-black text-red-500 font-mono">
                CRITICAL_ERROR: Assignment Data Missing.
            </div>
        )
    }

    if (!problem) {
        return (
            <div className="h-screen flex items-center justify-center bg-black text-yellow-500 font-mono">
                WARNING: No problems found in this assignment.
            </div>
        )
    }

    if (!started) {
        return (
            <div className="h-screen flex items-center justify-center bg-zinc-950">
                <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 p-8 rounded-xl text-center space-y-6">
                    <div className="h-16 w-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
                        <ShieldAlert className="h-8 w-8 text-red-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2">{assignment.title}</h1>
                        <p className="text-zinc-400">
                            This is a proctored exam. Fullscreen will be enforced.
                            Tab switching or exiting fullscreen will be flagged.
                        </p>
                    </div>
                    <div className="bg-zinc-950 p-4 rounded-lg text-left text-sm text-zinc-300 border border-zinc-800">
                        <ul className="list-disc pl-4 space-y-2">
                            <li>Duration: {assignment.duration || "N/A"} mins</li>
                            <li>Questions: {assignment.problems?.length || 1}</li>
                            <li>Strict Mode: <span className="text-red-400">Active</span></li>
                        </ul>
                    </div>
                    <Button
                        size="lg"
                        className="w-full bg-red-600 hover:bg-red-700 font-bold"
                        onClick={() => {
                            document.documentElement.requestFullscreen().catch((err) => {
                                console.error("Error attempting to enable full-screen mode:", err);
                            });
                            setStarted(true)
                        }}
                    >
                        Start Exam
                    </Button>
                </div>
            </div>
        )
    }

    if (warnings >= 3) {
        return (
            <div className="h-screen flex items-center justify-center bg-zinc-950">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-red-500">Exam Terminated</h1>
                    <p className="text-zinc-400">Multiple violations detected. Your test has been auto-submitted.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="relative h-screen flex flex-col">
            {/* Proctor Header */}
            <div className="h-14 bg-red-950/30 border-b border-red-900/30 flex items-center justify-between px-6">
                <div className="flex items-center gap-2 text-red-400">
                    <ShieldAlert className="h-5 w-5 animate-pulse" />
                    <span className="font-mono font-bold">PROCTORED MODE</span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-zinc-400 text-sm">
                        Warnings: <span className={`${warnings > 0 ? "text-red-500 font-bold" : "text-emerald-500"}`}>{warnings}/3</span>
                    </div>
                    {!isFullscreen && (
                        <div className="flex items-center gap-2 text-yellow-500 text-sm font-medium animate-bounce">
                            <AlertTriangle className="h-4 w-4" />
                            RETURN TO FULLSCREEN
                        </div>
                    )}
                </div>
            </div>

            {/* Blocking Overlay for Non-Fullscreen */}
            {!isFullscreen && (
                <div className="absolute inset-0 z-50 bg-black/95 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="bg-red-500/10 p-6 rounded-full animate-pulse">
                        <AlertTriangle className="h-16 w-16 text-red-500" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-red-500 mb-2">EXAM PAUSED</h1>
                        <p className="text-zinc-400 text-lg max-w-md mx-auto">
                            You have exited fullscreen mode.
                            <br />
                            Return immediately to continue.
                        </p>
                    </div>
                    <Button
                        size="lg"
                        variant="destructive"
                        className="font-bold text-lg px-8 py-6"
                        onClick={() => document.documentElement.requestFullscreen()}
                    >
                        RETURN TO EXAM
                    </Button>
                </div>
            )}

            {/* Reuse IDE but in Exam Context */}
            <div className={`flex-1 overflow-hidden p-4 ${!isFullscreen ? 'blur-sm grayscale pointer-events-none' : ''}`}>
                <IDEClient assignment={assignment} problem={problem} />
            </div>

            {/* Media Evidence Capture */}
            {started && assignment?.id && (
                <MediaCapture examId={assignment.id} active={started} />
            )}
        </div>
    )
}
