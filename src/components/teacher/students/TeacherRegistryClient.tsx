"use client";

import { useRegistryStore, Student } from "@/lib/store/useRegistryStore";
import { RegistryControlBar } from "@/components/teacher/students/RegistryControlBar";
import { StudentRow } from "@/components/teacher/students/StudentRow";
import { RegistryStats } from "@/components/teacher/students/RegistryStats";
import { StudentDetailDrawer } from "@/components/teacher/students/StudentDetailDrawer";
import { AnimatePresence } from "framer-motion";
import { useMemo, useEffect } from "react";

interface TeacherRegistryClientProps {
    initialStudents: Student[];
}

export function TeacherRegistryClient({ initialStudents }: TeacherRegistryClientProps) {
    const { students, filters, selectedIds, toggleSelection, setStudents } = useRegistryStore();

    // Hydrate
    useEffect(() => {
        useRegistryStore.setState({ students: initialStudents });
    }, [initialStudents]);

    const displayStudents = students.length > 0 ? students : initialStudents;

    const filteredStudents = useMemo(() => {
        return displayStudents.filter(student => {
            // Status Filter
            if (filters.status === 'AT_RISK' && !student.risk.isFlagged) return false;
            if (filters.status === 'TOP_PERFORMER' && student.metrics.gpa < 9.0) return false;

            // Search Filter
            if (filters.search) {
                const query = filters.search.toLowerCase();
                return student.name.toLowerCase().includes(query) ||
                    student.rollNumber.toLowerCase().includes(query);
            }

            return true;
        });
    }, [displayStudents, filters]);

    return (
        <div className="max-w-7xl mx-auto pb-20 px-6">
            <RegistryControlBar />
            <RegistryStats />

            <div className="space-y-1">
                <AnimatePresence>
                    {filteredStudents.map((student) => (
                        <StudentRow
                            key={student.id}
                            student={student}
                            isSelected={selectedIds.includes(student.id)}
                            onToggle={() => toggleSelection(student.id)}
                        />
                    ))}
                </AnimatePresence>

                {filteredStudents.length === 0 && (
                    <div className="py-20 text-center text-slate-400">
                        <p>No students found matching your criteria.</p>
                    </div>
                )}
            </div>

            <StudentDetailDrawer />
        </div>
    );
}
