"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert, LogOut } from "lucide-react";
import { useAuth, useUser, SignOutButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function AccessDenied() {
    const { userId, isLoaded } = useAuth();
    const { user } = useUser();
    const [dbRole, setDbRole] = useState<string>("Loading...");

    useEffect(() => {
        async function checkDb() {
            if (userId) {
                // Fetch basic status from a server action or just infer from context
                // For now, simpler to just show the button
                setDbRole("Unverified")
            }
        }
        checkDb()
    }, [userId]);

    // Metadata from client-side object
    const middlewareRole = user?.publicMetadata?.role as string || "null";

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
            <ShieldAlert className="h-24 w-24 text-red-600 mb-6 animate-pulse" />
            <h1 className="text-4xl font-bold tracking-tighter mb-2">ACCESS DENIED</h1>
            <p className="text-zinc-400 mb-8 max-w-md text-center">
                Your session data is out of sync with your new permissions.
                Please sign out to refresh your access.
            </p>

            <div className="bg-zinc-900 border border-red-900/50 p-4 rounded mb-8 text-left font-mono text-xs text-red-300 w-full max-w-md overflow-hidden opacity-70">
                <p className="font-bold text-red-500 mb-2">SESSION_DIAGNOSTICS:</p>
                <p>User ID: {userId || "null"}</p>
                <p>Public Meta Role: {middlewareRole}</p>
            </div>

            <div className="flex gap-4">
                <Link href="/">
                    <Button variant="outline" className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white transition-colors">
                        Return Home
                    </Button>
                </Link>

                <SignOutButton redirectUrl="/">
                    <Button variant="default" className="bg-white text-black hover:bg-zinc-200">
                        <LogOut className="mr-2 h-4 w-4" /> Sign Out & Refresh
                    </Button>
                </SignOutButton>
            </div>
        </div>
    )
}
