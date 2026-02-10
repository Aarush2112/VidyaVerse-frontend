"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HoloCardProps {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
}

export function HoloCard({ children, className, containerClassName }: HoloCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.08)" }}
            className={cn(
                "group relative bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] transition-all duration-500",
                containerClassName
            )}
        >
            {/* Subtle Gradient Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#5B86E5]/5 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />

            {/* Content Wrapper */}
            <div className={cn("relative p-8 z-10", className)}>
                {children}
            </div>
        </motion.div>
    );
}
