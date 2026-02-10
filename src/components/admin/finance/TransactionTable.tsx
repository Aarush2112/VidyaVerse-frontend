"use client";

import React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Transaction {
    id: string;
    user: { name: string | null; email: string; avatar: string; };
    description: string;
    date: Date;
    amount: number;
    type: string;
    status: string;
}

export function TransactionTable({ data }: { data: Transaction[] }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Master Ledger</h3>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-xs">
                        <Download size={14} className="mr-2" /> Export CSV
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-bold text-slate-500 uppercase text-xs tracking-wider">ID</th>
                            <th className="px-6 py-4 font-bold text-slate-500 uppercase text-xs tracking-wider">User</th>
                            <th className="px-6 py-4 font-bold text-slate-500 uppercase text-xs tracking-wider">Context</th>
                            <th className="px-6 py-4 font-bold text-slate-500 uppercase text-xs tracking-wider">Date</th>
                            <th className="px-6 py-4 font-bold text-slate-500 uppercase text-xs tracking-wider">Amount</th>
                            <th className="px-6 py-4 font-bold text-slate-500 uppercase text-xs tracking-wider">Status</th>
                            <th className="px-6 py-4 font-bold text-slate-500 uppercase text-xs tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.map((trx) => (
                            <tr key={trx.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs text-slate-500">
                                    #{trx.id.split("-")[0].toUpperCase()}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={trx.user.avatar} alt="u" className="w-8 h-8 rounded-full bg-slate-100" />
                                        <div>
                                            <div className="font-bold text-slate-700 text-xs">{trx.user.name || "User"}</div>
                                            <div className="text-[10px] text-slate-400">{trx.user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-600 font-medium">
                                    {trx.description}
                                </td>
                                <td className="px-6 py-4 text-slate-500">
                                    {format(new Date(trx.date), "MMM d, yyyy")}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={cn(
                                        "font-mono font-bold",
                                        trx.amount > 0 ? "text-emerald-600" : "text-slate-900"
                                    )}>
                                        {trx.amount > 0 ? "+" : ""}${trx.amount.toFixed(2)}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <StatusPill status={trx.status} />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400">
                                        <ExternalLink size={14} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {data.length === 0 && (
                            <tr>
                                <td colSpan={7} className="p-12 text-center text-slate-400">
                                    No transactions recorded yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function StatusPill({ status }: { status: string }) {
    const styles = {
        SUCCESS: "bg-emerald-50 text-emerald-600 border-emerald-200",
        PENDING: "bg-amber-50 text-amber-600 border-amber-200",
        FAILED: "bg-rose-50 text-rose-600 border-rose-200",
        REFUNDED: "bg-slate-100 text-slate-500 border-slate-200",
    };
    const style = styles[status as keyof typeof styles] || styles.SUCCESS;

    return (
        <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border", style)}>
            {status}
        </span>
    );
}
