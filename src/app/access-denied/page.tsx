"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert, LogOut } from "lucide-react";
import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export default function AccessDenied() {
    const [loading, setLoading] = useState(false);

    async function handleSignOut() {
        setLoading(true);
        try {
            await fetch(`${API_BASE}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
            window.location.href = "/";
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
            <ShieldAlert className="h-24 w-24 text-red-600 mb-6 animate-pulse" />
            <h1 className="text-4xl font-bold tracking-tighter mb-2">ACCESS DENIED</h1>
            <p className="text-zinc-400 mb-8 max-w-md text-center">
                You do not have permission to view this page. Sign out and sign in with an account that has access.
            </p>

            <div className="flex gap-4">
                <Link href="/">
                    <Button variant="outline" className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white transition-colors">
                        Return Home
                    </Button>
                </Link>
                <Button
                    variant="default"
                    className="bg-white text-black hover:bg-zinc-200"
                    onClick={handleSignOut}
                    disabled={loading}
                >
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </Button>
            </div>
        </div>
    );
}
