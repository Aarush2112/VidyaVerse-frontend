"use client"

import { Button } from "@/components/ui/button"
import { Play, Pause, Square, Radio, Users } from "lucide-react"

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ProctorHeaderProps {
    sessionName: string
    activeStudents: number
    onPause: () => void
    onTerminate: () => void
    backHref?: string
}

export function ProctorHeader({ sessionName, activeStudents, onPause, onTerminate, backHref }: ProctorHeaderProps) {
    return (
        <div className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-4">
                {backHref && (
                    <Link href={backHref}>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                )}
                <div className="bg-red-500/10 p-2 rounded-full animate-pulse">
                    <Radio className="h-5 w-5 text-red-500" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                        {sessionName} <span className="text-xs font-normal text-slate-400 border border-slate-700 px-2 py-0.5 rounded">LIVE</span>
                    </h1>
                    <p className="text-sm text-slate-400 flex items-center gap-1">
                        <Users className="h-3 w-3" /> {activeStudents} Candidates Connected
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white bg-transparent" onClick={onPause}>
                    <Pause className="mr-2 h-4 w-4" /> Pause Exam
                </Button>
                <Button variant="destructive" onClick={onTerminate}>
                    <Square className="mr-2 h-4 w-4 fill-current" /> Terminate Session
                </Button>
            </div>
        </div>
    )
}
