"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface DiffViewerProps {
    oldValue: any;
    newValue: any;
    className?: string;
}

/**
 * A lightweight JSON Diff Viewer.
 * Highlights deleted keys in red (left) and added/changed keys in green (right).
 */
export const DiffViewer = ({ oldValue, newValue, className }: DiffViewerProps) => {
    // If nulls, handle gracefully
    const oldObj = oldValue || {};
    const newObj = newValue || {};

    const allKeys = Array.from(new Set([...Object.keys(oldObj), ...Object.keys(newObj)]));

    return (
        <div className={cn("grid grid-cols-2 gap-4 font-mono text-xs", className)}>
            {/* OLD STATE */}
            <div className="bg-rose-50/30 border border-rose-100 rounded-xl p-3">
                <div className="text-[10px] font-bold text-rose-400 mb-2 uppercase tracking-wider">Before</div>
                <div className="space-y-1">
                    {allKeys.map(key => {
                        const val = oldObj[key];
                        const formatting = val !== newObj[key] ? "bg-rose-100/50 text-rose-700" : "text-slate-400";
                        if (val === undefined) return null; // Didn't exist before

                        return (
                            <div key={key} className={cn("px-1 rounded flex gap-2", formatting)}>
                                <span className="opacity-50 select-none">"{key}":</span>
                                <span>{JSON.stringify(val)}</span>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* NEW STATE */}
            <div className="bg-emerald-50/30 border border-emerald-100 rounded-xl p-3">
                <div className="text-[10px] font-bold text-emerald-500 mb-2 uppercase tracking-wider">After</div>
                <div className="space-y-1">
                    {allKeys.map(key => {
                        const val = newObj[key];
                        const formatting = val !== oldObj[key] ? "bg-emerald-100/50 text-emerald-700 font-medium" : "text-slate-400";
                        if (val === undefined) return null; // Deleted in new

                        return (
                            <div key={key} className={cn("px-1 rounded flex gap-2", formatting)}>
                                <span className="opacity-50 select-none">"{key}":</span>
                                <span>{JSON.stringify(val)}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};
