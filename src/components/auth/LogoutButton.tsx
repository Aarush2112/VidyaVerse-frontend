"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export function LogoutButton({
    children,
    className,
    variant = "ghost",
}: {
    children?: React.ReactNode;
    className?: string;
    variant?: "ghost" | "default" | "outline";
}) {
    const router = useRouter();

    async function handleLogout() {
        await fetch(`${API_BASE}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        window.location.href = "/";
    }

    return (
        <button
            type="button"
            onClick={handleLogout}
            className={className}
        >
            {children ?? <><LogOut className="h-4 w-4 mr-2" /> Log out</>}
        </button>
    );
}
