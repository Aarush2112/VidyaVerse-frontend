"use client";

import { AlertTriangle, TrendingDown, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AtRiskRadarProps {
    students: {
        id: string;
        name: string;
        reason: 'ATTENDANCE' | 'GRADES' | 'INACTIVITY';
        detail: string;
        trend: 'DOWN' | 'STABLE';
    }[];
}

export const AtRiskRadar = ({ students }: AtRiskRadarProps) => {
    return (
        <div className="bg-white rounded-[24px] p-6 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] border border-slate-100 h-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <AlertTriangle className="text-rose-500" size={20} />
                    <h3 className="text-slate-900 font-bold text-lg">Attention Needed</h3>
                </div>
            </div>

            <div className="space-y-4">
                {students.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-sm">No at-risk students</div>
                ) : students.map((student) => (
                    <div key={student.id} className="relative pl-4 py-3 pr-3 bg-slate-50 rounded-xl group hover:bg-white hover:shadow-md transition-all border border-slate-100">
                        {/* Color Strip */}
                        <div className={cn("absolute left-0 top-3 bottom-3 w-1 rounded-r-full",
                            student.reason === 'GRADES' ? "bg-rose-500" :
                                student.reason === 'ATTENDANCE' ? "bg-amber-500" : "bg-slate-400"
                        )} />

                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm">{student.name}</h4>
                                <p className="text-xs text-slate-500 mt-1">{student.detail}</p>
                            </div>
                            <button className="text-slate-300 hover:text-violet-600 transition-colors">
                                <MessageCircle size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-violet-600 transition-colors border-t border-slate-100">
                View All Insights
            </button>
        </div>
    );
}
