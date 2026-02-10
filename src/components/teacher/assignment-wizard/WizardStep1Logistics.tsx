"use client"

import { useWizard } from "./context"
import { useFormContext } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, BookOpen, Clock, Calendar } from "lucide-react"

export function WizardStep1Logistics() {
    const { form, courses: ctxCourses } = useWizard()
    const mode = form.watch("mode")

    return (
        <Card className="bg-slate-900 border-slate-800 animate-in fade-in slide-in-from-right-4 duration-500">
            <CardHeader>
                <CardTitle className="text-white">Step 1: Logistics & Type</CardTitle>
                <CardDescription className="text-slate-400">Define the assignment type and schedule.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* MODE TOGGLE */}
                <div className="bg-slate-950 p-1 rounded-lg inline-flex">
                    <button
                        type="button"
                        onClick={() => form.setValue("mode", "STANDARD")}
                        className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === "STANDARD" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                            }`}
                    >
                        <BookOpen className="mr-2 h-4 w-4" /> Standard Assignment
                    </button>
                    <button
                        type="button"
                        onClick={() => form.setValue("mode", "CONTEST")}
                        className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === "CONTEST" ? "bg-amber-600 text-white" : "text-slate-400 hover:text-white"
                            }`}
                    >
                        <Trophy className="mr-2 h-4 w-4" /> Coding Contest
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-slate-300">Title</Label>
                        <Input {...form.register("title")} className="bg-slate-950 border-slate-800" placeholder="e.g. Weekly Contest #45" />
                        {form.formState.errors.title && <p className="text-red-500 text-xs">{form.formState.errors.title.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label className="text-slate-300">Target Course/Batch</Label>
                        <Select onValueChange={(val) => form.setValue("batchId", val)} defaultValue={form.getValues("batchId")}>
                            <SelectTrigger className="bg-slate-950 border-slate-800">
                                <SelectValue placeholder="Select Course" />
                            </SelectTrigger>
                            <SelectContent>
                                {ctxCourses.map((c: any) => (
                                    <SelectItem key={c.id} value={c.id}>
                                        {c.title} ({c.code})
                                    </SelectItem>
                                ))}
                                {ctxCourses.length === 0 && (
                                    <SelectItem value="none" disabled>No courses found</SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                        {form.formState.errors.batchId && <p className="text-red-500 text-xs">{form.formState.errors.batchId.message}</p>}
                    </div>
                </div>

                {mode === "STANDARD" ? (
                    <div className="grid grid-cols-2 gap-4 animate-in fade-in">
                        <div className="space-y-2">
                            <Label className="text-slate-300">Due Date</Label>
                            <Input type="datetime-local" {...form.register("dueDate")} className="bg-slate-950 border-slate-800" />
                            {/* @ts-ignore */}
                            {(form.formState.errors as any).dueDate && <p className="text-red-500 text-xs">{(form.formState.errors as any).dueDate?.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-300">Points</Label>
                            <Input type="number" {...form.register("points")} className="bg-slate-950 border-slate-800" />
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-4 animate-in fade-in bg-amber-950/10 p-4 rounded border border-amber-900/20">
                        <div className="space-y-2">
                            <Label className="text-amber-200">Start Time</Label>
                            <Input type="datetime-local" {...form.register("startTime")} className="bg-slate-950 border-amber-900/30" />
                            {/* @ts-ignore */}
                            {form.formState.errors.startTime && <p className="text-red-500 text-xs">{form.formState.errors.startTime?.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-amber-200">Duration (mins)</Label>
                            <Input type="number" {...form.register("duration")} className="bg-slate-950 border-amber-900/30" placeholder="e.g. 120" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-amber-200">Late Buffer (mins)</Label>
                            <Input type="number" {...form.register("lateBuffer")} className="bg-slate-950 border-amber-900/30" placeholder="0 = Strict" />
                        </div>
                    </div>
                )}

                <div className="space-y-2">
                    <Label className="text-slate-300">Description</Label>
                    <Textarea {...form.register("description")} className="bg-slate-950 border-slate-800 h-32 font-mono" placeholder="Markdown supported..." />
                </div>
            </CardContent>
        </Card>
    )
}
