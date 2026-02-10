"use client";

import React, { useState } from "react";
import { SharedSettingsLayout } from "@/components/shared/settings/SettingsLayout";
import { AppearanceSettings } from "@/components/shared/settings/AppearanceSettings";
import { UserProfile } from "@clerk/nextjs";

const TEACHER_MENU_ITEMS = [
    { id: "profile", label: "My Profile" },
    { id: "appearance", label: "Appearance" },
    { id: "notifications", label: "Notifications" },
];

export default function TeacherSettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <SharedSettingsLayout
            menuItems={TEACHER_MENU_ITEMS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            title="Teacher Settings"
        >
            {activeTab === "profile" && (
                <div className="flex justify-center w-full">
                    <UserProfile
                        appearance={{
                            elements: {
                                rootBox: "w-full",
                                card: "shadow-none border-none bg-transparent w-full",
                                navbar: "hidden", // Hide sidebar since we use our own
                                pageScrollBox: "p-0",
                                headerTitle: "hidden",
                                headerSubtitle: "hidden"
                            }
                        }}
                    />
                </div>
            )}
            {activeTab === "appearance" && <AppearanceSettings />}

            {activeTab === "notifications" && (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-slate-400">
                    <div className="text-2xl font-bold mb-2 text-slate-300">Notifications</div>
                    <p>Notification preferences coming soon.</p>
                </div>
            )}
        </SharedSettingsLayout>
    );
}
