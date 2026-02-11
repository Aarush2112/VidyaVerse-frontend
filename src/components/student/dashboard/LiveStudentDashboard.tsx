"use client";

import { useQuery } from '@tanstack/react-query';
import { fetchCommandCenterData } from "@/app/actions/dashboard";
import { useRealtime } from '@/hooks/use-realtime';
import { QUERY_KEYS } from '@/lib/query-keys';
import { LevelRing } from "@/components/student/dashboard/LevelRing";
import { MissionControl } from "@/components/student/dashboard/MissionControl";
import { TimelineWidget } from "@/components/student/dashboard/TimelineWidget";
import { ActiveOperationHero } from "@/components/student/dashboard/ActiveOperationHero";
import { Code2, BookOpen } from "lucide-react";
import Link from "next/link";
import { useUser } from '@clerk/nextjs';

interface LiveStudentDashboardProps {
    initialData: any;
}

export default function LiveStudentDashboard({ initialData }: LiveStudentDashboardProps) {
    const { user } = useUser();
    const userId = user?.id || "guest"; // Clerk ID

    // 1. Fetching Data with React Query
    const { data: dashboardData } = useQuery({
        queryKey: QUERY_KEYS.studentDashboard(userId),
        queryFn: () => fetchCommandCenterData(),
        initialData: initialData,
    });

    const data = dashboardData || initialData;

    // 2. Realtime Subscriptions
    // We listen to changes in these tables to trigger a dashboard refresh
    useRealtime('Assignment', QUERY_KEYS.studentDashboard(userId));
    useRealtime('User', QUERY_KEYS.studentDashboard(userId));
    useRealtime('UserProgress', QUERY_KEYS.studentDashboard(userId));
    // Note: 'Submission' updates might also affect gamification/missions, so good to listen
    useRealtime('Submission', QUERY_KEYS.studentDashboard(userId));

    return (
        <div className="min-h-screen bg-neu-base p-6 md:p-12 font-sans text-neu-text-main pb-32">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex flex-col gap-3 pl-2">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-neu-accent mb-1">
                        <span className="h-2 w-2 rounded-full bg-neu-accent shadow-neu-convex-sm" />
                        Command Center
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-neu-text-main tracking-tight neu-text-chiselled">
                        Welcome back, <br className="md:hidden" />
                        <span className="text-neu-accent">
                            {data.user.firstName}.
                        </span>
                    </h1>
                </div>

                {/* Main Grid: 3 Top Widgets */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:h-[420px]">
                    {/* Left: Level Ring (3 cols) */}
                    <div className="md:col-span-3 h-full">
                        <LevelRing level={data.gamification.level} xp={data.gamification.xp} />
                    </div>

                    {/* Middle: Mission Control (5 cols) */}
                    <div className="md:col-span-5 h-full flex flex-col gap-8">
                        <div className="flex-1">
                            <MissionControl
                                streak={data.gamification.streak}
                                rank={data.gamification.rank}
                                pendingCount={data.missions.pendingCount}
                                nextMission={data.missions.nextMission}
                            />
                        </div>
                        {/* Quick Actions Integration */}
                        <div className="h-20 grid grid-cols-2 gap-8">
                            <Link href="/student/arena" className="group flex items-center justify-center gap-3 bg-neu-base rounded-neu-sm shadow-neu-convex-md hover:shadow-neu-float hover:-translate-y-1 active:shadow-neu-concave-md transition-all">
                                <Code2 size={20} className="text-neu-accent group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-bold text-neu-text-main">Arena</span>
                            </Link>
                            <Link href="/student/assignments" className="group flex items-center justify-center gap-3 bg-neu-base rounded-neu-sm shadow-neu-convex-md hover:shadow-neu-float hover:-translate-y-1 active:shadow-neu-concave-md transition-all">
                                <BookOpen size={20} className="text-neu-text-main group-hover:text-neu-accent group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-bold text-neu-text-main">Assignments</span>
                            </Link>
                        </div>
                    </div>

                    {/* Right: Timeline (4 cols) */}
                    <div className="md:col-span-4 h-full">
                        <TimelineWidget events={data.schedule} />
                    </div>
                </div>

                {/* Bottom: Active Operation Hero */}
                <div className="">
                    <ActiveOperationHero
                        courseTitle={data.activeOperation?.courseTitle || "No Active Course"}
                        moduleTitle={data.activeOperation?.moduleTitle || "Start Your Journey"}
                        progress={data.activeOperation?.progress || 0}
                        lastAccessedLabel={data.activeOperation?.lastAccessedLabel || "START"}
                        resumeLink={data.activeOperation?.courseId
                            ? `/student/courses/${data.activeOperation.courseId}`
                            : "/student/courses"}
                    />
                </div>
            </div>
        </div>
    );
}
