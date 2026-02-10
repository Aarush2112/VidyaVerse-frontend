export type ProctorStatus = "ONLINE" | "IDLE" | "VIOLATION" | "OFFLINE" | "ACTIVE"

export interface StudentSession {
    id: string
    name: string
    avatar?: string
    status: ProctorStatus
    lastActive: string
    warnings: number
    currentProblem: string
    tabSwitches: number
    codeLines: number
    lastScreenshot?: string | null
}

export interface ProctorEvent {
    id: string
    studentId: string
    studentName: string
    type: "INFO" | "WARNING" | "CRITICAL"
    message: string
    timestamp: string
}
