"use client";

import React from "react";
import { SentinelMetricRow } from "./SentinelMetricCard";
import { LiveThreatMap } from "./LiveThreatMap";
import { AuditLogTable } from "./AuditLogTable";

export function SecurityDashboardLayout() {
    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-poppins">Sentinel Command</h1>
                <p className="text-slate-500 mt-2">Real-time threat monitoring and system integrity analysis.</p>
            </header>

            {/* A. Threat Landscape */}
            <SentinelMetricRow />

            {/* B. Live Traffic Map */}
            <LiveThreatMap />

            {/* C. Audit Log */}
            <AuditLogTable />
        </div>
    );
}
