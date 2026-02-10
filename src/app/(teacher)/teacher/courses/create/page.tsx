"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateCoursePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [title, setTitle] = useState("");
    const [code, setCode] = useState("");

    const handleCreate = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("Creating Course:", { title, code });
        setIsLoading(false);
        router.push("/teacher/courses");
    };

    return (
        <div className="min-h-screen bg-[#F2F5F9] p-8 font-friendly">
            <div className="max-w-2xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-5 w-5 text-slate-500" />
                    </Button>
                    <h1 className="text-2xl font-bold text-slate-900">Create New Course</h1>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 space-y-6">

                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title">Course Title</Label>
                        <Input
                            id="title"
                            placeholder="e.g. Distributed Systems"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-slate-50 border-slate-200"
                        />
                    </div>

                    {/* Code */}
                    <div className="space-y-2">
                        <Label htmlFor="code">Course Code</Label>
                        <Input
                            id="code"
                            placeholder="e.g. CS-401"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="bg-slate-50 border-slate-200"
                        />
                    </div>

                    {/* Action */}
                    <Button
                        onClick={handleCreate}
                        disabled={!title || !code || isLoading}
                        className="w-full h-12 rounded-xl text-lg font-bold bg-blue-600 text-white hover:bg-blue-700"
                    >
                        {isLoading ? "Creating..." : "Launch Course"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
