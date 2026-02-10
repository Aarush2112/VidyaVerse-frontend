"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GradingQueueProps {
    items: {
        id: string;
        studentName: string;
        studentAvatar: string;
        assignment: string;
        submittedAt: string;
        plagiarismScore: number;
        autoGradeScore: number;
        status: 'PENDING' | 'GRADED';
    }[];
}

export const GradingQueue = ({ items }: GradingQueueProps) => {
    return (
        <div className="bg-white rounded-[24px] p-6 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] border border-slate-100 flex-1">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-slate-900 font-bold text-lg">Grading Queue</h3>
                <span className="text-xs font-bold bg-amber-50 text-amber-600 px-3 py-1 rounded-full border border-amber-100">
                    {items.length} Pending
                </span>
            </div>

            <div className="space-y-4">
                {items.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-sm">No pending submissions</div>
                ) : items.map((item) => {
                    const isRisky = item.plagiarismScore > 30;

                    return (
                        <div key={item.id} className={cn(
                            "flex items-center justify-between p-4 rounded-2xl transition-all border",
                            isRisky ? "bg-rose-50/50 border-rose-100" : "bg-white border-slate-100 hover:border-violet-100 hover:shadow-sm"
                        )}>
                            {/* Student Info */}
                            <div className="flex items-center gap-4">
                                <Avatar className="h-10 w-10 border border-slate-200">
                                    <AvatarImage src={item.studentAvatar} />
                                    <AvatarFallback>S</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-bold text-slate-800 text-sm">{item.studentName}</p>
                                    <p className="text-xs text-slate-500">{item.assignment}</p>
                                </div>
                            </div>

                            {/* Indicators */}
                            <div className="flex items-center gap-3">
                                <div className="hidden sm:flex flex-col items-end">
                                    <div className="flex items-center gap-1 text-xs font-semibold text-slate-600">
                                        <Zap size={12} className="text-amber-500 fill-amber-500" />
                                        Auto: {item.autoGradeScore}/10
                                    </div>
                                    <div className={cn("text-[10px] font-bold mt-1 px-2 py-0.5 rounded-full flex items-center gap-1",
                                        isRisky ? "bg-rose-100 text-rose-600" : "bg-emerald-50 text-emerald-600"
                                    )}>
                                        {isRisky && <ShieldAlert size={10} />}
                                        {isRisky ? `${item.plagiarismScore}% Match` : "Safe"}
                                    </div>
                                </div>

                                <Button size="sm" variant="ghost" className="h-8 w-8 rounded-full p-0 text-slate-400 hover:text-violet-600 hover:bg-violet-50">
                                    <ArrowRight size={16} />
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
