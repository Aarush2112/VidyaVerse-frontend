"use client";

import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Users, Github, Search } from "lucide-react";

export function ProjectConfigPanel() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="space-y-8"
        >
            {/* Project Details */}
            <div className="space-y-4">
                <Label className="text-base font-bold text-slate-700">Submission Requirements</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <Checkbox id="repo" defaultChecked className="mt-1" />
                        <div className="space-y-1">
                            <label htmlFor="repo" className="font-bold text-slate-800 flex items-center gap-2 cursor-pointer">
                                <Github size={14} /> GitHub Repository
                            </label>
                            <p className="text-xs text-slate-500">Require specific branch or commit hash.</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <Checkbox id="docs" defaultChecked className="mt-1 bg-slate-100 border-slate-300" />
                        <div className="space-y-1">
                            <label htmlFor="docs" className="font-bold text-slate-800 flex items-center gap-2 cursor-pointer">
                                PDF Report / Documentation
                            </label>
                            <p className="text-xs text-slate-500">Architecture diagrams and system overview.</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <Checkbox id="demo" className="mt-1 bg-slate-100 border-slate-300" />
                        <div className="space-y-1">
                            <label htmlFor="demo" className="font-bold text-slate-800 flex items-center gap-2 cursor-pointer">
                                Live Demo URL
                            </label>
                            <p className="text-xs text-slate-500">Publicly accessible deployment link.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Integrity & Group Settings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-slate-100">

                {/* Plagiarism */}
                <div className="space-y-4">
                    <Label className="text-base font-bold text-slate-700">Integrity Checks</Label>
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl border border-purple-100">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 font-bold text-purple-900">
                                <Search size={16} /> Copyleaks Scan
                            </div>
                            <p className="text-xs text-purple-600/80 max-w-[200px]">
                                Auto-scan code submissions against online repos and peer solutions.
                            </p>
                        </div>
                        <Switch className="data-[state=checked]:bg-purple-600" />
                    </div>
                </div>

                {/* Team Settings */}
                <div className="space-y-4">
                    <Label className="text-base font-bold text-slate-700">Team Configuration</Label>
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-6">
                        <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                            <Users size={20} />
                        </div>
                        <div className="flex-1">
                            <label className="text-sm font-semibold text-slate-700 block mb-1">Max Team Size</label>
                            <Input type="number" defaultValue="1" min="1" max="5" className="w-24 bg-slate-50" />
                        </div>
                        <div className="text-right">
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Mode</div>
                            <Badge variant="secondary">Individual</Badge>
                        </div>
                    </div>
                </div>

            </div>
        </motion.div>
    );
}
