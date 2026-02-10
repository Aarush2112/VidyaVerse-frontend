"use client"

import { ProctorHeader } from "./ProctorHeader"
import { StudentCard } from "./StudentCard"
import { LiveLogs } from "./LiveLogs"
import { useEffect, useState } from "react"
import { pusherClient } from "@/lib/pusher"
import { toast } from "sonner"
import { InspectionModal } from "./InspectionModal"

export default function ProctorDashboard({ courseId, courseTitle, initialStudents, backHref }: { courseId: string, courseTitle: string, initialStudents: any[], backHref?: string }) {
    // @ts-ignore
    const [sessions, setSessions] = useState(initialStudents)
    const [events, setEvents] = useState<any[]>([])



    useEffect(() => {
        const channel = pusherClient.subscribe(`course-${courseId}`)

        channel.bind("proctor-event", (data: any) => {
            console.log("Real-time Proctor Event:", data)

            if (data.event === "EVIDENCE_UPLOADED") {
                // Update student's last snapshot
                setSessions(prev => prev.map(s => {
                    if (s.id === data.studentId) {
                        return {
                            ...s,
                            lastScreenshot: data.webcamUrl || s.lastScreenshot, // Thumbnail update
                            lastWebcam: data.webcamUrl || s.lastWebcam,
                            status: "ACTIVE",
                            lastActive: new Date().toLocaleTimeString()
                        }
                    }
                    return s
                }))
            } else {
                // Violation Events
                const newEvent = {
                    id: Math.random().toString(),
                    studentName: data.studentName,
                    type: data.event === "TAB_SWITCH" ? "warning" : "critical",
                    message: data.event,
                    time: new Date().toLocaleTimeString()
                }
                // @ts-ignore
                setEvents(prev => [newEvent, ...prev])

                // Update Student Session Status
                setSessions(prev => prev.map(s => {
                    if (s.id === data.studentId) {
                        return {
                            ...s,
                            status: "VIOLATION",
                            warnings: (s.warnings || 0) + 1
                        }
                    }
                    return s
                }))

                toast.error(`Violation: ${data.studentName} (${data.event})`)
            }
        })

        return () => {
            pusherClient.unsubscribe(`course-${courseId}`)
        }
    }, [courseId])

    const handleTerminate = () => {
        alert("TERMINATING SESSION...");
    }

    const handlePause = () => {
        alert("PAUSING EXAM...");
    }

    const handleViewLog = (id: string, name: string) => {
        // Filter logs or open modal
        console.log("Viewing logs for student:", id)
        setInspectStudent({ id, name })
    }

    const [inspectStudent, setInspectStudent] = useState<{ id: string, name: string } | null>(null)

    return (
        <div className="flex flex-col h-screen bg-[#020617] text-white overflow-hidden">
            <ProctorHeader
                sessionName={courseTitle}
                activeStudents={sessions.length}
                onPause={handlePause}
                onTerminate={handleTerminate}
                backHref={backHref}
            />

            <div className="flex flex-1 overflow-hidden">
                {/* Main Grid Area */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {sessions.map((student) => (
                            <StudentCard
                                key={student.id}
                                student={student}
                                onViewLog={() => handleViewLog(student.id, student.name)}
                            />
                        ))}
                    </div>
                </main>

                {/* Sidebar Logs */}
                <aside className="hidden lg:block w-96 border-l border-slate-800">
                    <LiveLogs events={events} />
                </aside>
            </div>

            {inspectStudent && (
                <InspectionModal
                    isOpen={!!inspectStudent}
                    onClose={() => setInspectStudent(null)}
                    studentId={inspectStudent.id}
                    studentName={inspectStudent.name}
                    courseId={courseId}
                />
            )}
        </div>
    )
}
