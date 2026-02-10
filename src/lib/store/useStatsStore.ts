import { create } from 'zustand';

export type TimeRange = '7d' | '30d' | 'semester' | 'all';

export interface AnalyticsData {
    timeRange: TimeRange;
    apiScore: number; // 0-1000
    codingHours: number[]; // Sparkline data
    skillMatrix: {
        subject: string;
        A: number; // Student
        B: number; // Class Avg
        fullMark: number;
    }[];
    contributions: { date: string; count: number }[];
    focusHours: { hour: string; activity: number }[];
    subjectDistribution: { name: string; value: number; color: string }[];
    setTimeRange: (range: TimeRange) => void;
}

const generateMockData = (range: TimeRange) => {
    // Mock logic to vary data slightly based on range
    return {
        apiScore: 842,
        codingHours: [12, 18, 10, 24, 8, 15, 20, 22, 14, 18, 28, 32], // Last 12 points
        skillMatrix: [
            { subject: 'Algorithms', A: 120, B: 110, fullMark: 150 },
            { subject: 'System Design', A: 98, B: 130, fullMark: 150 },
            { subject: 'Frontend', A: 86, B: 130, fullMark: 150 },
            { subject: 'Backend', A: 99, B: 100, fullMark: 150 },
            { subject: 'DevOps', A: 85, B: 90, fullMark: 150 },
            { subject: 'dbMS', A: 65, B: 85, fullMark: 150 },
        ],
        contributions: Array.from({ length: 52 * 7 }).map((_, i) => ({
            date: new Date(Date.now() - (365 - i) * 24 * 60 * 60 * 1000).toISOString(),
            count: Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0
        })),
        focusHours: Array.from({ length: 24 }).map((_, i) => ({
            hour: `${i}:00`,
            activity: Math.random() * 100 * (i > 20 || i < 2 ? 1.5 : 0.5) // Higher late night
        })),
        subjectDistribution: [
            { name: 'React', value: 40, color: '#8B5CF6' },
            { name: 'Python', value: 30, color: '#EC4899' },
            { name: 'SysAdmin', value: 15, color: '#3B82F6' },
            { name: 'Math', value: 15, color: '#10B981' },
        ]
    };
};

export const useStatsStore = create<AnalyticsData>((set, get) => ({
    timeRange: '7d',
    ...generateMockData('7d'),
    setTimeRange: (range) => set({ timeRange: range, ...generateMockData(range) }),
}));
