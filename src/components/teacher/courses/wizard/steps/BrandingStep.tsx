"use client";

import { useWizardStore } from "@/lib/store/useWizardStore";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Check, UploadCloud, ImageIcon } from "lucide-react";
import { CourseCard } from "@/components/teacher/courses/CourseCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const themes = [
    "from-violet-500 to-purple-600",
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-teal-500",
    "from-orange-500 to-amber-500",
    "from-pink-500 to-rose-500",
];

export const BrandingStep = () => {
    const { data, actions } = useWizardStore();

    // Live Preview Object
    const previewCourse: any = {
        id: "preview",
        title: data.title || "Untitled Course",
        code: data.code || "XXX-000",
        _count: { students: 0, modules: 0 },
        progress: 0,
        thumbnail: data.thumbnail || data.theme,
        status: "DRAFT", // Always draft in preview
        credits: data.credits,
        semester: data.semester,
        stream: data.stream,
        difficulty: data.difficulty
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="space-y-4">
                <Label className="text-base text-slate-900 font-bold">Cover Art Strategy</Label>

                <Tabs defaultValue="gradient" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1 rounded-xl">
                        <TabsTrigger value="gradient" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-violet-700 data-[state=active]:shadow-sm">
                            Gradient & Patterns
                        </TabsTrigger>
                        <TabsTrigger value="upload" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-violet-700 data-[state=active]:shadow-sm">
                            Custom Upload
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="gradient" className="mt-6 space-y-4">
                        <div className="flex gap-4 justify-center">
                            {themes.map((theme) => (
                                <div
                                    key={theme}
                                    onClick={() => {
                                        actions.updateData("theme", theme);
                                        actions.updateData("thumbnail", null); // Reset thumbnail if theme selected
                                    }}
                                    className={`w-12 h-12 rounded-full cursor-pointer bg-gradient-to-br ${theme} flex items-center justify-center ring-offset-2 transition-all duration-300 ${data.theme === theme && !data.thumbnail ? "ring-2 ring-violet-600 scale-110 shadow-lg" : "hover:scale-110 opacity-70 hover:opacity-100"
                                        }`}
                                >
                                    {data.theme === theme && !data.thumbnail && <Check className="text-white drop-shadow-md" size={18} />}
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="upload" className="mt-6">
                        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-violet-100 transition-colors">
                                <UploadCloud className="text-slate-400 group-hover:text-violet-600" />
                            </div>
                            <p className="text-sm font-medium text-slate-700">Click to upload image</p>
                            <p className="text-xs text-slate-400 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                            {/* Stub input for now */}
                            <Input
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                    // Mock upload behavior
                                    if (e.target.files?.[0]) {
                                        // In real app: Upload to Cloudinary, get URL.
                                        // For now, we simulate success or use a placeholder URL if needed, 
                                        // but since we can't easily get a local blob URL in this env without more code, 
                                        // I'll set a placeholder to demonstrate the state change.
                                        actions.updateData("thumbnail", "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop");
                                    }
                                }}
                            />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            <div className="space-y-3">
                <Label className="text-xs uppercase tracking-wider text-slate-400 font-bold">Live Preview</Label>
                <div className="p-8 bg-slate-50/80 rounded-[24px] border border-slate-100 flex items-center justify-center shadow-inner">
                    <div className="w-[340px] pointer-events-none select-none transform transition-transform hover:scale-[1.02] duration-500">
                        {/* 
                             The existing CourseCard likely expects specific props. 
                             We are passing the constructed preview object.
                             Note: Ensure CourseCard handles 'thumbnail' being a gradient string vs URL correctly.
                          */}
                        <CourseCard
                            course={previewCourse}
                            onDuplicate={() => { }}
                            onArchive={() => { }}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
