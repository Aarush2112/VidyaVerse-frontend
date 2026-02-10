"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DangerZoneCard() {
    return (
        <div className="rounded-[24px] border border-rose-100 bg-rose-50/30 p-8">
            <h3 className="text-rose-700 font-bold text-lg mb-6 flex items-center gap-2">
                <AlertTriangle size={20} />
                Critical Operations
            </h3>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 bg-white/50 border border-rose-100/50 rounded-2xl">
                <div>
                    <div className="font-bold text-rose-800">Reset Semester Database</div>
                    <div className="text-sm text-rose-600/80 mt-1">
                        This will archive all current student progress and reset course enrollments.
                        <br className="hidden md:block" /> This action cannot be undone.
                    </div>
                </div>
                <Button
                    variant="outline"
                    className="border-rose-200 bg-white text-rose-600 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all font-bold shadow-sm whitespace-nowrap"
                >
                    Reset System
                </Button>
            </div>
        </div>
    );
}
