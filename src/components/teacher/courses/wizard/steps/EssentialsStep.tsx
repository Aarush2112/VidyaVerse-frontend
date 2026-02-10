"use client";

import { useWizardStore } from "@/lib/store/useWizardStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export const EssentialsStep = () => {
    const { data, validation, actions } = useWizardStore();

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="space-y-2">
                <Label htmlFor="title" className="text-base">Course Title</Label>
                <Input
                    id="title"
                    value={data.title}
                    onChange={(e) => actions.updateData("title", e.target.value)}
                    placeholder="e.g. Advanced Data Structures"
                    className="h-12 text-lg"
                />
                {validation.errors.title && <p className="text-sm text-rose-500">{validation.errors.title}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="code" className="text-base">Course Code</Label>
                    <div className="relative">
                        <Input
                            id="code"
                            value={data.code}
                            onChange={(e) => actions.updateData("code", e.target.value.toUpperCase())}
                            onBlur={actions.checkCode}
                            placeholder="e.g. CS-101"
                            className={`h-12 font-mono ${validation.isCodeAvailable === true ? "border-emerald-500 focus-visible:ring-emerald-500" : validation.isCodeAvailable === false ? "border-rose-500 focus-visible:ring-rose-500" : ""}`}
                        />
                        <div className="absolute right-3 top-3.5">
                            {validation.isCheckingCode ? (
                                <Loader2 className="animate-spin text-slate-400" size={20} />
                            ) : validation.isCodeAvailable === true ? (
                                <CheckCircle2 className="text-emerald-500" size={20} />
                            ) : validation.isCodeAvailable === false ? (
                                <XCircle className="text-rose-500" size={20} />
                            ) : null}
                        </div>
                    </div>
                    {validation.errors.code && <p className="text-sm text-rose-500">{validation.errors.code}</p>}
                </div>

                <div className="space-y-2">
                    <Label className="text-base">Stream</Label>
                    <Select value={data.stream} onValueChange={(val) => actions.updateData("stream", val)}>
                        <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select Stream" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="CSE">Computer Science (CSE)</SelectItem>
                            <SelectItem value="ECE">Electronics (ECE)</SelectItem>
                            <SelectItem value="MECH">Mechanical (MECH)</SelectItem>
                            <SelectItem value="AI_ML">AI & Machine Learning</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="desc" className="text-base">Description (Optional)</Label>
                <textarea
                    id="desc"
                    value={data.description}
                    onChange={(e) => actions.updateData("description", e.target.value)}
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Brief overview of what students will learn..."
                />
            </div>
        </motion.div>
    );
};
