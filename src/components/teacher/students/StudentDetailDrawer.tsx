"use client";

import { useRegistryStore } from "@/lib/store/useRegistryStore";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Calendar, AlertTriangle, X } from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

const performanceData = [
    { subject: 'Coding', A: 120, fullMark: 150 },
    { subject: 'Theory', A: 98, fullMark: 150 },
    { subject: 'Participation', A: 86, fullMark: 150 },
    { subject: 'Punctuality', A: 99, fullMark: 150 },
    { subject: 'Projects', A: 85, fullMark: 150 },
    { subject: 'Quizzes', A: 65, fullMark: 150 },
];

export const StudentDetailDrawer = () => {
    const { activeStudentId, setActiveStudent, students } = useRegistryStore();
    const student = students.find(s => s.id === activeStudentId);

    if (!student) return null;

    return (
        <Sheet open={!!activeStudentId} onOpenChange={(open) => !open && setActiveStudent(null)}>
            <SheetContent side="right" className="w-[400px] sm:w-[540px] p-0 border-l border-slate-200 bg-white">
                {/* Header */}
                <div className="h-48 bg-gradient-to-br from-violet-600 to-indigo-700 relative p-6 flex flex-col justify-end text-white">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/10"
                        onClick={() => setActiveStudent(null)}
                    >
                        <X size={20} />
                    </Button>

                    <div className="flex items-end gap-4">
                        <Avatar className="h-20 w-20 border-4 border-white/20 shadow-xl">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} />
                            <AvatarFallback>{student.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="mb-2">
                            <h2 className="text-2xl font-bold">{student.name}</h2>
                            <p className="text-violet-200 font-medium text-sm">{student.rollNumber} • {student.cohort}</p>
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="flex divide-x divide-slate-100 border-b border-slate-100">
                    <div className="flex-1 p-4 text-center">
                        <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">GPA</p>
                        <p className="text-xl font-bold text-slate-900">{student.metrics.gpa}</p>
                    </div>
                    <div className="flex-1 p-4 text-center">
                        <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Attendance</p>
                        <p className="text-xl font-bold text-slate-900">{student.metrics.attendance}%</p>
                    </div>
                    <div className="flex-1 p-4 text-center">
                        <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Risk Score</p>
                        <p className={`text-xl font-bold ${student.risk.score > 50 ? 'text-rose-600' : 'text-emerald-600'}`}>
                            {student.risk.score}
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-6">
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="w-full grid grid-cols-2 mb-6">
                            <TabsTrigger value="overview">Performance Matrix</TabsTrigger>
                            <TabsTrigger value="timeline">Activity Timeline</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
                                    <PolarGrid stroke="#e2e8f0" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                    <Radar name={student.name} dataKey="A" stroke="#8b5cf6" strokeWidth={2} fill="#8b5cf6" fillOpacity={0.2} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </TabsContent>

                        <TabsContent value="timeline">
                            <div className="space-y-6 pl-2 border-l-2 border-slate-100 ml-2">
                                {[
                                    { title: "Submitted 'Data Structures' Assignment", time: "2 hours ago", type: "submission" },
                                    { title: "Missed 'Operating Systems' Lecture", time: "Yesterday", type: "absence" },
                                    { title: "Viewed 'Graph Theory' Module", time: "2 days ago", type: "view" },
                                ].map((item, i) => (
                                    <div key={i} className="relative pl-6">
                                        <div className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white ${item.type === 'absence' ? 'bg-rose-400' : 'bg-slate-300'
                                            }`} />
                                        <p className="text-sm font-medium text-slate-800">{item.title}</p>
                                        <p className="text-xs text-slate-400">{item.time}</p>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Footer Actions */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 flex gap-3">
                    <Button className="flex-1 bg-violet-600 hover:bg-violet-700 text-white gap-2">
                        <Calendar size={16} /> Schedule Meeting
                    </Button>
                    <Button variant="outline" className="flex-1 border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 gap-2">
                        <AlertTriangle size={16} /> Send Warning
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
