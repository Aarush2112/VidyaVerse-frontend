"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SoftTableProps {
    headers: string[];
    children: React.ReactNode;
}

export function SoftTable({ headers, children }: SoftTableProps) {
    return (
        <div className="w-full space-y-4">
            {/* Editorial Table Header */}
            <div className="flex px-8 py-4 bg-white/[0.02] rounded-full border border-white/5">
                {headers.map((header, i) => (
                    <div
                        key={i}
                        className={cn(
                            "text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500",
                            i === 0 ? "flex-1" : "w-40 text-center"
                        )}
                    >
                        {header}
                    </div>
                ))}
            </div>

            {/* Table Body (Gap-separated Rows) */}
            <div className="space-y-3">
                {children}
            </div>
        </div>
    );
}

interface SoftTableRowProps {
    children: React.ReactNode;
    onClick?: () => void;
}

export function SoftTableRow({ children, onClick }: SoftTableRowProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
            onClick={onClick}
            className="flex items-center px-8 py-6 bg-white/[0.04] backdrop-blur-md rounded-[24px] border border-white/5 cursor-pointer transition-all duration-300 group"
        >
            {children}
        </motion.div>
    );
}
