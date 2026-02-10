"use client";

import { useWizardStore } from "@/lib/store/useWizardStore";
import { motion } from "framer-motion";
import { LayoutTemplate, FileText, Beaker } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export const StructureStep = () => {
    const { data, actions } = useWizardStore();

    const templates = [
        { id: "empty", name: "Empty Canvas", desc: "Start from scratch", icon: LayoutTemplate },
        { id: "theory", name: "Theory Heavy", desc: "Lecture notes & quizzes", icon: FileText },
        { id: "lab", name: "Engineering Lab", desc: "Manuals & submissions", icon: Beaker },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="grid grid-cols-3 gap-4">
                {templates.map((t) => (
                    <motion.div
                        key={t.id}
                        onClick={() => actions.updateData("templateId", t.id === 'empty' ? null : t.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`cursor-pointer relative p-6 rounded-2xl border-2 flex flex-col items-center text-center transition-all duration-300 h-[200px] justify-center gap-4 ${(data.templateId === t.id) || (t.id === 'empty' && data.templateId === null)
                            ? "border-violet-600 bg-violet-50/50 shadow-lg ring-2 ring-violet-500/20"
                            : "border-slate-100 bg-white hover:border-violet-200 hover:shadow-xl hover:shadow-violet-500/10"
                            }`}
                    >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 ${(data.templateId === t.id) || (t.id === 'empty' && data.templateId === null)
                            ? "bg-violet-600 text-white shadow-lg shadow-violet-500/40"
                            : "bg-slate-50 text-slate-400 group-hover:text-violet-500"
                            }`}>
                            <t.icon size={28} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-sm mb-1">{t.name}</h3>
                            <p className="text-xs text-slate-500 leading-snug px-2">{t.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 p-6 rounded-2xl border border-indigo-100/50 flex items-center justify-between shadow-sm">
                <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-lg">
                        ✨
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-sm">AI Curriculum Generator</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Auto-generate syllabus structure using Gemini</p>
                    </div>
                </div>

                <Switch
                    checked={data.isAIEnabled}
                    onCheckedChange={(checked) => actions.updateData("isAIEnabled", checked)}
                    className="data-[state=checked]:bg-violet-600"
                />
            </div>
        </motion.div>
    );
};
