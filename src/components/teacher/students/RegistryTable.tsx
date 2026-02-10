"use client";

import React, { useState } from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    getFilteredRowModel,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, Search, Filter, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { RiskBadge } from "./RiskBadge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// Simplified Sparkline Component for performance
const ActivityVector = ({ data = [20, 40, 30, 70, 50, 90, 80] }) => {
    const points = data.map((d, i) => `${i * 15},${100 - d}`).join(" ");
    return (
        <svg className="w-24 h-8 text-indigo-500 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
                className="opacity-40"
            />
            <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
            />
        </svg>
    );
};

// Health Bar Component
const HealthPulse = ({ grade, attendance }: { grade: number; attendance: number }) => {
    return (
        <div className="flex flex-col gap-1.5 w-32">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                <span className="text-zinc-500">Pulse</span>
                <span className="text-emerald-500 italic">{grade}%</span>
            </div>
            <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden flex">
                <div style={{ width: `${attendance}%` }} className="h-full bg-emerald-500" />
                <div style={{ width: `${100 - attendance}%` }} className="h-full bg-rose-500/20" />
            </div>
        </div>
    );
};

export type Student = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    rollId: string;
    grade: number;
    attendance: number;
    risk: "Low" | "Medium" | "High";
    lastActive: string;
    status: "online" | "offline";
    activityData: number[];
};

interface RegistryTableProps {
    data: Student[];
    onRowClick: (student: Student) => void;
}

export function RegistryTable({ data, onRowClick }: RegistryTableProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState({});

    const columns: ColumnDef<Student>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className="border-zinc-800 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="border-zinc-800 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                    onClick={(e) => e.stopPropagation()}
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "identity",
            header: "Identity",
            cell: ({ row }) => (
                <div className="flex items-center gap-4 py-2">
                    <div className="relative">
                        <div className="h-10 w-10 rounded-xl overflow-hidden border border-white/10">
                            <img src={row.original.avatar} alt="" className="w-full h-full object-cover" />
                        </div>
                        {row.original.status === "online" && (
                            <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 bg-[#09090b] rounded-full flex items-center justify-center">
                                <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-black italic text-zinc-100 tracking-tight">{row.original.name}</span>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{row.original.rollId}</span>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "health",
            header: "Biometric Pulse",
            cell: ({ row }) => (
                <HealthPulse grade={row.original.grade} attendance={row.original.attendance} />
            ),
        },
        {
            accessorKey: "activity",
            header: "Activity Vector",
            cell: ({ row }) => (
                <div className="flex flex-col gap-1">
                    <ActivityVector data={row.original.activityData} />
                    <span className="text-[9px] font-mono text-zinc-600 tracking-tighter">
                        SIGNAL: {row.original.lastActive}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "risk",
            header: "Threat Level",
            cell: ({ row }) => (
                <RiskBadge grade={row.original.grade} attendance={row.original.attendance} />
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <button className="h-8 w-8 rounded-lg hover:bg-white/5 flex items-center justify-center transition-colors">
                            <MoreHorizontal className="h-4 w-4 text-zinc-500" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-zinc-950 border-white/5 text-zinc-300">
                        <DropdownMenuItem onClick={() => onRowClick(row.original)}>View Dossier</DropdownMenuItem>
                        <DropdownMenuItem>Flag Student</DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-500 uppercase font-black text-[10px] tracking-widest">Terminate Access</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            rowSelection,
        },
    });

    return (
        <div className="w-full">
            <div className="rounded-2xl border border-white/5 bg-zinc-950/50 backdrop-blur-xl overflow-hidden">
                <Table>
                    <TableHeader className="bg-zinc-900/50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="hover:bg-transparent border-white/5">
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="h-14 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    onClick={() => onRowClick(row.original)}
                                    className="h-20 group cursor-pointer border-white/5 transition-all hover:bg-indigo-500/[0.03] data-[state=selected]:bg-indigo-500/5"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-zinc-500 font-mono text-xs italic">
                                    NO BIOMETRIC DATA FOUND IN CURRENT COHORT.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Selection HUD: Floating Action Island */}
            {Object.keys(rowSelection).length > 0 && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                    <div className="flex items-center gap-6 px-6 py-4 rounded-2xl bg-zinc-900/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">
                                {Object.keys(rowSelection).length} PERSONNEL SELECTED
                            </span>
                        </div>
                        <div className="h-4 w-px bg-white/10" />
                        <div className="flex items-center gap-2">
                            <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest transition-all">
                                Broadcast Intel
                            </button>
                            <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 text-[10px] font-black uppercase tracking-widest transition-all">
                                Terminate Session
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
