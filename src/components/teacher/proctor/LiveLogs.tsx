"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { ProctorEvent } from "./types"
import { AlertCircle, AlertTriangle, Info } from "lucide-react"

interface LiveLogsProps {
    events: ProctorEvent[]
}

export function LiveLogs({ events }: LiveLogsProps) {
    return (
        <div className="h-full flex flex-col bg-slate-950 border-l border-slate-800 w-80">
            <div className="p-4 border-b border-slate-800">
                <h3 className="text-slate-200 font-semibold mb-1">Athena Intelligence</h3>
                <p className="text-xs text-slate-500">Real-time anomaly detection</p>
            </div>
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {events.map((event) => (
                        <div key={event.id} className="flex gap-3 text-sm animate-in slide-in-from-right-2">
                            <div className="mt-0.5">
                                {event.type === "CRITICAL" && <AlertCircle className="h-4 w-4 text-red-500" />}
                                {event.type === "WARNING" && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                                {event.type === "INFO" && <Info className="h-4 w-4 text-slate-500" />}
                            </div>
                            <div className="space-y-1">
                                <p className={`font-medium ${event.type === "CRITICAL" ? "text-red-400" :
                                        event.type === "WARNING" ? "text-yellow-400" : "text-slate-300"
                                    }`}>
                                    {event.studentName}
                                </p>
                                <p className="text-slate-400 text-xs leading-relaxed">{event.message}</p>
                                <span className="text-[10px] text-slate-600 font-mono">{event.timestamp}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}
