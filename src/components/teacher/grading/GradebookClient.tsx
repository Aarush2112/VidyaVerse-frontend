"use client";

import React, { useState } from "react";
import { SoftGradebookLayout } from "@/components/teacher/grading/SoftGradebookLayout";
import { PastelStatCards } from "@/components/teacher/grading/PastelStatCards";
import LiveGradebook from "@/components/teacher/grading/LiveGradebook";
import { GradebookRow } from "@/app/actions/grading";

export default function GradebookClient({ initialData }: { initialData: GradebookRow[] }) {
    const [selectedBatch, setSelectedBatch] = useState("CSE-A: Data Structures");
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("All");

    return (
        <SoftGradebookLayout
            selectedBatch={selectedBatch}
            setSelectedBatch={setSelectedBatch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filter={filter}
            setFilter={setFilter}
            headerContent={<PastelStatCards />}
        >
            <LiveGradebook initialData={initialData} />
            {/* Note: Searching filtering currently happens inside SmartGradeTable logic for search, 
                but SmartGradeTable accepts searchQuery prop.
                We need to pass searchQuery to LiveGradebook -> SmartGradeTable.
                LiveGradebook needs to be updated to pass props down.
            */}
        </SoftGradebookLayout>
    );
}
