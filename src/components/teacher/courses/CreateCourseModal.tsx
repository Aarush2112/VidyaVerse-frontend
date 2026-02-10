"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useTeacherCourseStore } from "@/lib/store/useTeacherCourseStore";
import { BookOpen, Monitor, Briefcase, GraduationCap, ChevronRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export const CreateCourseModal = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        code: '',
        stream: 'CSE',
        type: 'THEORY'
    });
    const createCourse = useTeacherCourseStore(state => state.createCourse);

    const handleSubmit = () => {
        // @ts-ignore
        createCourse(formData);
        onOpenChange(false);
        setStep(1); // Reset
        setFormData({ title: '', code: '', stream: 'CSE', type: 'THEORY' });
    };

    const templates = [
        { id: 'THEORY', label: 'Theory Heavy', icon: BookOpen, desc: 'Lecture notes & video archive' },
        { id: 'LAB', label: 'Engineering Lab', icon: Monitor, desc: 'Manuals & submission portal' },
        { id: 'PROJECT', label: 'Project Work', icon: Briefcase, desc: 'Milestones & team management' },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white rounded-[32px] border-none shadow-2xl">
                <div className="flex h-[500px]">
                    {/* Sidebar */}
                    <div className="w-1/3 bg-slate-50 border-r border-slate-100 p-8 flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">New Course</h2>
                            <p className="text-xs text-slate-500 leading-relaxed">Expand your curriculum with our smart course wizard.</p>
                        </div>

                        <div className="space-y-6">
                            {[1, 2, 3].map((s) => (
                                <div key={s} className="flex items-center gap-3">
                                    <div className={cn(
                                        "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                                        step === s ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30" :
                                            step > s ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400"
                                    )}>
                                        {step > s ? <CheckCircle2 size={16} /> : s}
                                    </div>
                                    <span className={cn(
                                        "text-sm font-medium",
                                        step === s ? "text-slate-900" : "text-slate-400"
                                    )}>
                                        {s === 1 ? 'Details' : s === 2 ? 'Template' : 'Review'}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div />
                    </div>

                    {/* Content */}
                    <div className="w-2/3 p-10 flex flex-col">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    className="flex-1 space-y-6"
                                >
                                    <h3 className="text-lg font-bold text-slate-900">Basic Information</h3>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Course Title</label>
                                        <Input
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            placeholder="e.g. Advanced Thermodynamics"
                                            className="h-12 border-slate-200 rounded-xl focus:ring-violet-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Course Code</label>
                                            <Input
                                                value={formData.code}
                                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                                placeholder="ME-201"
                                                className="h-12 border-slate-200 rounded-xl font-mono"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Stream</label>
                                            <select
                                                className="w-full h-12 border border-slate-200 rounded-xl px-3 text-sm bg-white focus:ring-2 focus:ring-violet-500 outline-none"
                                                value={formData.stream}
                                                onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                                            >
                                                <option value="CSE">CSE</option>
                                                <option value="ECE">ECE</option>
                                                <option value="MECH">MECH</option>
                                            </select>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    className="flex-1 space-y-6"
                                >
                                    <h3 className="text-lg font-bold text-slate-900">Choose a Template</h3>
                                    <div className="space-y-3">
                                        {templates.map((t) => (
                                            <div
                                                key={t.id}
                                                onClick={() => setFormData({ ...formData, type: t.id })}
                                                className={cn(
                                                    "p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 hover:shadow-md",
                                                    formData.type === t.id ? "border-violet-600 bg-violet-50" : "border-slate-100 bg-white hover:border-violet-200"
                                                )}
                                            >
                                                <div className={cn(
                                                    "h-10 w-10 rounded-full flex items-center justify-center",
                                                    formData.type === t.id ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-500"
                                                )}>
                                                    <t.icon size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm text-slate-900">{t.label}</h4>
                                                    <p className="text-xs text-slate-500">{t.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
                                >
                                    <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-violet-500/30">
                                        <GraduationCap className="text-white h-12 w-12" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-900">{formData.title}</h3>
                                        <p className="text-slate-500 font-medium">{formData.code} • {formData.stream}</p>
                                    </div>
                                    <p className="text-xs text-slate-400 max-w-[200px]">
                                        Ready to initialize your classroom environment?
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Footer Nav */}
                        <div className="pt-6 flex justify-between items-center border-t border-slate-100 mt-auto">
                            {step > 1 ? (
                                <Button variant="ghost" onClick={() => setStep(step - 1)}>Back</Button>
                            ) : <div></div>}

                            {step < 3 ? (
                                <Button onClick={() => setStep(step + 1)} className="bg-slate-900 text-white rounded-full">
                                    Next Step <ChevronRight size={16} className="ml-1" />
                                </Button>
                            ) : (
                                <Button onClick={handleSubmit} className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-8 shadow-lg shadow-violet-500/30">
                                    Create Course
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
