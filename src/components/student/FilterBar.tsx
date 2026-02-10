"use client";

import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const tags = [
    "All",
    "Web Development",
    "Data Science",
    "Machine Learning",
    "Cybersecurity",
    "Mobile Dev",
    "DevOps",
    "Cloud Computing",
    "Game Dev",
    "Blockchain",
    "UI/UX Design"
];

export const FilterBar = () => {
    return (
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-4 rounded-xl sticky top-4 z-40 shadow-xl">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

                {/* 1. Left: Search Input */}
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                    <Input
                        placeholder="Search for courses..."
                        className="pl-10 bg-black/50 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500/50 focus-visible:border-cyan-500 h-10 rounded-lg"
                    />
                </div>

                {/* 2. Middle: Scrollable Pill Tags */}
                <ScrollArea className="w-full md:w-auto max-w-[600px] whitespace-nowrap">
                    <div className="flex w-max space-x-2 p-1">
                        {tags.map((tag, i) => (
                            <button
                                key={tag}
                                className={`
                                    px-4 py-1.5 rounded-full text-xs font-medium transition-all border
                                    ${i === 0
                                        ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.2)]"
                                        : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-600"}
                                `}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="hidden" />
                </ScrollArea>

                {/* 3. Right: Sort & Filter */}
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-10 bg-black/50 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-600 gap-2">
                                <ArrowUpDown className="h-4 w-4" />
                                <span className="hidden sm:inline">Sort By</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-950 border-slate-800 text-slate-200">
                            <DropdownMenuItem className="focus:bg-slate-900 focus:text-cyan-400 cursor-pointer">Relevance</DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-slate-900 focus:text-cyan-400 cursor-pointer">Newest Added</DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-slate-900 focus:text-cyan-400 cursor-pointer">Highest Rated</DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-slate-900 focus:text-cyan-400 cursor-pointer">Most Popular</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button size="sm" className="h-10 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700">
                        <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
