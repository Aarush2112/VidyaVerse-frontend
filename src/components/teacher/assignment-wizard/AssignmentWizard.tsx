"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AssignmentFormValues, assignmentFormSchema } from "./schema"
import { WizardProvider } from "./context"
import { WizardStep1Logistics } from "./WizardStep1Logistics"
import { WizardStep2Coding } from "./WizardStep2Coding"
import { WizardStep3Contest } from "./WizardStep3Contest"
import { WizardStep4Proctor } from "./WizardStep4Proctor"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, Save, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { createAssignment } from "@/app/actions/assignments"
import { AssignmentType } from "@prisma/client"

export function AssignmentWizard({ courses }: { courses: any[] }) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [step, setStep] = useState(1)

    const form = useForm<AssignmentFormValues>({
        // @ts-ignore
        resolver: zodResolver(assignmentFormSchema),
        defaultValues: {
            mode: "STANDARD",
            batchId: "",
            title: "",
            allowedLanguages: ["javascript", "python"],
            points: 100,
            testCases: [{ input: "", output: "", isHidden: false, points: 10 }],
            strictMode: {
                blockCopyPaste: true,
                forceFullscreen: true,
                preventTabSwitch: true,
                maxTabSwitches: 3
            }
        }
    })

    const mode = form.watch("mode")
    const totalSteps = mode === "CONTEST" ? 4 : 3

    const nextStep = async () => {
        const fieldsToValidate = getFieldsForStep(step, mode)
        // @ts-ignore
        const isValid = await form.trigger(fieldsToValidate)

        if (isValid) {
            setStep((s) => Math.min(s + 1, totalSteps))
        }
    }

    const prevStep = () => setStep((s) => Math.max(s - 1, 1))

    const onSubmit = async (data: AssignmentFormValues) => {
        setIsSubmitting(true)
        try {
            await createAssignment({
                title: data.title,
                type: (data.mode === "CONTEST" ? "CONTEST" : "ASSIGNMENT") as AssignmentType,
                courseId: data.batchId, // Using batchId as courseId placeholder based on UI
                startDate: data.mode === "CONTEST" && data.startTime ? new Date(data.startTime) : undefined,
                dueDate: data.mode === "STANDARD" && data.dueDate ? new Date(data.dueDate) : undefined,
                isProctored: data.strictMode.blockCopyPaste,
                isPublished: true,
                points: data.points,
                allowedLanguages: data.allowedLanguages,
                problems: [
                    {
                        title: data.title,
                        description: data.description || "",
                        allowedLanguages: data.allowedLanguages,
                        cpuTimeLimit: 1.0,
                        testCases: data.testCases.map(tc => ({
                            input: tc.input,
                            expectedOutput: tc.output,
                            isHidden: tc.isHidden,
                            points: tc.points ?? 10
                        }))
                    }
                ]
            })
            router.push("/teacher/dashboard")
            // toast.success("Created!") (Assuming toast is available or will add)
        } catch (err: any) {
            console.error(err)
            alert(err.message || "Failed to create assignment")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        // @ts-ignore - React Hook Form + Zod Unions cause type nuances that are safe to ignore here
        <WizardProvider form={form} initialStep={step} courses={courses}>
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Stepper UI */}
                <div className="flex items-center justify-between px-2">
                    {Array.from({ length: totalSteps }).map((_, i) => (
                        <div key={i} className="flex items-center">
                            <div className={`
                                w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border transition-all duration-300
                                ${step > i + 1 ? "bg-indigo-600 border-indigo-600 text-white" :
                                    step === i + 1 ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/30" :
                                        "bg-slate-900 border-slate-700 text-slate-500"}
                            `}>
                                {i + 1}
                            </div>
                            {i < totalSteps - 1 && (
                                <div className={`w-16 h-0.5 mx-2 rounded transition-colors duration-300 ${step > i + 1 ? "bg-indigo-600" : "bg-slate-800"}`} />
                            )}
                        </div>
                    ))}
                </div>

                <form onSubmit={form.handleSubmit(onSubmit as any)}>
                    <div className="space-y-6 min-h-[400px]">
                        {step === 1 && <WizardStep1Logistics />}
                        {step === 2 && <WizardStep2Coding />}
                        {/* Adjust Step Rendering based on Mode */}
                        {mode === "CONTEST" && step === 3 && <WizardStep3Contest />}
                        {(mode === "CONTEST" ? step === 4 : step === 3) && <WizardStep4Proctor />}
                    </div>

                    <div className="flex justify-between pt-6 mt-8 border-t border-slate-800">
                        <Button type="button" variant="ghost" onClick={prevStep} disabled={step === 1} className="text-slate-400 hover:text-white hover:bg-slate-800">
                            <ChevronLeft className="mr-2 h-4 w-4" /> Back
                        </Button>

                        {step < totalSteps ? (
                            <Button type="button" onClick={nextStep} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                Next <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        ) : (
                            <Button type="submit" disabled={isSubmitting} className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[150px]">
                                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                Publish {mode === "CONTEST" ? "Contest" : "Assignment"}
                            </Button>
                        )}
                    </div>
                </form>

                {/* Debug Info */}
                <div className="p-4 bg-black/40 rounded text-xs font-mono text-slate-600 break-all hidden">
                    {JSON.stringify(form.watch(), null, 2)}
                </div>
            </div>
        </WizardProvider>
    )
}

function getFieldsForStep(step: number, mode: "STANDARD" | "CONTEST") {
    switch (step) {
        case 1: return ["title", "batchId", mode === "STANDARD" ? "dueDate" : "startTime"];
        case 2: return ["allowedLanguages", "testCases"];
        case 3: return mode === "CONTEST" ? ["liveRanking", "freezeLeaderboard"] : ["strictMode"];
        case 4: return ["strictMode"];
        default: return [];
    }
}
