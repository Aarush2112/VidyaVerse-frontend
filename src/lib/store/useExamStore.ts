import { create } from 'zustand';

export type ExamStatus = 'LOBBY' | 'IN_PROGRESS' | 'SUBMITTED';

export interface Violation {
    id: string;
    type: 'tab_switch' | 'fullscreen_exit';
    timestamp: Date;
    message: string;
}

interface ExamState {
    status: ExamStatus;
    warnings: number;
    timeLeft: number; // in seconds
    violations: Violation[];

    // Hardware State
    isCameraReady: boolean;
    isMicReady: boolean;
    isScreenReady: boolean;
    mediaStream: MediaStream | null; // Webcam + Mic
    screenStream: MediaStream | null; // Screen Share

    // Actions
    setStatus: (status: ExamStatus) => void;
    setHardwareStatus: (type: 'camera' | 'mic' | 'screen', value: boolean) => void;
    addViolation: (type: Violation['type'], message: string) => void;
    setTimeLeft: (seconds: number) => void;
    decrementTime: () => void;
    setStreams: (type: 'media' | 'screen', stream: MediaStream | null) => void;
    resetExam: () => void;
}

export const useExamStore = create<ExamState>((set, get) => ({
    status: 'LOBBY',
    warnings: 0,
    timeLeft: 3600, // 60 minutes default
    violations: [],
    isCameraReady: false,
    isMicReady: false,
    isScreenReady: false,
    mediaStream: null,
    screenStream: null,

    setStatus: (status) => set({ status }),

    setHardwareStatus: (type, value) => set((state) => {
        if (type === 'camera') return { isCameraReady: value };
        if (type === 'mic') return { isMicReady: value };
        if (type === 'screen') return { isScreenReady: value };
        return {};
    }),

    setStreams: (type, stream) => set((state) => {
        if (type === 'media') return { mediaStream: stream };
        if (type === 'screen') return { screenStream: stream };
        return {};
    }),

    addViolation: (type, message) => set((state) => {
        const newViolation: Violation = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            timestamp: new Date(),
            message
        };
        return {
            violations: [...state.violations, newViolation],
            warnings: state.warnings + 1
        };
    }),

    setTimeLeft: (seconds) => set({ timeLeft: seconds }),

    decrementTime: () => set((state) => ({
        timeLeft: Math.max(0, state.timeLeft - 1)
    })),

    resetExam: () => set({
        status: 'LOBBY',
        warnings: 0,
        violations: [],
        isCameraReady: false,
        isMicReady: false,
        isScreenReady: false,
        mediaStream: null,
        screenStream: null,
    })
}));
