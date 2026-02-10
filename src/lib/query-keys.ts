export const QUERY_KEYS = {
    // Student Scope
    studentDashboard: (userId: string) => ['student', 'dashboard', userId],
    studentAssignments: (userId: string) => ['student', 'assignments', userId],
    studentStats: (userId: string) => ['student', 'stats', userId],

    // Teacher Scope
    teacherDashboard: ['teacher', 'dashboard'],
    teacherCourses: ['teacher', 'courses'],
    courseDetails: (courseId: string) => ['course', courseId],
    assignmentSubmissions: (assignmentId: string) => ['assignment', assignmentId, 'submissions'],

    // Global
    notifications: (userId: string) => ['notifications', userId],
    userProfile: (userId: string) => ['user', userId],
} as const;
