import { create } from 'zustand';

export type CourseStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'SAVED';
export type CourseFilter = 'All Courses' | 'In Progress' | 'Completed' | 'Saved';

export interface Course {
    id: string;
    title: string;
    instructor: string;
    thumbnail: string;
    tags: string[];
    totalModules: number;
    completedModules: number;
    lastAccessed: Date;
    status: CourseStatus;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface CourseState {
    courses: Course[];
    filter: CourseFilter;
    searchQuery: string;
    setFilter: (filter: CourseFilter) => void;
    setSearchQuery: (query: string) => void;
    filteredCourses: () => Course[];
}

const MOCK_COURSES: Course[] = [
    {
        id: '1',
        title: 'Advanced React Patterns',
        instructor: 'Dr. Angela Yu',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
        tags: ['Frontend', 'React', 'Hooks'],
        totalModules: 12,
        completedModules: 4,
        lastAccessed: new Date(), // Just now
        status: 'IN_PROGRESS',
        difficulty: 'Advanced',
    },
    {
        id: '2',
        title: 'GoLang Microservices',
        instructor: 'Trevor Sawler',
        thumbnail: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=800&auto=format&fit=crop',
        tags: ['Backend', 'Go', 'Docker'],
        totalModules: 20,
        completedModules: 18,
        lastAccessed: new Date(Date.now() - 86400000 * 2), // 2 days ago
        status: 'IN_PROGRESS',
        difficulty: 'Intermediate',
    },
    {
        id: '3',
        title: 'Kubernetes for Developers',
        instructor: 'Stephen Grider',
        thumbnail: 'https://images.unsplash.com/photo-1667372393119-c81c0cda0a29?q=80&w=800&auto=format&fit=crop',
        tags: ['DevOps', 'K8s', 'Cloud'],
        totalModules: 15,
        completedModules: 0,
        lastAccessed: new Date(Date.now() - 86400000 * 10),
        status: 'NOT_STARTED',
        difficulty: 'Advanced',
    },
    {
        id: '4',
        title: 'System Design Interview',
        instructor: 'Alex Xu',
        thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop',
        tags: ['Architecture', 'Scalability'],
        totalModules: 10,
        completedModules: 2,
        lastAccessed: new Date(Date.now() - 86400000 * 5),
        status: 'SAVED',
        difficulty: 'Advanced',
    },
    {
        id: '5',
        title: 'Python for Data Science',
        instructor: 'Jose Portilla',
        thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop',
        tags: ['Data Science', 'Python', 'ML'],
        totalModules: 25,
        completedModules: 25,
        lastAccessed: new Date(Date.now() - 86400000 * 30),
        status: 'COMPLETED',
        difficulty: 'Beginner',
    },
    {
        id: '6',
        title: 'Rust Programming',
        instructor: 'Nathan Stocks',
        thumbnail: 'https://images.unsplash.com/photo-1592609931095-54a2168ae893?q=80&w=800&auto=format&fit=crop',
        tags: ['Systems', 'Rust', 'Memory Safety'],
        totalModules: 18,
        completedModules: 5,
        lastAccessed: new Date(Date.now() - 86400000 * 1),
        status: 'IN_PROGRESS',
        difficulty: 'Intermediate',
    },
    {
        id: '7',
        title: 'AWS Certified Solutions Architect',
        instructor: 'Stephane Maarek',
        thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
        tags: ['Cloud', 'AWS', 'Certification'],
        totalModules: 30,
        completedModules: 1,
        lastAccessed: new Date(Date.now() - 86400000 * 15),
        status: 'IN_PROGRESS',
        difficulty: 'Intermediate',
    },
    {
        id: '8',
        title: 'Next.js 14 Full Stack',
        instructor: 'Hamed Bahram',
        thumbnail: 'https://images.unsplash.com/photo-1618477247222-ac5913054c26?q=80&w=800&auto=format&fit=crop',
        tags: ['Fullstack', 'Next.js', 'React'],
        totalModules: 14,
        completedModules: 0,
        lastAccessed: new Date(Date.now() - 86400000 * 20),
        status: 'NOT_STARTED',
        difficulty: 'Intermediate',
    },
];

export const useCourseStore = create<CourseState>((set, get) => ({
    courses: MOCK_COURSES,
    filter: 'All Courses',
    searchQuery: '',
    setFilter: (filter) => set({ filter }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    filteredCourses: () => {
        const { courses, filter, searchQuery } = get();
        let result = courses;

        // 1. Status Filter
        if (filter !== 'All Courses') {
            const statusMap: Record<string, CourseStatus> = {
                'In Progress': 'IN_PROGRESS',
                'Completed': 'COMPLETED',
                'Saved': 'SAVED'
            };
            if (statusMap[filter]) {
                result = result.filter(c => c.status === statusMap[filter]);
            }
        }

        // 2. Search Filter
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(c =>
                c.title.toLowerCase().includes(q) ||
                c.tags.some(t => t.toLowerCase().includes(q)) ||
                c.instructor.toLowerCase().includes(q)
            );
        }

        // Sort by last accessed descending
        return result.sort((a, b) => b.lastAccessed.getTime() - a.lastAccessed.getTime());
    }
}));
