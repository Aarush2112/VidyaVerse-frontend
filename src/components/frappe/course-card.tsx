"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Star, Users } from "lucide-react";
import Link from "next/link";

interface CourseCardProps {
    id: string;
    title: string;
    description: string;
    image?: string;
    color?: string; // Gradient color base
    progress?: number;
    lessons: number;
    rating: number;
    enrolled: number;
}

export function FrappeCourseCard({
    id,
    title,
    description,
    image,
    color = "indigo",
    progress,
    lessons,
    rating,
    enrolled
}: CourseCardProps) {
    // Generate gradient based on color prop
    const gradient = image
        ? `url(${image})`
        : `linear-gradient(to top right, #18181b, var(--color-${color}-900))`; // Tailwind color var approximation

    // Fallback gradient styles since dynamic tailwind classes are tricky
    const gradientStyle = image ? {} : {
        background: `linear-gradient(135deg, #18181b 0%, ${getErrorColor(color)} 100%)`
    };

    function getErrorColor(c: string) {
        switch (c) {
            case 'indigo': return '#312e81'; // indigo-900
            case 'rose': return '#881337'; // rose-900
            case 'emerald': return '#064e3b'; // emerald-900
            case 'amber': return '#78350f'; // amber-900
            default: return '#312e81';
        }
    }

    return (
        <Link href={`/student/courses/${id}`}>
            <Card className="h-full overflow-hidden border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:shadow-xl transition-all duration-300 group">
                {/* Header / Cover */}
                <div
                    className="h-40 w-full bg-cover bg-center relative transition-transform duration-500 group-hover:scale-105"
                    style={image ? { backgroundImage: `url(${image})` } : gradientStyle}
                >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    {!image && (
                        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                            <h3 className="text-xl font-bold text-white leading-tight drop-shadow-md">
                                {title}
                            </h3>
                        </div>
                    )}
                </div>

                {/* Content */}
                <CardContent className="p-4 flex flex-col h-[calc(100%-10rem)]">
                    {/* Stats Row */}
                    <div className="flex items-center justify-between text-xs text-zinc-500 mb-3">
                        <div className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" /> {lessons} Lessons
                        </div>
                        <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" /> {enrolled}
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                            <Star className="h-3 w-3 fill-current" /> {rating}
                        </div>
                    </div>

                    {/* Title (if image used) or Desc */}
                    {image && (
                        <h3 className="font-semibold text-zinc-100 mb-2 line-clamp-1">{title}</h3>
                    )}

                    <p className="text-sm text-zinc-400 line-clamp-2 mb-4 flex-1">
                        {description}
                    </p>

                    {/* Progress (if enrolled) */}
                    {progress !== undefined && (
                        <div className="space-y-2 mt-auto">
                            <div className="flex justify-between text-xs text-zinc-400">
                                <span>Progress</span>
                                <span className="text-white">{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-1 bg-zinc-800" />
                        </div>
                    )}

                    {/* Footer / Instructors (Optional) */}
                    <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
                        <div className="flex -space-x-2">
                            <Avatar className="h-6 w-6 border-2 border-zinc-900">
                                <AvatarFallback className="text-[10px] bg-indigo-900 text-indigo-200">JD</AvatarFallback>
                            </Avatar>
                            <Avatar className="h-6 w-6 border-2 border-zinc-900">
                                <AvatarFallback className="text-[10px] bg-rose-900 text-rose-200">AS</AvatarFallback>
                            </Avatar>
                        </div>
                        <Badge variant="outline" className="text-[10px] border-zinc-700 text-zinc-400 group-hover:border-indigo-500/50 group-hover:text-indigo-400 transition-colors">
                            View Course
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
