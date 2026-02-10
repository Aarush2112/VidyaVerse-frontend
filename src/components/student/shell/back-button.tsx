"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
    const router = useRouter();

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-muted-foreground hover:text-white hover:bg-white/10 gap-2 mb-4"
        >
            <ArrowLeft className="h-4 w-4" />
            Back
        </Button>
    )
}
