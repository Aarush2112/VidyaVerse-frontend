"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface SettingsMenuItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
}

export interface SettingsLayoutProps {
    children: React.ReactNode;
    menuItems: SettingsMenuItem[];
    activeTab: string;
    onTabChange: (id: string) => void;
    title?: string;
    sidebarBottom?: React.ReactNode;
}

export function SharedSettingsLayout({
    children,
    menuItems,
    activeTab,
    onTabChange,
    title = "Configuration",
    sidebarBottom
}: SettingsLayoutProps) {
    return (
        <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 min-h-[600px] overflow-hidden flex flex-col md:flex-row">

            {/* Inner Sidebar (Left) */}
            <div className="w-full md:w-64 bg-slate-50/50 border-r border-slate-100 p-6 md:min-h-full flex flex-col justify-between">
                <div>
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 px-4">{title}</h2>
                    <nav className="space-y-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onTabChange(item.id)}
                                className={cn(
                                    "w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                                    activeTab === item.id
                                        ? "bg-blue-50 text-blue-600 font-semibold"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                )}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Optional Bottom Sidebar Content (e.g., Danger Zone) */}
                {sidebarBottom && (
                    <div className="pt-4 mt-4 border-t border-slate-200/50">
                        {sidebarBottom}
                    </div>
                )}
            </div>

            {/* Content Panel (Right) */}
            <div className="flex-1 p-8 md:p-12 overflow-y-auto">
                <div className="max-w-3xl mx-auto h-full">
                    {children}
                </div>
            </div>
        </div>
    );
}

// Simple wrapper to avoid Framer dependency in the basic layout if not needed, 
// but we can add animation later. 
// For now, just a Fragment-like wrapper.
const motionWrapper = ({ children }: { children: React.ReactNode }) => <>{children}</>;
