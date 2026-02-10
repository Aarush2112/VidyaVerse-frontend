import React from "react";
import { getFinancialOverview, getRevenueTrend, getTransactions, seedFinancialData } from "@/app/actions/finance";
import { FinanceHero } from "@/components/admin/finance/FinanceHero";
import { RevenueChart } from "@/components/admin/finance/RevenueChart";
import { TransactionTable } from "@/components/admin/finance/TransactionTable";
import { Button } from "@/components/ui/button";

export default async function AdminFinancePage() {
    // TEMPORARY: Seed data if empty (for demo)
    // In production, remove this
    // await seedFinancialData();

    const stats = await getFinancialOverview();
    const trend = await getRevenueTrend();
    const transactions = await getTransactions();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Financial Command</h1>
                    <p className="text-slate-500">Treasury overview, revenue tracking, and instructor payouts.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-slate-200">Date Range</Button>
                    <Button className="bg-slate-900 text-white">Download Report</Button>
                </div>
            </div>

            <FinanceHero stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-3">
                    <RevenueChart data={trend} />
                </div>
            </div>

            <TransactionTable data={transactions} />
        </div>
    );
}
