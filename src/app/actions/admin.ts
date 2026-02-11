'use server'

export async function getAdminCourses() {
    return [];
}

export async function getCourseStats() {
    return {
        totalCourses: 0,
        totalStudents: 0,
        activeCourses: 0,
    };
}
