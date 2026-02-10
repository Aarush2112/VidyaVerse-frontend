"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const AuditFilters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (term) {
            params.set("search", term);
        } else {
            params.delete("search");
        }
        params.set("page", "1"); // Reset pagination
        router.replace(`?${params.toString()}`);
    };

    const handleFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value && value !== "ALL") {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.set("page", "1");
        router.replace(`?${params.toString()}`);
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 p-6 bg-white rounded-[32px] border border-slate-100 shadow-sm items-center">
            {/* Search */}
            <div className="relative flex-1 w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                    placeholder="Search by Email, IP, or Resource ID..."
                    className="pl-10 h-10 rounded-xl bg-slate-50 border-slate-100 font-mono text-xs focus-visible:ring-indigo-500"
                    onChange={(e) => handleSearch(e.target.value)}
                    defaultValue={searchParams.get("search")?.toString()}
                />
            </div>

            {/* Severity Filter */}
            <Select
                onValueChange={(v) => handleFilter("severity", v)}
                defaultValue={searchParams.get("severity") || "ALL"}
            >
                <SelectTrigger className="w-full md:w-[150px] h-10 rounded-xl bg-slate-50 border-slate-100 text-xs font-bold text-slate-600">
                    <div className="flex items-center gap-2">
                        <Filter className="h-3.5 w-3.5" />
                        <SelectValue placeholder="Severity" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ALL">All Severities</SelectItem>
                    <SelectItem value="INFO">Info</SelectItem>
                    <SelectItem value="WARNING">Warning</SelectItem>
                    <SelectItem value="CRITICAL">Critical</SelectItem>
                </SelectContent>
            </Select>

            {/* Action Filter */}
            <Select
                onValueChange={(v) => handleFilter("action", v)}
                defaultValue={searchParams.get("action") || "ALL"}
            >
                <SelectTrigger className="w-full md:w-[150px] h-10 rounded-xl bg-slate-50 border-slate-100 text-xs font-bold text-slate-600">
                    <SelectValue placeholder="Action Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ALL">All Actions</SelectItem>
                    <SelectItem value="CREATE">Create</SelectItem>
                    <SelectItem value="UPDATE">Update</SelectItem>
                    <SelectItem value="DELETE">Delete</SelectItem>
                    <SelectItem value="LOGIN">Login</SelectItem>
                    <SelectItem value="SENSITIVE_VIEW">Sensitive View</SelectItem>
                </SelectContent>
            </Select>

            {/* Date Range (Mock for now) */}
            <Button variant="outline" className="h-10 rounded-xl border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50 text-xs font-bold">
                <Calendar className="mr-2 h-3.5 w-3.5" />
                Last 24 Hours
            </Button>
        </div>
    );
};
