"use client";

import React, { useState } from "react";
import { SharedSettingsLayout } from "@/components/shared/settings/SettingsLayout";
import { AppearanceSettings } from "@/components/shared/settings/AppearanceSettings";
import { UserProfile, useUser } from "@clerk/nextjs";
import { syncUser } from "@/app/actions/user";

const STUDENT_MENU_ITEMS = [
    { id: "profile", label: "My Profile" },
    { id: "appearance", label: "Appearance" },
    { id: "billing", label: "Billing" },
];

export default function StudentSettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <SharedSettingsLayout
            menuItems={STUDENT_MENU_ITEMS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            title="Student Settings"
        >
            {activeTab === "profile" && (
                <div className="flex justify-center w-full">
                    <UserProfileSyncWrapper />
                </div>
            )}
            {activeTab === "appearance" && <AppearanceSettings />}

            {activeTab === "billing" && (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-slate-400">
                    <div className="text-2xl font-bold mb-2 text-slate-300">Billing</div>
                    <p>Student billing details coming soon.</p>
                </div>
            )}
        </SharedSettingsLayout>
    );
}

function UserProfileSyncWrapper() {
    const { user } = useUser();

    // Sync DB whenever user name changes (debounced effectively by useEffect dependency)
    React.useEffect(() => {
        if (user && user.fullName) {
            syncUser(user.fullName);
        }
    }, [user?.fullName]);

    return (
        <UserProfile
            routing="hash"
            appearance={{
                elements: {
                    rootBox: "w-full",
                    card: "shadow-none border-none bg-transparent w-full",
                    navbar: "hidden",
                    pageScrollBox: "p-0",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden"
                }
            }}
        />
    );
}
