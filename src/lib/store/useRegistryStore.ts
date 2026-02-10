import { create } from 'zustand';

export interface Student {
    id: string; // profileId
    userId: string;
    name: string;
    email: string;
    rollNumber: string;
    cohort: string;
    avatarUrl?: string;

    metrics: {
        gpa: number;
        attendance: number;
        velocity: number[]; // Sparkline data (last 10 scores)
    };

    risk: {
        isFlagged: boolean;
        reason?: string;
        score: number;
    };
}

interface RegistryState {
    students: Student[];
    filters: {
        search: string;
        status: 'ALL' | 'AT_RISK' | 'TOP_PERFORMER';
        cohort: string;
    };
    selectedIds: string[];
    activeStudentId: string | null;

    // Actions
    setStudents: (students: Student[]) => void;
    setFilter: (key: keyof RegistryState['filters'], value: any) => void;
    toggleSelection: (id: string) => void;
    selectAll: () => void;
    deselectAll: () => void;
    setActiveStudent: (id: string | null) => void;

    // Optimistic Updates
    updateStudentStatus: (id: string, isFlagged: boolean, reason?: string) => void;
}

// Mock Data for Initial Render / Fallback
const MOCK_STUDENTS: Student[] = [
    {
        id: '1', userId: 'u1', name: 'Rohan Das', email: 'rohan@college.edu', rollNumber: 'CS26001', cohort: 'Spring 2026',
        metrics: { gpa: 8.8, attendance: 92, velocity: [70, 75, 80, 82, 85, 88, 85, 90, 92, 95] },
        risk: { isFlagged: false, score: 10 }
    },
    {
        id: '2', userId: 'u2', name: 'Aditya Kumar', email: 'aditya@college.edu', rollNumber: 'CS26002', cohort: 'Spring 2026',
        metrics: { gpa: 6.2, attendance: 65, velocity: [60, 55, 50, 45, 60, 65, 50, 48, 45, 40] },
        risk: { isFlagged: true, reason: 'Consistent Absence', score: 85 }
    },
    {
        id: '3', userId: 'u3', name: 'Priya Sharma', email: 'priya@college.edu', rollNumber: 'CS26003', cohort: 'Spring 2026',
        metrics: { gpa: 9.5, attendance: 98, velocity: [90, 92, 95, 94, 96, 98, 97, 99, 100, 99] },
        risk: { isFlagged: false, score: 0 }
    }
];

export const useRegistryStore = create<RegistryState>((set) => ({
    students: MOCK_STUDENTS,
    filters: {
        search: '',
        status: 'ALL',
        cohort: 'Spring 2026'
    },
    selectedIds: [],
    activeStudentId: null,

    setStudents: (students) => set({ students }),

    setFilter: (key, value) => set((state) => ({
        filters: { ...state.filters, [key]: value }
    })),

    toggleSelection: (id) => set((state) => {
        const isSelected = state.selectedIds.includes(id);
        return {
            selectedIds: isSelected
                ? state.selectedIds.filter(sid => sid !== id)
                : [...state.selectedIds, id]
        };
    }),

    selectAll: () => set((state) => ({
        selectedIds: state.students.map(s => s.id)
    })),

    deselectAll: () => set({ selectedIds: [] }),

    setActiveStudent: (activeStudentId) => set({ activeStudentId }),

    updateStudentStatus: (id, isFlagged, reason) => set((state) => ({
        students: state.students.map(s =>
            s.id === id
                ? { ...s, risk: { ...s.risk, isFlagged, reason, score: isFlagged ? 80 : 20 } }
                : s
        )
    }))
}));
