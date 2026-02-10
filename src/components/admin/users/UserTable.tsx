"use client";

import React, { useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    ColumnDef,
    flexRender,
    SortingState,
} from "@tanstack/react-table";
import {
    MoreHorizontal,
    ArrowUpDown,
    Shield,
    UserX,
    LogIn,
    Search,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { banUser, impersonateUser } from "@/app/actions/admin";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Define User Type based on our server action return
export type UserData = {
    id: string;
    name: string | null;
    email: string;
    role: string;
    createdAt: Date;
    xp: number;
};

interface UserTableProps {
    data: UserData[];
}

export function UserTable({ data }: UserTableProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState("");

    // --- ACTIONS ---
    const handleBan = async (userId: string) => {
        const confirm = window.confirm("Are you sure you want to ban this user? This action will likely be irreversible in standard view.");
        if (!confirm) return;

        try {
            const result = await banUser(userId, "Admin manual action");
            if (result.success) toast.success(result.message);
        } catch (error) {
            toast.error("Failed to ban user");
        }
    };

    const handleImpersonate = async (userId: string) => {
        try {
            const result = await impersonateUser(userId);
            if (result.success) {
                toast.success("Impersonation started (Mock)", {
                    description: "In a real app, you would be redirected now."
                });
            }
        } catch (error) {
            toast.error("Failed to impersonate");
        }
    };

    // --- COLUMNS ---
    const columns: ColumnDef<UserData>[] = [
        {
            accessorKey: "name",
            header: "Identity",
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 uppercase">
                        {row.original.name?.[0] || row.original.email[0]}
                    </div>
                    <div>
                        <div className="font-bold text-slate-800 text-sm">{row.original.name || "Unknown"}</div>
                        <div className="text-xs text-slate-400 font-mono">{row.original.email}</div>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "role",
            header: "Role",
            cell: ({ row }) => {
                const role = row.getValue("role") as string;
                const colors = {
                    SUPER_ADMIN: "bg-purple-100 text-purple-700 border-purple-200",
                    ADMIN: "bg-purple-50 text-purple-600 border-purple-100",
                    TEACHER: "bg-blue-50 text-blue-600 border-blue-100",
                    STUDENT: "bg-slate-50 text-slate-600 border-slate-100"
                };
                return (
                    <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border", colors[role as keyof typeof colors] || colors.STUDENT)}>
                        {role}
                    </span>
                );
            },
        },
        {
            accessorKey: "xp",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="text-xs font-bold"
                    >
                        XP
                        <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="text-xs font-mono font-medium text-slate-500 ml-4">{row.getValue("xp")}</div>,
        },
        {
            accessorKey: "createdAt",
            header: "Joined",
            cell: ({ row }) => <div className="text-xs text-slate-500">{format(new Date(row.getValue("createdAt")), "MMM d, yyyy")}</div>,
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
                                Copy ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleImpersonate(user.id)} className="text-blue-600 focus:text-blue-700 focus:bg-blue-50">
                                <LogIn className="mr-2 h-4 w-4" />
                                Impersonate
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleBan(user.id)} className="text-rose-600 focus:text-rose-700 focus:bg-rose-50">
                                <UserX className="mr-2 h-4 w-4" />
                                Ban User
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        state: {
            sorting,
            globalFilter,
        },
    });

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <Input
                        placeholder="Search users..."
                        value={globalFilter ?? ""}
                        onChange={(event) => setGlobalFilter(event.target.value)}
                        className="pl-9 w-[300px] h-10 bg-white border-slate-200"
                    />
                </div>
                <div className="flex gap-2">
                    {/* Add CSV Export or Filter buttons here */}
                </div>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th key={header.id} className="px-6 py-4 font-bold text-slate-600">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <tr
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className="hover:bg-slate-50/50 transition-colors"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="px-6 py-4">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="h-24 text-center text-slate-500"
                                    >
                                        No results.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-end gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
