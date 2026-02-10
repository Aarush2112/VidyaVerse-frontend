"use client";

import React from "react";
import { motion } from "framer-motion";
import { MetricCard } from "@/components/teacher/dashboard/MetricCard";
import { LiveSessionHero } from "@/components/teacher/dashboard/LiveSessionHero";
import { GradingQueue } from "@/components/teacher/dashboard/GradingQueue";
import { AtRiskRadar } from "@/components/teacher/dashboard/AtRiskRadar";
import { Users, BookOpen, BrainCircuit } from "lucide-react";
import { TeacherDashboardData } from "@/app/actions/teacher";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 20
        }
    }
};

interface TeacherDashboardClientProps {
    data: TeacherDashboardData;
}

export const TeacherDashboardClient = ({ data }: TeacherDashboardClientProps) => {
    const { metrics, gradingQueue, atRiskStudents, activeSession } = data;

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto space-y-8 pb-20"
        >
            {/* Header / Intro */}
            <motion.div variants={itemVariants} className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight font-sans">Command Center</h1>
                    <p className="text-slate-500 font-medium mt-1">Real-time oversight for your courses</p>
                </div>
                <div className="flex gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse mt-2"></span>
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">System Operational</span>
                </div>
            </motion.div>

            {/* Top Row: Metrics */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard
                    title="Active Engagement"
                    value={`${metrics.engagement.value}%`}
                    trend={{ value: metrics.engagement.trend, isPositive: true, label: "vs last week" }}
                    type="sparkline"
                    data={metrics.engagement.history.map(v => ({ value: v }))}
                    color="violet"
                    icon={Users}
                />
                <MetricCard
                    title="Pending Evaluations"
                    value={metrics.pendingEvals.value}
                    type="bar" // Simplified bar chart since we don't have urgent split in simple metric yet, or we assume data is formatted
                    data={[
                        { value: Math.floor(metrics.pendingEvals.value * 0.2), urgent: false },
                        { value: Math.floor(metrics.pendingEvals.value * 0.3), urgent: false },
                        { value: metrics.pendingEvals.urgent, urgent: true }
                    ]}
                    color="amber"
                    icon={BookOpen}
                />
                <MetricCard
                    title="Class Health Index"
                    value={metrics.classHealth.value}
                    trend={{ value: metrics.classHealth.trend, isPositive: true, label: "Stable" }}
                    type="radial"
                    color="emerald"
                    icon={BrainCircuit}
                />
            </motion.div>

            {/* Middle Row: Hero + Radar */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <motion.div variants={itemVariants} className="xl:col-span-2 space-y-8">
                    <LiveSessionHero session={activeSession} />
                    <GradingQueue items={gradingQueue} />
                </motion.div>

                <motion.div variants={itemVariants} className="h-full">
                    <AtRiskRadar students={atRiskStudents} />
                </motion.div>
            </div>
        </motion.div>
    );
}
