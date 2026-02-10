"use client";

import { useWizardStore } from "@/lib/store/useWizardStore";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";

export const LogisticsStep = () => {
    const { data, actions } = useWizardStore();

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
        >
            <div className="space-y-4">
                <Label className="text-base">Semester</Label>
                <div className="grid grid-cols-3 gap-3">
                    {["Spring 2026", "Fall 2026", "Summer 2026"].map((sem) => (
                        <div
                            key={sem}
                            onClick={() => actions.updateData("semester", sem)}
                            className={`cursor-pointer rounded-xl border-2 p-4 text-center transition-all ${data.semester === sem
                                ? "border-violet-600 bg-violet-50 text-violet-700 font-bold shadow-soft-sm"
                                : "border-slate-100 bg-white text-slate-600 hover:border-violet-200"
                                }`}
                        >
                            {sem}
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <Label className="text-base">Class Capacity</Label>
                    <span className="text-2xl font-bold text-violet-600">{data.capacity}</span>
                </div>
                <Slider
                    value={[data.capacity]}
                    max={200}
                    step={10}
                    onValueChange={(vals: number[]) => actions.updateData("capacity", vals[0])}
                    className="py-4"
                />
                <p className="text-sm text-slate-400">Maximum number of students allowed to enroll.</p>
            </div>

            <div className="space-y-4">
                <Label className="text-base">Credits</Label>
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => actions.updateData("credits", Math.max(1, data.credits - 1))}
                        className="rounded-full h-12 w-12 border-slate-200"
                    >
                        <Minus size={20} />
                    </Button>
                    <div className="w-24 text-center">
                        <span className="text-3xl font-bold text-slate-800">{data.credits}</span>
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => actions.updateData("credits", Math.min(10, data.credits + 1))}
                        className="rounded-full h-12 w-12 border-slate-200"
                    >
                        <Plus size={20} />
                    </Button>
                </div>
            </div>

            <div className="space-y-2">
                <Label className="text-base">Difficulty Level</Label>
                <Select value={data.difficulty} onValueChange={(val) => actions.updateData("difficulty", val)}>
                    <SelectTrigger className="h-12">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="BEGINNER">Beginner</SelectItem>
                        <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                        <SelectItem value="ADVANCED">Advanced</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </motion.div>
    );
};
