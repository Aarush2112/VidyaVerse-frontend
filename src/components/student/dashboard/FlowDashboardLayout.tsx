"use client";

import React from "react";

export function FlowDashboardLayout({
    hero,
    discovery,
    stack
}: {
    hero: React.ReactNode;
    discovery: React.ReactNode;
    stack: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#F2F5F9] p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header (Greeting) handled in page or inserted here, assuming clear canvas for now */}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 h-full">

                    {/* Left: Focus Zone (8 Columns) */}
                    <div className="lg:col-span-8 flex flex-col gap-6 lg:gap-8">
                        {/* A. Hero Focus Card */}
                        <div className="flex-1 w-full">
                            {hero}
                        </div>

                        {/* B. Discovery Deck */}
                        <div className="h-auto">
                            {discovery}
                        </div>
                    </div>

                    {/* Right: Quantified Self Stack (4 Columns) */}
                    <div className="lg:col-span-4 h-full">
                        <div className="sticky top-8 h-full">
                            {stack}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
