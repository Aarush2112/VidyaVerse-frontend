"use client";

import { useEffect } from "react";
import { useCourseStore, Course } from "@/lib/store/useCourseStore";

export function CourseHydrator({ courses }: { courses: Course[] }) {
    useEffect(() => {
        useCourseStore.setState({ courses });
    }, [courses]);
    return null;
}
