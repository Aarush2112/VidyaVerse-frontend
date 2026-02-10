"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MonitorX, AlertTriangle, Eye, Activity } from "lucide-react"
import { StudentSession } from "./types"

interface StudentCardProps {
    student: StudentSession
    onViewLog: (id: string) => void
}

export function StudentCard({ student, onViewLog }: StudentCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "ONLINE": return "bg-emerald-500 shadow-emerald-500/50"
            case "IDLE": return "bg-yellow-500 shadow-yellow-500/50"
            case "VIOLATION": return "bg-red-500 shadow-red-500/50 animate-pulse"
            default: return "bg-slate-500"
        }
    }

    return (
        <Card className={`bg-slate-900 border-slate-800 overflow-hidden relative group hover:border-slate-600 transition-all ${student.status === "VIOLATION" ? "border-red-900/50 ring-1 ring-red-500/50" : ""}`}>
            {/* Status Indicator Bar */}
            <div className={`h-1 w-full ${getStatusColor(student.status).replace("shadow-", "").replace("animate-pulse", "")}`} />

            <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white bg-slate-800 border border-slate-700`}>
                                {student.name.charAt(0)}
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-900 ${getStatusColor(student.status)}`} />
                        </div>
                        <div>
                            <h3 className="text-white font-medium text-sm">{student.name}</h3>
                            <p className="text-xs text-slate-500">{student.id}</p>
                        </div>
                    </div>
                    {student.warnings > 0 && (
                        <Badge variant="destructive" className="flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" /> {student.warnings}
                        </Badge>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-950 p-2 rounded">
                        <span className="text-slate-500 block">Current</span>
                        <span className="text-indigo-400 truncate block">{student.currentProblem}</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded">
                        <span className="text-slate-500 block">Code Lines</span>
                        <span className="text-emerald-400">{student.codeLines}</span>
                    </div>
                </div>

                {/* Webcam Feed / Last Screenshot */}
                <div className="aspect-video w-full bg-black rounded overflow-hidden relative border border-slate-800">
                    {student.lastScreenshot ? (
                        <img
                            src={student.lastScreenshot}
                            alt={`${student.name}'s webcam`}
                            className="w-full h-full object-cover opacity-80"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-slate-700">
                            <MonitorX className="h-8 w-8" />
                        </div>
                    )}
                    {student.status === "ACTIVE" && (
                        <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-500/80 px-1.5 py-0.5 rounded text-[10px] font-bold text-white animate-pulse">
                            <span className="w-1.5 h-1.5 bg-white rounded-full" /> LIVE
                        </div>
                    )}
                </div>

                {student.status === "VIOLATION" && (
                    <div className="p-2 bg-red-950/30 border border-red-900/30 rounded text-xs text-red-400 flex items-center gap-2">
                        <MonitorX className="h-3 w-3" /> Tab Switch Detected
                    </div>
                )}

                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center gap-2 backdrop-blur-sm">
                    <Button size="sm" variant="secondary" onClick={() => onViewLog(student.id)}>
                        <Eye className="mr-2 h-4 w-4" /> Inspect
                    </Button>
                    <Button size="sm" variant="destructive" className="bg-red-950 hover:bg-red-900 text-red-500 border border-red-900">
                        Terminate Exam
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
