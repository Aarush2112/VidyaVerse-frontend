"use client";

import React from "react";
import { CatalogStats } from "./CatalogStats";
import { RichCourseTable } from "./RichCourseTable";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, SortDesc } from "lucide-react";
import { Input } from "@/components/ui/input";

export function CourseManagerPage() {
    return (
        <div className="space-y-8">
            {/* Header & Control Deck */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-poppins">Course Catalog</h1>
                    <p className="text-slate-500 mt-2">Manage curriculum, review submissions, and track enrollment.</p>
                </div>

                <Button className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/25 text-white font-bold pl-5 pr-6 h-12">
                    <Plus className="mr-2 h-5 w-5" /> Create Course
                </Button>
            </div>

            {/* Metrics */}
            <CatalogStats />

            {/* Main Content Surface */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 min-h-[600px]">

                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <Input
                            placeholder="Search by title, code, or instructor..."
                            className="pl-12 h-12 rounded-full border-slate-200 bg-slate-50 focus:bg-white transition-all text-slate-700 font-medium"
                        />
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" className="rounded-full border-slate-200 text-slate-600 hover:bg-slate-50 h-10 px-4">
                            <Filter size={16} className="mr-2" />
                            Department
                        </Button>
                        <Button variant="outline" className="rounded-full border-slate-200 text-slate-600 hover:bg-slate-50 h-10 px-4">
                            <SortDesc size={16} className="mr-2" />
                            Status
                        </Button>
                    </div>
                </div>

                <RichCourseTable />
            </div>
        </div>
    );
}
