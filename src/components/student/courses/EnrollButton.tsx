"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { enrollInCourse } from "@/app/actions/enroll";
import { toast } from "sonner";
import { Loader2, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface EnrollButtonProps {
    courseId: string;
    isEnrolled: boolean;
    price?: number | null;
}

export const EnrollButton = ({ courseId, isEnrolled, price }: EnrollButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isEnrolled) {
            router.push(`/student/courses/${courseId}`); // Go to course player (placeholder route)
            return;
        }

        setIsLoading(true);
        try {
            const res = await enrollInCourse(courseId);
            if (res.success) {
                toast.success(res.message || "Enrolled successfully");
                router.refresh();
            } else {
                toast.error(res.error || "Failed to enroll");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={onClick}
            disabled={isLoading}
            variant={isEnrolled ? "outline" : "default"}
            className={cn(
                "w-full rounded-xl font-medium transition-all shadow-sm hover:shadow-md",
                isEnrolled
                    ? "border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 bg-emerald-50/50"
                    : "bg-violet-600 hover:bg-violet-700 text-white"
            )}
        >
            {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : isEnrolled ? (
                <>
                    <Check className="h-4 w-4 mr-2" />
                    Simulate Setup
                </>
            ) : (
                price ? `Enroll for $${price}` : "Enroll Free"
            )}
        </Button>
    );
};
