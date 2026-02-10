import { create } from 'zustand';

interface GradingItem {
    id: string;
    studentName: string;
    studentAvatar: string;
    assignment: string;
    submittedAt: string;
    plagiarismScore: number; // 0-100
    autoGradeScore: number; // 0-10
    status: 'PENDING' | 'GRADED';
}

interface AtRiskStudent {
    id: string;
    name: string;
    reason: 'ATTENDANCE' | 'GRADES' | 'INACTIVITY';
    detail: string;
    trend: 'DOWN' | 'STABLE';
}

interface TeacherDashboardState {
    activeSession: {
        subject: string;
        location: string;
        attendanceCount: number;
        totalStudents: number;
        isLive: boolean;
        startedAt: Date;
    };
    metrics: {
        engagement: { value: number; trend: number; history: number[] };
        pendingEvals: { value: number; urgent: number };
        classHealth: { value: number; trend: number }; // 0-100
    };
    gradingQueue: GradingItem[];
    atRiskStudents: AtRiskStudent[];

    // Actions
    startSession: () => void;
    endSession: () => void;
    markGraded: (id: string) => void;
}

export const useTeacherStore = create<TeacherDashboardState>((set) => ({
    activeSession: {
        subject: "Distributed Systems: Consensus Algorithms",
        location: "Lecture Hall A",
        attendanceCount: 48,
        totalStudents: 60,
        isLive: true,
        startedAt: new Date(),
    },
    metrics: {
        engagement: {
            value: 87,
            trend: 5,
            history: [65, 70, 75, 72, 80, 85, 87]
        },
        pendingEvals: {
            value: 14,
            urgent: 3
        },
        classHealth: {
            value: 78,
            trend: 2
        },
    },
    gradingQueue: [
        {
            id: "1",
            studentName: "Rohan Das",
            studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan",
            assignment: "Microservices Lab 3",
            submittedAt: "2 hours ago",
            plagiarismScore: 12,
            autoGradeScore: 8,
            status: 'PENDING'
        },
        {
            id: "2",
            studentName: "Sarah Smith",
            studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            assignment: "Docker Containers",
            submittedAt: "5 hours ago",
            plagiarismScore: 85, // High risk
            autoGradeScore: 9,
            status: 'PENDING'
        },
        {
            id: "3",
            studentName: "Arjun Verma",
            studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
            assignment: "Kubernetes Basics",
            submittedAt: "1 day ago",
            plagiarismScore: 5,
            autoGradeScore: 10,
            status: 'PENDING'
        }
    ],
    atRiskStudents: [
        {
            id: "1",
            name: "Aditya Kumar",
            reason: "ATTENDANCE",
            detail: "Missed 3 labs consecutively",
            trend: "DOWN"
        },
        {
            id: "2",
            name: "Priya Sharma",
            reason: "GRADES",
            detail: "Failed Mid-Sem Exam (32%)",
            trend: "STABLE"
        },
        {
            id: "3",
            name: "Vikram Singh",
            reason: "INACTIVITY",
            detail: "No login in 5 days",
            trend: "DOWN"
        }
    ],

    startSession: () => set((state) => ({
        activeSession: { ...state.activeSession, isLive: true }
    })),
    endSession: () => set((state) => ({
        activeSession: { ...state.activeSession, isLive: false }
    })),
    markGraded: (id) => set((state) => ({
        gradingQueue: state.gradingQueue.filter(item => item.id !== id)
    })),
}));
