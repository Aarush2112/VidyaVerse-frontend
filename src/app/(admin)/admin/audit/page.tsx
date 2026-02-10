import React from "react";
import { fetchAuditLogs, seedAuditLogs } from "@/app/actions/audit";
import { AuditStats } from "@/components/admin/audit/AuditStats";
import { AuditFilters } from "@/components/admin/audit/AuditFilters";
import { AuditTable } from "@/components/admin/audit/AuditTable";
import { ShieldCheck, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminAuditPage(props: { searchParams: Promise<any> }) {
    const searchParams = await props.searchParams;

    // Auto-seed for demo purposes if needed
    // In production, you'd likely remove this or put it behind a flag
    await seedAuditLogs();

    const page = Number(searchParams?.page) || 1;
    const filters = {
        severity: searchParams?.severity,
        action: searchParams?.action,
        search: searchParams?.search,
    };

    const { data, total, totalPages } = await fetchAuditLogs(page, 50, filters);

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-slate-900 pb-20 font-sans">
            {/* Header */}
            <div className="bg-white border-b border-slate-100 px-8 py-8 mb-8">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 shadow-sm">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Audit & Compliance</h1>
                            <p className="text-slate-500 font-medium text-sm mt-0.5">
                                Forensic trail and immutable event logging
                            </p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 h-10 px-4 font-bold text-xs uppercase tracking-wider">
                        <Download className="w-3.5 h-3.5 mr-2" />
                        Export CSV
                    </Button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 space-y-8">
                {/* 1. High-level Stats */}
                <AuditStats />

                {/* 2. Filters & Actions */}
                <AuditFilters />

                {/* 3. The Black Box Table */}
                <div className="space-y-4">
                    <AuditTable
                        data={data}
                        pagination={{
                            total,
                            totalPages,
                            currentPage: page
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
