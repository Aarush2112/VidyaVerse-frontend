"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskBadgeProps {
    grade: number;
    attendance: number;
}

export function RiskBadge({ grade, attendance }: RiskBadgeProps) {
    const isAtRisk = grade < 50 || attendance < 75;

    if (!isAtRisk) {
        return (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest text-emerald-500/70">
                <ShieldCheck className="h-3 w-3" />
                Optimal
            </div>
        );
    }

    return (
        <motion.div
            animate={{
                backgroundColor: ["rgba(239, 68, 68, 0.05)", "rgba(239, 68, 68, 0.2)", "rgba(239, 68, 68, 0.05)"],
                borderColor: ["rgba(239, 68, 68, 0.2)", "rgba(239, 68, 68, 0.6)", "rgba(239, 68, 68, 0.2)"]
            }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-black uppercase tracking-widest text-rose-500"
        >
            <AlertTriangle className="h-3 w-3" />
            At Risk
        </motion.div>
    );
}
