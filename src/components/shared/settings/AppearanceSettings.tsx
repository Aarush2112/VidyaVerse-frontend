"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemePreviewCard, ThemeLabel } from "./ThemePreviewCard";
import { ColorSwatch } from "./ColorSwatch";
import { DensityToggle } from "./DensityToggle";
import { SoftToggle } from "./SoftToggle";

export function AppearanceSettings() {
    // State
    const [theme, setTheme] = useState<"light" | "dim" | "system">("light");
    const [brandColor, setBrandColor] = useState("#3B82F6"); // Default Blue
    const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");

    // Accessibility State
    const [reduceMotion, setReduceMotion] = useState(false);
    const [highContrast, setHighContrast] = useState(false);

    const [isDirty, setIsDirty] = useState(false);

    const handleChange = (setter: any, val: any) => {
        setter(val);
        setIsDirty(true);
    };

    const BRAND_COLORS = [
        { label: "Blue", value: "#3B82F6" },
        { label: "Violet", value: "#8B5CF6" },
        { label: "Emerald", value: "#10B981" },
        { label: "Rose", value: "#F43F5E" },
        { label: "Amber", value: "#F59E0B" },
    ];

    return (
        <div className="relative pb-24 space-y-12">
            <header className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 font-poppins">Visual Identity</h2>
                <p className="text-slate-500 mt-1">Customize the portal's look, feel, and accessibility preferences.</p>
            </header>

            {/* 1. Theme Preference */}
            <section>
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-slate-800">Theme Preference</h3>
                    <p className="text-sm text-slate-500">Choose the default interface mode for new users.</p>
                </div>
                <div className="grid grid-cols-3 gap-6">
                    <div>
                        <ThemePreviewCard
                            theme="light"
                            isSelected={theme === "light"}
                            onSelect={() => handleChange(setTheme, "light")}
                        />
                        <ThemeLabel label="Light Mode" isSelected={theme === "light"} />
                    </div>
                    <div>
                        <ThemePreviewCard
                            theme="dim"
                            isSelected={theme === "dim"}
                            onSelect={() => handleChange(setTheme, "dim")}
                        />
                        <ThemeLabel label="Dim Mode" isSelected={theme === "dim"} />
                    </div>
                    <div>
                        <ThemePreviewCard
                            theme="system"
                            isSelected={theme === "system"}
                            onSelect={() => handleChange(setTheme, "system")}
                        />
                        <ThemeLabel label="System Sync" isSelected={theme === "system"} />
                    </div>
                </div>
            </section>

            {/* 2. Brand Accent */}
            <section>
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-slate-800">Brand Accent</h3>
                    <p className="text-sm text-slate-500">This color will be used for buttons, links, and active states.</p>
                </div>
                <div className="flex items-center gap-6 p-6 bg-slate-50/50 border border-slate-100 rounded-[24px]">
                    {BRAND_COLORS.map((color) => (
                        <ColorSwatch
                            key={color.value}
                            color={color.value}
                            label={color.label}
                            isSelected={brandColor === color.value}
                            onSelect={() => handleChange(setBrandColor, color.value)}
                        />
                    ))}
                    <div className="w-px h-12 bg-slate-200 mx-2" />
                    <ColorSwatch
                        color=""
                        label="Custom"
                        isCustom
                        isSelected={!BRAND_COLORS.some(c => c.value === brandColor)}
                        onSelect={() => handleChange(setBrandColor, "custom")}
                    />
                </div>
            </section>

            {/* 3. Data Density */}
            <section>
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-slate-800">Data Density</h3>
                    <p className="text-sm text-slate-500">Adjust the compactness of tables and lists.</p>
                </div>
                <div className="p-6 bg-slate-50/50 border border-slate-100 rounded-[24px]">
                    <DensityToggle
                        value={density}
                        onChange={(val) => handleChange(setDensity, val)}
                    />
                </div>
            </section>

            {/* 4. Accessibility */}
            <section>
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-slate-800">Accessibility</h3>
                    <p className="text-sm text-slate-500">Global overrides for accessibility needs.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between">
                        <div>
                            <div className="font-semibold text-slate-900">Reduce Motion</div>
                            <div className="text-xs text-slate-500">Disable complex animations and transitions.</div>
                        </div>
                        <SoftToggle checked={reduceMotion} onCheckedChange={(v) => handleChange(setReduceMotion, v)} />
                    </div>
                    <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between">
                        <div>
                            <div className="font-semibold text-slate-900">High Contrast</div>
                            <div className="text-xs text-slate-500">Increase border visibility and text contrast.</div>
                        </div>
                        <SoftToggle checked={highContrast} onCheckedChange={(v) => handleChange(setHighContrast, v)} />
                    </div>
                </div>
            </section>

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
                            <Button
                                className="text-slate-900 hover:bg-slate-100 rounded-full font-bold h-9 transition-colors"
                                style={{ backgroundColor: brandColor !== "custom" ? brandColor : "#3B82F6", color: "#FFF" }}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
