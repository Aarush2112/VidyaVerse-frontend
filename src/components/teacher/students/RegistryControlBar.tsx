"use client";

import { useRegistryStore } from "@/lib/store/useRegistryStore";
import { Search, Filter, Mail, Download, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const RegistryControlBar = () => {
    const { filters, setFilter, selectedIds } = useRegistryStore();
    const hasSelection = selectedIds.length > 0;

    return (
        <div className="sticky top-0 z-30 py-6 bg-[#F3F4F6]/80 backdrop-blur-xl border-b border-slate-200/50 -mx-6 px-6 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Left: Search & Filter */}
            <div className="flex-1 w-full md:w-auto flex flex-col md:flex-row gap-4 items-center">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold text-slate-900 whitespace-nowrap">Student Registry</h1>
                    <span className="px-2 py-0.5 bg-slate-200 rounded-full text-[10px] font-bold text-slate-600">Spring 2026</span>
                </div>

                <div className="h-8 w-[1px] bg-slate-200 hidden md:block" />

                <div className="relative w-full md:w-[320px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <Input
                        placeholder="Search by name, roll no..."
                        className="pl-9 h-10 rounded-full bg-white border-slate-200 focus:ring-violet-500"
                        value={filters.search}
                        onChange={(e) => setFilter('search', e.target.value)}
                    />
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto justify-end">
                {hasSelection ? (
                    <div className="flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                        <span className="text-xs font-bold text-slate-500 mr-2">{selectedIds.length} Selected</span>
                        <Button variant="secondary" size="sm" className="h-9 rounded-full bg-white text-slate-700 border border-slate-200 shadow-sm">
                            <Mail size={14} className="mr-2" /> Email
                        </Button>
                        <Button variant="destructive" size="sm" className="h-9 rounded-full shadow-sm">
                            <Trash2 size={14} className="mr-2" /> Drop
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <div className="flex bg-slate-200/50 p-1 rounded-full">
                            {['ALL', 'AT_RISK', 'TOP_PERFORMER'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setFilter('status', tab)}
                                    className={cn(
                                        "px-4 py-1.5 rounded-full text-[10px] font-bold transition-all whitespace-nowrap",
                                        filters.status === tab ? "bg-white text-violet-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                                    )}
                                >
                                    {tab.replace('_', ' ')}
                                </button>
                            ))}
                        </div>
                        <Button size="sm" className="h-9 rounded-full bg-violet-600 text-white shadow-lg shadow-violet-500/20 px-4">
                            <Plus size={16} className="mr-1" /> Enroll
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
