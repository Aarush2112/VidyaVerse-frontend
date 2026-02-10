"use client";

import { useState, useEffect } from "react";
import { Info } from "lucide-react";
import { PastelStatCards } from "@/components/teacher/grading/PastelStatCards";
import { SmartGradeTable } from "@/components/teacher/grading/SmartGradeTable";
import { SoftGradebookLayout } from "@/components/teacher/grading/SoftGradebookLayout";
import { getGradebookData, GradebookRow } from "@/app/actions/grading";

export default function GradebookPage() {
    const [selectedBatch, setSelectedBatch] = useState("CSE-A: Data Structures");
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("All");
    const [data, setData] = useState<GradebookRow[]>([]);

    useEffect(() => {
        getGradebookData().then(setData).catch(console.error);
    }, []);

    const handleUpdateGrade = ({ id, columnId, value }: { id: string; columnId: string; value: number }) => {
        setData(prev => prev.map(row => {
            if (row.id === id) {
                return { ...row, [columnId]: value };
            }
            return row;
        }));
        // TODO: Call server action to persist grade
    };

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
            <SmartGradeTable
                searchQuery={searchQuery}
                data={data}
                onUpdateGrade={handleUpdateGrade}
            />

            {/* 5. Visual Legend (Data Garden Legend) */}
            <div className="flex items-center gap-8 py-6 text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400">
                <span className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#5B86E5]/10 border border-[#5B86E5]/30" /> Heatmap Intensity (Score)
                </span>
                <span className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#15803D]" /> Performance Pass
                </span>
                <span className="flex items-center gap-3 text-slate-600 cursor-help group transition-colors hover:text-[#5B86E5]">
                    <Info className="h-4 w-4 text-slate-300 group-hover:text-[#5B86E5] transition-colors" /> Deep Analytics Drill-down
                </span>
            </div>
        </SoftGradebookLayout>
    );
}
