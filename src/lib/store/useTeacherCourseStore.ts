import { create } from 'zustand';

export type CourseStatus = 'LIVE' | 'DRAFT' | 'ARCHIVED';
export type Stream = 'CSE' | 'ECE' | 'AI/ML' | 'MECH' | 'CIVIL';

export interface Course {
    id: string;
    title: string;
    code: string; // e.g., CS101
    thumbnail: string; // URL or gradient ID
    description: string;
    semester: string; // "Spring 2026"
    stream: Stream;
    status: CourseStatus;
    stats: {
        enrolled: number;
        avgGrade: number;
        attendance: number; // Percentage
        syllabusCompletion: number; // 0-100
    };
    collaborators: string[]; // Teacher IDs
}

interface TeacherCourseState {
    courses: Course[];
    filter: {
        status: CourseStatus | 'ALL';
        searchQuery: string;
        semester: string;
        stream: Stream | 'ALL';
    };
    viewMode: 'GRID' | 'LIST';

    // Actions
    setFilter: (key: keyof TeacherCourseState['filter'], value: any) => void;
    setViewMode: (mode: 'GRID' | 'LIST') => void;
    fetchCourses: () => Promise<void>;
    createCourse: (data: Partial<Course>) => Promise<void>;
    duplicateCourse: (id: string) => Promise<void>;
    archiveCourse: (id: string) => Promise<void>;
    setCourses: (courses: Course[]) => void;
}

// Mock Data Generator
const MOCK_COURSES: Course[] = [
    {
        id: '1',
        title: 'Data Structures & Algorithms',
        code: 'CSE-201',
        thumbnail: 'gradient-violet',
        description: 'Core concepts of DSA including Trees, Graphs, and DP.',
        semester: 'Spring 2026',
        stream: 'CSE',
        status: 'LIVE',
        stats: { enrolled: 142, avgGrade: 85, attendance: 92, syllabusCompletion: 65 },
        collaborators: []
    },
    {
        id: '2',
        title: 'Operating Systems Internals',
        code: 'CSE-302',
        thumbnail: 'gradient-emerald',
        description: 'Deep dive into Kernel, Memory Management, and Concurrency.',
        semester: 'Spring 2026',
        stream: 'CSE',
        status: 'LIVE',
        stats: { enrolled: 56, avgGrade: 74, attendance: 88, syllabusCompletion: 88 },
        collaborators: []
    },
    {
        id: '3',
        title: 'Intro to Neural Networks',
        code: 'AI-401',
        thumbnail: 'gradient-rose',
        description: 'Foundations of Deep Learning and Backpropagation.',
        semester: 'Spring 2026',
        stream: 'AI/ML',
        status: 'DRAFT',
        stats: { enrolled: 89, avgGrade: 0, attendance: 0, syllabusCompletion: 12 },
        collaborators: []
    },
    {
        id: '4',
        title: 'Advanced System Design',
        code: 'CSE-450',
        thumbnail: 'gradient-dark',
        description: 'Architecting scalable distributed systems.',
        semester: 'Spring 2026',
        stream: 'CSE',
        status: 'LIVE',
        stats: { enrolled: 42, avgGrade: 68, attendance: 75, syllabusCompletion: 45 },
        collaborators: []
    },
    {
        id: '5',
        title: 'Computer Graphics',
        code: 'CSE-305',
        thumbnail: 'gradient-orange',
        description: 'Rendering pipelines, Ray Tracing, and WebGL.',
        semester: 'Fall 2025',
        stream: 'CSE',
        status: 'ARCHIVED',
        stats: { enrolled: 30, avgGrade: 92, attendance: 95, syllabusCompletion: 100 },
        collaborators: []
    }
];

export const useTeacherCourseStore = create<TeacherCourseState>((set, get) => ({
    courses: MOCK_COURSES,
    filter: {
        status: 'ALL',
        searchQuery: '',
        semester: 'Spring 2026',
        stream: 'ALL'
    },
    viewMode: 'GRID',

    setFilter: (key, value) => set((state) => ({
        filter: { ...state.filter, [key]: value }
    })),

    setViewMode: (mode) => set({ viewMode: mode }),

    fetchCourses: async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        set({ courses: MOCK_COURSES });
    },

    createCourse: async (data) => {
        const newCourse: Course = {
            id: Math.random().toString(36).substr(2, 9),
            title: data.title || 'Untitled Course',
            code: data.code || 'NEW-101',
            thumbnail: 'gradient-violet',
            description: data.description || '',
            semester: 'Spring 2026',
            stream: data.stream || 'CSE',
            status: 'DRAFT',
            stats: { enrolled: 0, avgGrade: 0, attendance: 0, syllabusCompletion: 0 },
            collaborators: []
        };
        set(state => ({ courses: [newCourse, ...state.courses] }));
    },

    duplicateCourse: async (id) => {
        const course = get().courses.find(c => c.id === id);
        if (!course) return;

        const newCourse: Course = {
            ...course,
            id: Math.random().toString(36).substr(2, 9),
            title: `${course.title} (Copy)`,
            status: 'DRAFT',
            stats: { ...course.stats, enrolled: 0, avgGrade: 0, attendance: 0, syllabusCompletion: 0 }
        };

        set(state => ({ courses: [newCourse, ...state.courses] }));
    },

    archiveCourse: async (id) => {
        set(state => ({
            courses: state.courses.map(c =>
                c.id === id ? { ...c, status: 'ARCHIVED' } : c
            )
        }));
    },

    setCourses: (courses) => set({ courses })
}));
