"use client";

import React, { useState, useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
    getSortedRowModel,
    SortingState,
} from "@tanstack/react-table";
import {
    ArrowUpDown,
    LineChart as LineChartIcon,
    BarChart2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { TrendSparkline } from "./TrendSparkline";
import { GradebookRow } from "@/app/actions/grading";

// Use GradebookRow directly
const columnHelper = createColumnHelper<GradebookRow>();

interface SmartGradeTableProps {
    searchQuery?: string;
    data: GradebookRow[]; // Controlled data
    onUpdateGrade: (args: { id: string; columnId: string; value: number }) => void;
}

export function SmartGradeTable({ searchQuery = "", data, onUpdateGrade }: SmartGradeTableProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [selectedStudent, setSelectedStudent] = useState<GradebookRow | null>(null);

    const filteredData = useMemo(() => {
        return data.filter(s =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [data, searchQuery]);

    const updateCell = (id: string, columnId: string, value: any) => {
        // Call parent handler for optimistic update
        onUpdateGrade({ id, columnId, value });
    };

    // Liquid Grading: Focus Management
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, rowIndex: number, columnId: string) => {
        if (e.key === "Enter") {
            e.preventDefault();
            // Find the next input in the same column
            const nextRowInput = document.getElementById(`cell-${rowIndex + 1}-${columnId}`);
            if (nextRowInput) {
                (nextRowInput as HTMLInputElement).focus();
            }

            // Visual feedback: briefly flash green
            const target = e.currentTarget;
            target.classList.add("bg-green-50", "border-green-200");
            setTimeout(() => {
                target.classList.remove("bg-green-50", "border-green-200");
            }, 500);
        }
    };

    const columns = useMemo(
        () => [
            columnHelper.accessor("name", {
                header: ({ column }) => (
                    <button
                        className="flex items-center gap-2 hover:text-slate-900 transition-colors uppercase tracking-widest text-[10px] font-bold"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Student
                        <ArrowUpDown className="h-3 w-3" />
                    </button>
                ),
                cell: (info) => {
                    const student = info.row.original;
                    return (
                        <div
                            className="flex items-center gap-4 cursor-pointer group/name"
                            onClick={() => setSelectedStudent(student)}
                        >
                            <Avatar className="h-10 w-10 rounded-xl border border-slate-100 soft-shadow-sm group-hover/name:scale-110 transition-all duration-500">
                                <AvatarImage src={student.avatar} />
                                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-900 group-hover/name:text-[#5B86E5] transition-colors whitespace-nowrap">
                                    {info.getValue()}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{student.rollNo}</span>
                            </div>
                        </div>
                    )
                },
            }),
            columnHelper.accessor("totalScore", {
                header: "Score %",
                cell: (info) => {
                    const value = info.getValue() as number;
                    let colorClass = "bg-[#F3E8FF] text-[#7E22CE]"; // B/C
                    if (value >= 90) colorClass = "bg-[#F0FDF4] text-[#15803D]"; // A
                    if (value < 40) colorClass = "bg-[#FFF1F2] text-[#BE123C]"; // F

                    return (
                        <div className={cn("font-bold text-xs py-1.5 px-3 rounded-full inline-block min-w-16 text-center", colorClass)}>
                            {value}%
                        </div>
                    );
                },
            }),
            columnHelper.accessor("attendance", {
                header: "Attendance",
                cell: (info) => {
                    const value = info.getValue() as number;
                    return (
                        <div className="w-24 space-y-1">
                            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                                <span>{value}%</span>
                            </div>
                            <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className={cn("h-full", value > 75 ? "bg-emerald-500" : value > 50 ? "bg-amber-500" : "bg-rose-500")}
                                    style={{ width: `${value}%` }}
                                />
                            </div>
                        </div>
                    );
                },
            }),
            columnHelper.accessor("assignment1", {
                header: "A1 (50)",
                cell: (info) => (
                    <div className="group/pill relative">
                        <Input
                            id={`cell-${info.row.index}-assignment1`}
                            type="number"
                            value={info.getValue() as number}
                            onChange={(e) => updateCell(info.row.original.id, "assignment1", Number(e.target.value))}
                            onKeyDown={(e) => handleKeyDown(e, info.row.index, "assignment1")}
                            className={cn(
                                "h-10 w-20 bg-slate-100/50 border-transparent text-center font-bold text-slate-700 rounded-xl focus:bg-white focus:border-[#5B86E5] focus:ring-0 transition-all soft-shadow-sm focus:soft-shadow-md",
                                Number(info.getValue()) > 50 && "text-red-500"
                            )}
                        />
                    </div>
                ),
            }),
            columnHelper.accessor("midSem", {
                header: "Mid (100)",
                cell: (info) => (
                    <div className="group/pill relative">
                        <Input
                            id={`cell-${info.row.index}-midSem`}
                            type="number"
                            value={info.getValue() as number}
                            onChange={(e) => updateCell(info.row.original.id, "midSem", Number(e.target.value))}
                            onKeyDown={(e) => handleKeyDown(e, info.row.index, "midSem")}
                            className={cn(
                                "h-10 w-20 bg-slate-100/50 border-transparent text-center font-bold text-slate-700 rounded-xl focus:bg-white focus:border-[#5B86E5] focus:ring-0 transition-all soft-shadow-sm focus:soft-shadow-md",
                                Number(info.getValue()) > 100 && "text-red-500"
                            )}
                        />
                    </div>
                ),
            }),
            columnHelper.accessor("id", {
                id: "trend",
                header: "Performance",
                cell: (info) => (
                    <div className="flex items-center gap-4">
                        <TrendSparkline
                            data={info.row.original.history.length > 0 ? info.row.original.history.map(h => ({ value: h.score })) : [{ value: 0 }, { value: 0 }]}
                            color={Number(info.row.original.totalScore) > 50 ? "#5B86E5" : "#FF4D4D"}
                        />
                    </div>
                ),
            }),
            columnHelper.accessor("status", {
                header: "Status",
                cell: (info) => {
                    const status = info.getValue() as string;
                    return (
                        <Badge
                            variant="outline"
                            className={cn(
                                "text-[10px] font-bold uppercase tracking-wider rounded-lg px-2 py-1",
                                status === "Pass" && "text-[#15803D] border-[#15803D]/20 bg-[#F0FDF4]",
                                status === "Fail" && "text-[#BE123C] border-[#BE123C]/20 bg-[#FFF1F2]",
                                status === "Withheld" && "text-[#7E22CE] border-[#7E22CE]/20 bg-[#F3E8FF]"
                            )}
                        >
                            {status}
                        </Badge>
                    );
                },
            }),
        ],
        []
    );

    const table = useReactTable({
        data: filteredData,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="w-full h-full flex flex-col pt-6">
            <div className="bg-white rounded-[24px] border border-slate-200 flex-1 flex flex-col shadow-sm overflow-hidden relative">
                <div className="overflow-x-auto h-full scrollbar-thin scrollbar-thumb-slate-100 scrollbar-track-transparent">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id} className="border-b border-slate-50">
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className="px-10 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest sticky top-0 bg-white z-10"
                                        >
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
                        <tbody className="divide-y divide-slate-50">
                            {table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="hover:bg-slate-50/50 transition-all duration-300 group"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-10 py-6">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Student Drill-down Drawer */}
            <Sheet open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
                <SheetContent className="w-[500px] sm:w-[600px] bg-white border-l border-slate-100 text-slate-900 p-10 overflow-y-auto soft-shadow-lg">
                    {selectedStudent && (
                        <div className="space-y-10 animate-in slide-in-from-right duration-700">
                            <SheetHeader className="text-left space-y-6">
                                <div className="flex items-center gap-6">
                                    <Avatar className="h-24 w-24 rounded-[32px] border-4 border-slate-50 soft-shadow-md">
                                        <AvatarImage src={selectedStudent.avatar} />
                                        <AvatarFallback>{selectedStudent.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1">
                                        <SheetTitle className="text-3xl font-bold tracking-tight text-slate-900">
                                            {selectedStudent.name}
                                        </SheetTitle>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-100 rounded-md px-2 py-0.5">
                                                {selectedStudent.rollNo}
                                            </span>
                                            <Badge
                                                variant="outline"
                                                className={cn(
                                                    "text-[10px] font-bold uppercase tracking-widest border-none px-0",
                                                    selectedStudent.status === "Pass" ? "text-emerald-500" : "text-rose-500"
                                                )}
                                            >
                                                <span className="h-1.5 w-1.5 rounded-full bg-current mr-2 animate-pulse" />
                                                {selectedStudent.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </SheetHeader>

                            {/* Performance Stats Cards */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 bg-slate-50/50 border border-slate-100 rounded-[32px] space-y-1 soft-shadow-sm">
                                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Global Index</p>
                                    <p className="text-3xl font-bold text-[#5B86E5] tracking-tight">{selectedStudent.totalScore}%</p>
                                </div>
                                <div className="p-6 bg-slate-50/50 border border-slate-100 rounded-[32px] space-y-1 soft-shadow-sm">
                                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Class Position</p>
                                    <div className="flex items-end gap-1">
                                        <p className="text-3xl font-bold text-[#E67E22] tracking-tight">#2</p>
                                        <span className="text-xs font-bold text-emerald-500 mb-1">↑1</span>
                                    </div>
                                </div>
                            </div>

                            {/* Performance Chart - Soft UI Style */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                        <LineChartIcon className="h-4 w-4" /> Academic Trajectory
                                    </h4>
                                </div>
                                <div className="h-72 w-full bg-white border border-slate-100 rounded-[32px] p-8 soft-shadow-md overflow-hidden relative">
                                    <div className="absolute top-0 right-0 p-8 opacity-5">
                                        <BarChart2 className="h-32 w-32" />
                                    </div>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={selectedStudent.history}>
                                            <defs>
                                                <linearGradient id="colorScoreDrill" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#5B86E5" stopOpacity={0.15} />
                                                    <stop offset="95%" stopColor="#5B86E5" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis
                                                dataKey="date"
                                                stroke="#CBD5E1"
                                                fontSize={10}
                                                tickLine={false}
                                                axisLine={false}
                                                dy={10}
                                            />
                                            <YAxis
                                                stroke="#CBD5E1"
                                                fontSize={10}
                                                tickLine={false}
                                                axisLine={false}
                                                dx={-10}
                                                domain={[0, 100]}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'white',
                                                    border: '1px solid #F1F5F9',
                                                    borderRadius: '16px',
                                                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)',
                                                    padding: '12px'
                                                }}
                                                itemStyle={{ color: '#5B86E5', fontWeight: 'bold' }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="score"
                                                stroke="#5B86E5"
                                                strokeWidth={4}
                                                fillOpacity={1}
                                                fill="url(#colorScoreDrill)"
                                                animationDuration={1500}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Action Points */}
                            <div className="space-y-6">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Insight Snapshot</h4>
                                <div className="space-y-3">
                                    {[
                                        { label: "Engagement Streak", value: "High", color: "text-emerald-600", bg: "bg-emerald-50" },
                                        { label: "Critical Thinking", value: "Excellent", color: "text-[#5B86E5]", bg: "bg-blue-50" },
                                        { label: "Prerequisite Debt", value: "None", color: "text-slate-400", bg: "bg-slate-50" }
                                    ].map((item, idx) => (
                                        <div key={idx} className={cn("flex justify-between items-center p-4 rounded-2xl border border-slate-50 text-xs font-bold", item.bg)}>
                                            <span className="text-slate-400">{item.label}</span>
                                            <span className={cn("uppercase tracking-widest", item.color)}>{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
}
