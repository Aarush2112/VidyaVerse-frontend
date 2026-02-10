"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { updateCourse } from "@/app/actions/courses";
import { toast } from "sonner";
import { Loader2, ArrowRight } from "lucide-react";

// Schema matching Prisma Model
const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    code: z.string().min(1, "Course code is required"),
    thumbnail: z.string().optional(),
    stream: z.enum(["CSE", "ECE", "MECH", "AI_ML"]),
    semester: z.string().min(1, "Semester is required"),
    capacity: z.number().min(1, "Capacity must be at least 1"),
    difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
    isPublished: z.boolean().default(false),
});

interface CourseSetupClientProps {
    course: any; // Prisma Course Type
}

const GRADIENTS = [
    { label: "Violet", value: "gradient-violet" },
    { label: "Emerald", value: "gradient-emerald" },
    { label: "Rose", value: "gradient-rose" },
    { label: "Orange", value: "gradient-orange" },
    { label: "Dark", value: "gradient-dark" },
];

export const CourseSetupClient = ({ course }: CourseSetupClientProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: course.title,
            description: course.description || "",
            code: course.code,
            thumbnail: course.thumbnail || "gradient-violet",
            stream: course.stream || "CSE",
            semester: course.semester || "Spring 2026",
            capacity: course.capacity || 60,
            difficulty: course.difficulty || "INTERMEDIATE",
            isPublished: course.isPublished,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            const res = await updateCourse(course.id, values);
            if (res.success) {
                toast.success("Course details updated");
                router.refresh();
            } else {
                toast.error("Failed to update course");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 md:p-10">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
                        Course Setup
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Configure the basic details and settings for your course.
                    </p>
                </div>
                <Button
                    variant="outline"
                    className="gap-2 text-violet-600 border-violet-200 hover:bg-violet-50"
                    onClick={() => router.push(`/teacher/courses/${course.id}/edit`)}
                >
                    Curriculum Studio <ArrowRight size={16} />
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-card p-6 rounded-2xl border border-border shadow-sm">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Course Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Advanced Data Structures" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Course Code</FormLabel>
                                            <FormControl>
                                                <Input placeholder="CS-101" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="stream"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Stream</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select stream" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="CSE">CSE</SelectItem>
                                                    <SelectItem value="ECE">ECE</SelectItem>
                                                    <SelectItem value="MECH">MECH</SelectItem>
                                                    <SelectItem value="AI_ML">AI & ML</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="What will students learn in this course?" className="min-h-[120px]" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="semester"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Semester</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Spring 2026" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="capacity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Capacity</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="difficulty"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Difficulty</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select level" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="BEGINNER">Beginner</SelectItem>
                                                    <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                                                    <SelectItem value="ADVANCED">Advanced</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-border">
                                <FormField
                                    control={form.control}
                                    name="isPublished"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 w-full">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">Publish Course</FormLabel>
                                                <FormDescription>
                                                    Make this course visible to students.
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="submit" disabled={isLoading} className="w-full bg-violet-600 hover:bg-violet-700">
                                {isLoading ? <Loader2 className="animate-spin mr-2" /> : "Save Changes"}
                            </Button>
                        </form>
                    </Form>
                </div>

                {/* Sidebar Configuration */}
                <div className="space-y-6">
                    {/* Thumbnail Picker */}
                    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                        <h3 className="font-bold text-foreground mb-4">Course Thumbnail</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {GRADIENTS.map((gradient) => (
                                <button
                                    key={gradient.value}
                                    onClick={() => form.setValue("thumbnail", gradient.value)}
                                    className={`h-16 rounded-lg bg-gradient-to-br ${getGradientClass(gradient.value)} ${form.watch("thumbnail") === gradient.value ? 'ring-2 ring-violet-600 ring-offset-2' : 'hover:opacity-80'
                                        } transition-all`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Quick Stats or Tips */}
                    <div className="bg-violet-50 p-6 rounded-2xl border border-violet-100">
                        <h3 className="font-bold text-violet-900 mb-2">Setup Tips</h3>
                        <ul className="text-sm text-violet-700 space-y-2 list-disc list-inside">
                            <li>Choose a unique course code for easy identification.</li>
                            <li>Write a compelling description to attract students.</li>
                            <li>Ensure capacity is set correctly for your batch size.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper for gradient classes (matching existing map in CourseCard or duplicating)
const getGradientClass = (name: string) => {
    const map: Record<string, string> = {
        'gradient-violet': 'from-violet-900 via-purple-800 to-indigo-900',
        'gradient-emerald': 'from-emerald-900 via-teal-800 to-green-900',
        'gradient-rose': 'from-rose-900 via-pink-800 to-red-900',
        'gradient-orange': 'from-orange-900 via-amber-800 to-yellow-900',
        'gradient-dark': 'from-slate-900 via-gray-800 to-zinc-900',
    };
    return map[name] || map['gradient-violet'];
}
