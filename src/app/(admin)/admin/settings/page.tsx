"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { SharedSettingsLayout } from "@/components/shared/settings/SettingsLayout";
import { AppearanceSettings } from "@/components/shared/settings/AppearanceSettings";
import { ApplicationForm } from "@/components/admin/settings/ApplicationForm";

const ADMIN_MENU_ITEMS = [
    { id: "general", label: "General" },
    { id: "appearance", label: "Appearance" },
    { id: "features", label: "Feature Flags" },
    { id: "billing", label: "Billing & Plans" },
    { id: "api", label: "API Keys" },
];

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState("general");

    return (
        <SharedSettingsLayout
            menuItems={ADMIN_MENU_ITEMS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            title="Admin Configuration"
            sidebarBottom={
                <button
                    onClick={() => setActiveTab("danger")}
                    className={cn(
                        "w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                        activeTab === "danger"
                            ? "bg-rose-50 text-rose-600 font-bold"
                            : "text-rose-600 hover:bg-rose-50"
                    )}
                >
                    Danger Zone
                </button>
            }
        >
            {activeTab === "general" && <ApplicationForm />}
            {activeTab === "appearance" && <AppearanceSettings />}

            {/* Placeholders */}
            {activeTab !== "general" && activeTab !== "appearance" && activeTab !== "danger" && (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-slate-400">
                    <div className="text-2xl font-bold mb-2 text-slate-300">{ADMIN_MENU_ITEMS.find(i => i.id === activeTab)?.label}</div>
                    <p>Module configuration coming soon.</p>
                </div>
            )}
            {activeTab === "danger" && (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-rose-400">
                    <div className="text-2xl font-bold mb-2 text-rose-300">Danger Zone</div>
                    <p>Critical operations are restricted.</p>
                </div>
            )}
        </SharedSettingsLayout>
    );
}
