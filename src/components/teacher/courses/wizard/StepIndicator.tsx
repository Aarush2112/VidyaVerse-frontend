"use client";

import { useWizardStore } from "@/lib/store/useWizardStore";
import { Check, Book, Settings, Layers, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const steps = [
    { id: 1, label: "Essentials", icon: Book },
    { id: 2, label: "Logistics", icon: Settings },
    { id: 3, label: "Structure", icon: Layers },
    { id: 4, label: "Branding", icon: Palette },
];

export const StepIndicator = () => {
    const { step, actions } = useWizardStore();

    return (
        <div className="w-full h-full p-8 bg-slate-50/50 border-r border-slate-100 flex flex-col">
            <h2 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mb-12 px-2">
                New Course
            </h2>

            <div className="relative space-y-8 flex-1">
                {/* Connecting Line */}
                <div className="absolute left-[19px] top-4 bottom-12 w-0.5 bg-slate-200 -z-10" />

                {steps.map((s) => {
                    const isCompleted = step > s.id;
                    const isActive = step === s.id;

                    return (
                        <div key={s.id} className="flex items-center gap-4 group">
                            <motion.div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 bg-white z-10",
                                    isActive ? "border-violet-600 text-violet-600 shadow-lg shadow-violet-500/20" :
                                        isCompleted ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-200 text-slate-400"
                                )}
                                animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                            >
                                {isCompleted ? <Check size={18} strokeWidth={3} /> : <s.icon size={18} />}
                            </motion.div>

                            <div className="flex flex-col">
                                <span className={cn(
                                    "text-sm font-bold transition-colors duration-300",
                                    isActive ? "text-slate-900" : isCompleted ? "text-slate-700" : "text-slate-400"
                                )}>
                                    {s.label}
                                </span>
                                {isActive && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-[10px] text-violet-500 font-medium"
                                    >
                                        In Progress
                                    </motion.span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="px-2">
                <p className="text-xs text-slate-400">Step {step} of 4</p>
                <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                    <motion.div
                        className="h-full bg-violet-600 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: `${(step / 4) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
