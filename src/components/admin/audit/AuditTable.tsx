"use client";

import React, { useState } from "react";
import { DiffViewer } from "./DiffViewer";
import { ChevronRight, ChevronDown, Monitor, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface AuditTableProps {
    data: any[];
    pagination: {
        total: number;
        totalPages: number;
        currentPage: number;
    }
}

export const AuditTable = ({ data, pagination }: AuditTableProps) => {
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    const toggleRow = (id: string) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const getSeverityStyles = (s: string) => {
        switch (s) {
            case 'CRITICAL': return "text-rose-600 bg-rose-50 border-rose-100";
            case 'WARNING': return "text-amber-600 bg-amber-50 border-amber-100";
            default: return "text-indigo-600 bg-indigo-50 border-indigo-100";
        }
    };

    return (
        <div className="rounded-[32px] border border-slate-200 bg-white overflow-hidden shadow-sm">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 bg-slate-50/80 border-b border-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <div className="col-span-1 text-center">S</div>
                <div className="col-span-2">Time</div>
                <div className="col-span-3">Actor</div>
                <div className="col-span-2">Action</div>
                <div className="col-span-3">Resource</div>
                <div className="col-span-1">IP</div>
            </div>

            {/* Table Body */}
            <div>
                {data.map((log) => (
                    <React.Fragment key={log.id}>
                        <motion.div
                            initial={{ backgroundColor: "#ffffff" }}
                            whileHover={{ backgroundColor: "#fafafa" }}
                            className={cn(
                                "grid grid-cols-12 gap-4 p-4 items-center border-b border-slate-50 cursor-pointer transition-colors text-xs font-medium text-slate-600",
                                expandedRow === log.id && "bg-slate-50/50"
                            )}
                            onClick={() => toggleRow(log.id)}
                        >
                            {/* Severity Dot */}
                            <div className="col-span-1 flex justify-center">
                                <div className={cn("w-2 h-2 rounded-full ring-4 ring-white shadow-sm",
                                    log.severity === 'CRITICAL' ? "bg-rose-500" :
                                        log.severity === 'WARNING' ? "bg-amber-500" : "bg-indigo-500"
                                )} />
                            </div>

                            {/* Time */}
                            <div className="col-span-2 font-mono text-[11px] text-slate-500">
                                {new Date(log.timestamp).toLocaleTimeString([], { hour12: false })}
                            </div>

                            {/* Actor */}
                            <div className="col-span-3 flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-bold text-slate-500">
                                    {(log.actorEmail?.[0] || "S").toUpperCase()}
                                </div>
                                <div className="truncate max-w-[120px]" title={log.actorEmail}>
                                    {log.actorEmail}
                                </div>
                            </div>

                            {/* Action */}
                            <div className="col-span-2">
                                <span className={cn("px-2 py-0.5 rounded-[6px] text-[9px] font-black uppercase tracking-wider border", getSeverityStyles(log.severity))}>
                                    {log.action}
                                </span>
                            </div>

                            {/* Resource */}
                            <div className="col-span-3 font-mono text-[11px] text-slate-500 flex items-center gap-1.5 truncate">
                                <span className="text-slate-300 select-none">ID:</span>
                                {log.resourceId}
                            </div>

                            {/* IP / Expand */}
                            <div className="col-span-1 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                                <span>{log.ipAddress?.split('.')?.[3] ? `*.*.*.${log.ipAddress.split('.')[3]}` : 'local'}</span>
                                {expandedRow === log.id ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                            </div>
                        </motion.div>

                        {/* Expanded Details */}
                        <AnimatePresence>
                            {expandedRow === log.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="col-span-12 bg-slate-50/50 overflow-hidden border-b border-slate-100"
                                >
                                    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        {/* Metadata Column */}
                                        <div className="space-y-4">
                                            <div className="space-y-1">
                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Session Info</div>
                                                <div className="flex items-center gap-2 text-xs text-slate-600 bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                                                    <Monitor className="w-3 h-3 text-slate-400" />
                                                    <span className="truncate max-w-[200px]" title={log.userAgent}>{log.userAgent}</span>
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full IP Address</div>
                                                <div className="flex items-center justify-between text-xs text-slate-600 bg-white p-2 rounded-lg border border-slate-100 shadow-sm font-mono">
                                                    {log.ipAddress}
                                                    <Button variant="ghost" size="icon" className="h-4 w-4 text-slate-300 hover:text-indigo-500">
                                                        <Copy className="w-2.5 h-2.5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Diff Viewer (2 cols) */}
                                        <div className="lg:col-span-2">
                                            {log.action === 'UPDATE' && log.changes ? (
                                                <DiffViewer
                                                    oldValue={(log.changes as any).old || {}}
                                                    newValue={(log.changes as any).new || {}}
                                                />
                                            ) : (
                                                <div className="h-full flex items-center justify-center text-slate-400 text-xs italic bg-white rounded-xl border border-slate-100 border-dashed">
                                                    No changes recorded or flat event
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </React.Fragment>
                ))}
            </div>

            {/* Pagination / Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Showing {data.length} of {pagination.total} events</span>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                        disabled={pagination.currentPage <= 1}
                        onClick={() => {
                            const params = new URLSearchParams(window.location.search);
                            params.set("page", (pagination.currentPage - 1).toString());
                            window.location.search = params.toString();
                        }}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                        disabled={pagination.currentPage >= pagination.totalPages}
                        onClick={() => {
                            const params = new URLSearchParams(window.location.search);
                            params.set("page", (pagination.currentPage + 1).toString());
                            window.location.search = params.toString();
                        }}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};
