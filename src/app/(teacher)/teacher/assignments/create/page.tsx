"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Terminal, FolderGit2, ClipboardList, Shield, Globe, Calendar, ChevronDown, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ArchetypeCard } from "@/components/teacher/assignments/create/ArchetypeCard";
import { CodingConfigPanel } from "@/components/teacher/assignments/create/CodingConfigPanel";
import { ProjectConfigPanel } from "@/components/teacher/assignments/create/ProjectConfigPanel";

import { createAssignment, getTeacherCourses } from "@/app/actions/assignments";
import { AssignmentType } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CreateAssignmentPage() {
    const router = useRouter();
    const [selectedType, setSelectedType] = useState<"CODING" | "PROJECT" | "QUIZ">("CODING");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isPublishing, setIsPublishing] = useState(false);

    // Course Selection
    const [courses, setCourses] = useState<any[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<string>("");

    React.useEffect(() => {
        getTeacherCourses().then(data => {
            setCourses(data);
            if (data.length > 0) {
                setSelectedCourseId(data[0].id);
            } else {
                toast.error("You need to create a course first!");
            }
        });
    }, []);

    const handlePublish = async () => {
        console.log("Publishing Assignment...", { selectedCourseId, title });
        setIsPublishing(true);
        try {
            if (!selectedCourseId) {
                toast.error("Please select a course to publish to.");
                return;
            }

            await createAssignment({
                title,
                description,
                type: AssignmentType.ALGORITHM, // Default to Algorithm
                courseId: selectedCourseId,
                isPublished: true, // Visibile to students
                isProctored: true, // Exam Mode
                points: 100,
                allowedLanguages: ["javascript", "python"], // Top Level
                problems: selectedType === "CODING" ? [{
                    title: title,
                    description: description,
                    testCases: [] // MVP Empty
                }] : []
            });

            toast.success("Challenge Published Successfully!");
            router.push("/teacher/assignments");
        } catch (error) {
            console.error(error);
            toast.error("Failed to publish assignment");
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F2F5F9] font-sans selection:bg-blue-100 text-slate-900 pb-24">
            {/* Action Bar (Sticky Bottom) */}
            <div className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-200 z-50 flex items-center justify-between px-8 md:pl-72 shadow-[0_-5px_30px_-15px_rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    Unsaved Draft
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" className="text-slate-500 hover:text-slate-900 gap-2">
                        <Save size={18} /> Save Draft
                    </Button>
                    <Button
                        size="lg"
                        className="rounded-full px-8 font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-300 transition-all hover:scale-105"
                        onClick={handlePublish}
                        disabled={isPublishing}
                    >
                        {isPublishing ? "Publishing..." : "Publish Challenge"}
                    </Button>
                </div>
            </div>

            <div className="flex relative">
                {/* Main Content Area */}
                <main className="flex-1 p-8 md:p-12 max-w-5xl mx-auto space-y-12">

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-white hover:shadow-sm">
                            <ArrowLeft className="h-5 w-5 text-slate-500" />
                        </Button>
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Challenge Studio</h1>
                            <p className="text-slate-500 font-medium mt-1">Design assessments, coding problems, and system reviews.</p>
                        </div>
                    </div>

                    {/* 1. Basic Info */}
                    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 space-y-6">
                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-2 space-y-2">
                                <Label htmlFor="title" className="text-xs uppercase font-bold text-slate-400 tracking-wider ml-1">Challenge Title</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g. Advanced Graph Theory: Dijkstra's Implementation"
                                    className="text-2xl font-bold border-none border-b border-slate-200 rounded-none px-0 shadow-none focus-visible:ring-0 focus-visible:border-blue-500 placeholder:text-slate-300 h-14"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs uppercase font-bold text-slate-400 tracking-wider ml-1">Select Course</Label>
                                <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
                                    <SelectTrigger className="h-14 text-lg font-medium border-slate-200">
                                        <SelectValue placeholder="Select Course" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {courses.map(course => (
                                            <SelectItem key={course.id} value={course.id}>
                                                {course.code}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* 2. Archetype Selector */}
                    <div className="space-y-4">
                        <Label className="text-xs uppercase font-bold text-slate-400 tracking-wider ml-1">Select Assessment Type</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-48">
                            <ArchetypeCard
                                title="Algorithm Challenge"
                                description="Auto-graded coding problems with test cases."
                                icon={Terminal}
                                color="blue"
                                isSelected={selectedType === "CODING"}
                                onClick={() => setSelectedType("CODING")}
                            />
                            <ArchetypeCard
                                title="System Project"
                                description="Repo links, architecture docs, and file uploads."
                                icon={FolderGit2}
                                color="purple"
                                isSelected={selectedType === "PROJECT"}
                                onClick={() => setSelectedType("PROJECT")}
                            />
                            <ArchetypeCard
                                title="Theory Exam"
                                description="Timed MCQs and short answer responses."
                                icon={ClipboardList}
                                color="orange"
                                isSelected={selectedType === "QUIZ"}
                                onClick={() => setSelectedType("QUIZ")}
                            />
                        </div>
                    </div>

                    {/* 3. Configuration Console */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedType}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-[32px] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 min-h-[400px]"
                        >
                            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
                                <div className={`p-2 rounded-lg ${selectedType === "CODING" ? "bg-blue-100 text-blue-600" :
                                    selectedType === "PROJECT" ? "bg-purple-100 text-purple-600" :
                                        "bg-orange-100 text-orange-600"
                                    }`}>
                                    {selectedType === "CODING" && <Terminal size={20} />}
                                    {selectedType === "PROJECT" && <FolderGit2 size={20} />}
                                    {selectedType === "QUIZ" && <ClipboardList size={20} />}
                                </div>
                                <h2 className="text-xl font-bold text-slate-800">
                                    {selectedType === "CODING" && "Algorithm Configuration"}
                                    {selectedType === "PROJECT" && "Project Requirements"}
                                    {selectedType === "QUIZ" && "Exam Structure"}
                                </h2>
                            </div>

                            {selectedType === "CODING" && (
                                <CodingConfigPanel
                                    description={description}
                                    setDescription={setDescription}
                                />
                            )}
                            {selectedType === "PROJECT" && <ProjectConfigPanel />}
                            {selectedType === "QUIZ" && (
                                <div className="text-center py-20 text-slate-400 italic">
                                    Quiz Builder Module coming soon...
                                </div>
                            )}

                        </motion.div>
                    </AnimatePresence>

                </main>

                {/* 4. Proctoring & Logistics Sidebar */}
                <aside className="hidden xl:block w-96 p-8 border-l border-slate-200 bg-white h-screen sticky top-0 overflow-y-auto z-10">
                    <div className="space-y-10 pt-20">

                        {/* Timeline */}
                        <div className="space-y-6">
                            <h3 className="text-xs uppercase font-black text-slate-400 tracking-[0.2em]">Timeline</h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold text-slate-700">Due Date</Label>
                                    <div className="relative">
                                        <Input type="date" className="pl-10 h-11 bg-slate-50 border-slate-200" />
                                        <Calendar className="absolute left-3 top-3 text-slate-400 h-5 w-5" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold text-slate-700">Late Policy</Label>
                                    <div className="relative">
                                        <select className="w-full h-11 bg-slate-50 border border-slate-200 rounded-md px-3 text-sm text-slate-600 appearance-none">
                                            <option>Strict (No submissions)</option>
                                            <option>Allow with -10% / day</option>
                                            <option>Grace Period (24h)</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-3.5 text-slate-400 h-4 w-4 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security */}
                        <div className="space-y-6">
                            <h3 className="text-xs uppercase font-black text-slate-400 tracking-[0.2em]">Security Protocol</h3>

                            <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/50 space-y-4">
                                <div className="flex items-start gap-3">
                                    <Shield className="text-indigo-600 mt-1" size={18} />
                                    <div className="space-y-1">
                                        <div className="font-bold text-indigo-900 text-sm">Exam Mode</div>
                                        <p className="text-xs text-indigo-700/80 leading-relaxed">
                                            Enforces fullscreen, blocks tab switching, and enables webcam monitoring logic.
                                        </p>
                                    </div>
                                    <Switch className="data-[state=checked]:bg-indigo-600" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                        <Globe size={14} /> IP Restriction
                                    </Label>
                                    <Switch />
                                </div>
                                <p className="text-xs text-slate-400 px-1">
                                    Restrict submissions to Campus Wi-Fi ranges only.
                                </p>
                            </div>
                        </div>

                    </div>
                </aside>
            </div>
        </div>
    );
}
