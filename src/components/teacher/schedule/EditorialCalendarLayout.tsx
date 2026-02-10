"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface EditorialCalendarLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

export function EditorialCalendarLayout({
    children,
    title,
    subtitle
}: EditorialCalendarLayoutProps) {

    return (
        <div className="h-screen bg-[#EBF1F9] text-foreground flex flex-col relative overflow-hidden font-friendly">
            {/* Soft Knowledge Ambient Light */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-white/40 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-white/40 blur-[120px] rounded-full pointer-events-none -z-10" />

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:wght@400;500;600;700&display=swap');
                
                .font-serif-aesthetic {
                    font-family: 'Playfair Display', serif;
                }
                .font-friendly {
                    font-family: 'Poppins', sans-serif;
                }
                
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                /* Text selection color for Soft UI vibe */
                ::selection {
                    background: rgba(91, 134, 229, 0.15);
                    color: #1E293B;
                }
            `}</style>

            {children}
        </div>
    );
}
