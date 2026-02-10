"use client";

import React, { useState } from "react";
import { ImagePlus, Cone, Globe, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SoftToggle } from "@/components/shared/settings/SoftToggle";
import { DangerZoneCard } from "./DangerZoneCard";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function ApplicationForm() {
    // State for toggles
    const [maintenance, setMaintenance] = useState(false);
    const [publicReg, setPublicReg] = useState(true);
    const [strict2FA, setStrict2FA] = useState(false);

    // Dirty state simulation for "Sticky Save"
    const [isDirty, setIsDirty] = useState(false);

    const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>, val: boolean) => {
        setter(val);
        setIsDirty(true);
    };

    return (
        <div className="relative pb-24">
            <header className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 font-poppins">General Settings</h2>
                <p className="text-slate-500 mt-1">Manage platform identity and constraints.</p>
            </header>

            <div className="space-y-10">

                {/* Section 1: Brand Identity */}
                <section>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">Brand Identity</h3>
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Logo Upload */}
                        <div className="w-full md:w-1/3">
                            <div className="border-2 border-dashed border-slate-200 rounded-[24px] bg-slate-50 h-48 flex flex-col items-center justify-center text-slate-400 gap-3 cursor-pointer hover:bg-slate-100 transition-colors group">
                                <div className="h-12 w-12 bg-white rounded-full shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <ImagePlus size={24} className="text-slate-400 group-hover:text-blue-500" />
                                </div>
                                <div className="text-sm font-medium">Drag logo here</div>
                            </div>
                        </div>

                        {/* Inputs */}
                        <div className="w-full md:w-2/3 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2 ml-1">Institute Name</label>
                                <Input
                                    defaultValue="PoorakVerse University"
                                    className="h-12 rounded-full border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-900 px-6"
                                    onChange={() => setIsDirty(true)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2 ml-1">Support Email</label>
                                <Input
                                    defaultValue="help@verse.edu"
                                    className="h-12 rounded-full border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-900 px-6"
                                    onChange={() => setIsDirty(true)}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <hr className="border-slate-100" />

                {/* Section 2: System Constraints */}
                <section>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">System Constraints</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Maintenance Mode */}
                        <div className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-sm flex flex-col justify-between h-40">
                            <div className="flex justify-between items-start">
                                <div className="h-10 w-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">
                                    <Cone size={20} />
                                </div>
                                <SoftToggle checked={maintenance} onCheckedChange={(v) => handleToggle(setMaintenance, v)} />
                            </div>
                            <div>
                                <div className="font-bold text-slate-900">Maintenance Mode</div>
                                <div className="text-xs text-slate-500 mt-1">Suspend all student access.</div>
                            </div>
                        </div>

                        {/* Public Registration */}
                        <div className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-sm flex flex-col justify-between h-40">
                            <div className="flex justify-between items-start">
                                <div className="h-10 w-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                                    <Globe size={20} />
                                </div>
                                <SoftToggle checked={publicReg} onCheckedChange={(v) => handleToggle(setPublicReg, v)} />
                            </div>
                            <div>
                                <div className="font-bold text-slate-900">Public Registration</div>
                                <div className="text-xs text-slate-500 mt-1">Allow anyone to sign up.</div>
                            </div>
                        </div>

                        {/* Strict 2FA */}
                        <div className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-sm flex flex-col justify-between h-40">
                            <div className="flex justify-between items-start">
                                <div className="h-10 w-10 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center">
                                    <Shield size={20} />
                                </div>
                                <SoftToggle checked={strict2FA} onCheckedChange={(v) => handleToggle(setStrict2FA, v)} />
                            </div>
                            <div>
                                <div className="font-bold text-slate-900">Strict 2FA</div>
                                <div className="text-xs text-slate-500 mt-1">Force 2FA for all staff.</div>
                            </div>
                        </div>

                    </div>
                </section>

                <hr className="border-slate-100" />

                {/* Section 3: Danger Zone */}
                <section>
                    <DangerZoneCard />
                </section>
            </div>

            {/* Sticky Save Bar */}
            <AnimatePresence>
                {isDirty && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md bg-slate-900/90 backdrop-blur-md text-white px-6 py-4 rounded-full shadow-2xl flex items-center justify-between z-50 border border-white/10"
                    >
                        <span className="font-medium pl-2">Unsaved changes</span>
                        <div className="flex gap-3">
                            <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10 rounded-full h-9" onClick={() => setIsDirty(false)}>Discard</Button>
                            <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-full font-bold h-9">Save Changes</Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
