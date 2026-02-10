"use client";

import React from "react";
import { KnowledgeDashboardLayout } from "@/components/student/dashboard/KnowledgeDashboardLayout";
import { ScheduleHeader } from "@/components/student/schedule/ScheduleHeader";
import { CalendarGrid } from "@/components/student/schedule/CalendarGrid";
import { UpNextRail } from "@/components/student/schedule/UpNextRail";
import { motion } from "framer-motion";

export default function StudentSchedulePage() {
    return (
        <KnowledgeDashboardLayout hideRightSidebar>
            {/* Main Layout Layer */}
            <div className="min-h-screen bg-[#F3F4F6] relative font-friendly pb-12">

                {/* 1. Sticky Header */}
                <ScheduleHeader />

                <main className="max-w-[1600px] mx-auto p-6 md:p-8 pt-6">
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

                        {/* 2. Main Calendar Stage (Left 8 cols) */}
                        <motion.div
                            className="xl:col-span-8 h-full"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <CalendarGrid />
                        </motion.div>

                        {/* 3. The Focus Zone (Right 4 cols) */}
                        <motion.aside
                            className="xl:col-span-4 space-y-8"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <UpNextRail />
                        </motion.aside>

                    </div>
                </main>
            </div>
        </KnowledgeDashboardLayout>
    );
}
