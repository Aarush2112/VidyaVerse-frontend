"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SoftRegistryTableProps {
    headers: string[];
    children: React.ReactNode;
}

export function SoftRegistryTable({ headers, children }: SoftRegistryTableProps) {
    return (
        <div className="w-full space-y-4">
            {/* Soft Header */}
            <div className="flex px-8 py-4 bg-white rounded-[24px] border border-slate-100 soft-shadow-sm">
                {headers.map((header, i) => (
                    <div
                        key={i}
                        className={cn(
                            "text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400",
                            i === 0 ? "flex-1" : "w-40 text-center"
                        )}
                    >
                        {header}
                    </div>
                ))}
            </div>

            {/* Table Body */}
            <div className="space-y-3">
                {children}
            </div>
        </div>
    );
}

interface SoftRegistryTableRowProps {
    children: React.ReactNode;
    onClick?: () => void;
}

export function SoftRegistryTableRow({ children, onClick }: SoftRegistryTableRowProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.005, y: -2 }}
            onClick={onClick}
            className="flex items-center px-8 py-6 bg-white rounded-[32px] border border-slate-50 soft-shadow-md hover:soft-shadow-lg cursor-pointer transition-all duration-300 group"
        >
            {children}
        </motion.div>
    );
}
