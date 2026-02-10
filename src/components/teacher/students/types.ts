export type Student = {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    joinDate: string; // ISO date
    status: "Active" | "Inactive" | "At Risk";
    progress: number; // 0-100
    enrolledCourses: number;
    averageGrade: number;
    lastActive: string;
};
