export type UserRole = "STUDENT" | "TEACHER" | "ADMIN";
export type UserStatus = "ACTIVE" | "BANNED" | "PENDING";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    batch?: string; // e.g., "CSE 2026"
    status: UserStatus;
    lastLogin: string;
    xp: number; // For the gamification aspect
    isOnline: boolean;
}
