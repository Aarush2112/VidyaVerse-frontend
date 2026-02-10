"use client";

import { Button } from "@/components/ui/button";
import { publishCourse } from "@/app/actions/curriculum";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface CourseActionsProps {
    courseId: string;
    isPublished: boolean;
    disabled: boolean;
}

export const CourseActions = ({ courseId, isPublished, disabled }: CourseActionsProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onPublish = async () => {
        setIsLoading(true);
        try {
            const res = await publishCourse(courseId);
            if (res.success) {
                toast.success("Course published!");
                router.refresh();
            } else {
                toast.error(res.error || "Failed to publish");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onPublish}
                disabled={disabled || isLoading || isPublished}
                variant={isPublished ? "outline" : "default"}
                size="sm"
            >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                {isPublished ? "Published" : "Publish"}
            </Button>
        </div>
    );
};
