import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// --- Types based on Mega-Prompt Schema ---

export interface UserProfile {
    id: string;
    email: string;
    fullName?: string;
    role: 'STUDENT' | 'ADMIN' | 'MENTOR';
    xp: number;
    level: number;
    currentStreak: number;
    avatarUrl?: string;
    githubHandle?: string;
    linkedinUrl?: string;
}

export interface ActivityData {
    day: string;
    codeHours: number;
    theoryHours: number;
}

export interface Challenge {
    id: string;
    title: string;
    difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    isCompleted: boolean;
}

export interface ProjectTask {
    id: string;
    title: string;
    isCompleted: boolean;
    assigneeId?: string; // For collaborative projects
}

interface StudentState {
    // --- A. userSlice ---
    user: UserProfile | null;
    isLoading: boolean;

    fetchProfile: () => Promise<void>;
    updateSocials: (github: string, linkedin: string) => Promise<void>;

    // --- B. dashboardSlice ---
    codingVelocity: ActivityData[];
    activeChallenge: Challenge | null;
    sprintTasks: ProjectTask[];

    fetchDashboardData: () => Promise<void>;
    toggleTask: (taskId: string) => void;

    // --- C. uiSlice ---
    isSidebarCollapsed: boolean;
    themeDensity: 'COMFORTABLE' | 'COMPACT';
    activeModal: 'NONE' | 'MENTOR_BOOKING' | 'PROJECT_DETAILS';

    toggleSidebar: () => void;
    setThemeDensity: (density: 'COMFORTABLE' | 'COMPACT') => void;
    openModal: (modal: 'NONE' | 'MENTOR_BOOKING' | 'PROJECT_DETAILS') => void;
}

// --- Mock Data Generators (until API is live) ---
const MOCK_VELOCITY = [
    { day: 'Mon', codeHours: 2.5, theoryHours: 1.0 },
    { day: 'Tue', codeHours: 3.0, theoryHours: 0.5 },
    { day: 'Wed', codeHours: 1.5, theoryHours: 2.0 },
    { day: 'Thu', codeHours: 4.0, theoryHours: 0.0 },
    { day: 'Fri', codeHours: 2.0, theoryHours: 1.5 },
    { day: 'Sat', codeHours: 5.0, theoryHours: 1.0 },
    { day: 'Sun', codeHours: 1.0, theoryHours: 0.5 },
];

const MOCK_CHALLENGE: Challenge = {
    id: 'c-101',
    title: 'Invert Binary Tree',
    difficulty: 'INTERMEDIATE',
    isCompleted: false,
};

const MOCK_TASKS: ProjectTask[] = [
    { id: '1', title: 'Setup Next.js Project', isCompleted: true },
    { id: '2', title: 'Design Database Schema', isCompleted: true },
    { id: '3', title: 'Implement Auth Flow', isCompleted: false },
    { id: '4', title: 'Build Dashboard UI', isCompleted: false },
];

export const useStudentStore = create<StudentState>()(
    persist(
        (set, get) => ({
            // --- Initial State ---
            user: null,
            isLoading: false,

            codingVelocity: MOCK_VELOCITY,
            activeChallenge: MOCK_CHALLENGE,
            sprintTasks: MOCK_TASKS,

            isSidebarCollapsed: false,
            themeDensity: 'COMFORTABLE',
            activeModal: 'NONE',

            // --- Actions ---

            fetchProfile: async () => {
                set({ isLoading: true });
                try {
                    // TODO: Replace with real API call
                    // const res = await fetch('/api/user/me');
                    // const data = await res.json();

                    // Simulating API delay
                    await new Promise(resolve => setTimeout(resolve, 800));

                    set({
                        user: {
                            id: 'u-123',
                            email: 'student@example.com',
                            fullName: 'Poorak Pandey',
                            role: 'STUDENT',
                            xp: 8540,
                            level: 12,
                            currentStreak: 14,
                            avatarUrl: 'https://github.com/shadcn.png',
                            githubHandle: 'poorak',
                            linkedinUrl: 'poorak-pandey'
                        },
                        isLoading: false
                    });
                } catch (error) {
                    console.error("Failed to fetch profile", error);
                    set({ isLoading: false });
                }
            },

            updateSocials: async (github, linkedin) => {
                // Optimistic Update
                const currentUser = get().user;
                if (currentUser) {
                    set({ user: { ...currentUser, githubHandle: github, linkedinUrl: linkedin } });
                }
                // Fire API
                // await fetch('/api/user/socials', { ... });
            },

            fetchDashboardData: async () => {
                // This would fetch velocity, tasks, challenge in one go
            },

            toggleTask: (taskId) => {
                set((state) => ({
                    sprintTasks: state.sprintTasks.map(t =>
                        t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t
                    )
                }));
                // Fire API sync
            },

            toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
            setThemeDensity: (density) => set({ themeDensity: density }),
            openModal: (modal) => set({ activeModal: modal })
        }),
        {
            name: 'vidyaverse-storage',
            partialize: (state) => ({
                isSidebarCollapsed: state.isSidebarCollapsed,
                themeDensity: state.themeDensity
            }), // Only persist UI state
        }
    )
);
