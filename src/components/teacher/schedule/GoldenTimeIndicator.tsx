"use client";

import React from "react";

export function GoldenTimeIndicator({ top }: { top: number }) {
    return (
        <div
            className="absolute left-0 right-0 z-40 flex items-center pointer-events-none"
            style={{ top: `${top}px` }}
        >
            {/* Soft UI Time Marker */}
            <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#5B86E5]/40 to-transparent" />

            {/* Subtlest Ambient Pulse */}
            <div className="absolute inset-0 h-[6px] -top-[3px] bg-gradient-to-r from-transparent via-[#5B86E5]/5 to-transparent blur-md" />
        </div>
    );
}
