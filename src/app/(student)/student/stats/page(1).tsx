"use client";

import React from "react";
import { KnowledgeDashboardLayout } from "@/components/student/dashboard/KnowledgeDashboardLayout";
import { StatsHeader } from "@/components/student/stats/StatsHeader";
import { CompositeScoreHero } from "@/components/student/stats/CompositeScoreHero";
import { AnalyticsCharts } from "@/components/student/stats/AnalyticsCharts";

export default function StudentStatsPage() {
    return (
        <KnowledgeDashboardLayout hideRightSidebar>
            <div className="min-h-screen bg-[#F3F4F6] pb-24 font-friendly">

                {/* 1. Header */}
                <StatsHeader />

                <main className="max-w-[1600px] mx-auto p-6 md:p-8 space-y-8">

                    {/* 2. Composite Score Cards */}
                    <section>
                        <CompositeScoreHero />
                    </section>

                    {/* 3. Analytics Bento Grid */}
                    <section>
                        <AnalyticsCharts />
                    </section>

                </main>
            </div>
        </KnowledgeDashboardLayout>
    );
}
