"use client";

import { useWizardStore } from "@/lib/store/useWizardStore";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "./StepIndicator";
import { EssentialsStep } from "./steps/EssentialsStep";
import { LogisticsStep } from "./steps/LogisticsStep";
import { StructureStep } from "./steps/StructureStep";
import { BrandingStep } from "./steps/BrandingStep";
import { AnimatePresence } from "framer-motion";
import { createCourse } from "@/app/actions/course-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, AlertTriangle } from "lucide-react";

interface CourseWizardModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CourseWizardModal = ({ isOpen, onClose }: CourseWizardModalProps) => {
    const { step, data, actions } = useWizardStore();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showExitConfirm, setShowExitConfirm] = useState(false);

    const handleNext = () => {
        if (step === 4) {
            handleFinish();
        } else {
            actions.nextStep();
        }
    };

    const handleFinish = async () => {
        setIsSubmitting(true);
        const result = await createCourse(data);
        setIsSubmitting(false);

        if (result.success) {
            toast.success("Course Initialized Successfully! 🚀");
            onClose();
            actions.reset();
            router.push(`/teacher/courses/${result.courseId}/edit`);
        } else {
            toast.error(result.error || "Failed to create course");
        }
    };

    const handleAttemptClose = () => {
        // If data is entered (e.g. step > 1 or title filled), show confirm
        if (step > 1 || data.title.length > 0) {
            setShowExitConfirm(true);
        } else {
            onClose();
        }
    };

    const confirmExit = () => {
        setShowExitConfirm(false);
        onClose();
        actions.reset();
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={(open) => !open && handleAttemptClose()}>
                {/* Backdrop Blur Fix - using a separate div to ensure blur effect */}
                {isOpen && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-40 transition-opacity duration-300" aria-hidden="true" />
                )}

                <DialogContent className="max-w-[900px] h-[600px] p-0 overflow-hidden flex rounded-[32px] border-0 shadow-2xl z-50 gap-0">
                    <DialogTitle className="sr-only">Course Creation Wizard</DialogTitle>
                    {/* Left Rail */}
                    <div className="w-[280px] bg-slate-50 h-full border-r border-slate-100/50">
                        <StepIndicator />
                    </div>

                    {/* Right Canvas */}
                    <div className="flex-1 bg-white h-full flex flex-col">
                        {/* Header */}
                        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-900">
                                {step === 1 && "Course Identity"}
                                {step === 2 && "Logistics & Metadata"}
                                {step === 3 && "Curriculum Architecture"}
                                {step === 4 && "Visual Branding"}
                            </h3>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-8 overflow-y-auto">
                            <AnimatePresence mode="wait">
                                {step === 1 && <EssentialsStep key="step1" />}
                                {step === 2 && <LogisticsStep key="step2" />}
                                {step === 3 && <StructureStep key="step3" />}
                                {step === 4 && <BrandingStep key="step4" />}
                            </AnimatePresence>
                        </div>

                        {/* Footer */}
                        <div className="px-8 py-6 border-t border-slate-50 flex justify-between items-center bg-white z-10">
                            <Button
                                variant="ghost"
                                onClick={actions.prevStep}
                                disabled={step === 1 || isSubmitting}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                Back
                            </Button>

                            <Button
                                onClick={handleNext}
                                disabled={isSubmitting}
                                className={`rounded-full px-8 py-6 font-bold transition-all shadow-lg shadow-violet-500/20 ${step === 4 ? "bg-violet-600 hover:bg-violet-700 hover:shadow-violet-500/40" : "bg-slate-900 hover:bg-slate-800"
                                    }`}
                            >
                                {isSubmitting ? (
                                    <Loader2 className="animate-spin mr-2" />
                                ) : step === 4 ? (
                                    "Construct Course"
                                ) : (
                                    "Next Step"
                                )}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Exit Confirmation Dialog */}
            <Dialog open={showExitConfirm} onOpenChange={setShowExitConfirm}>
                <DialogContent className="max-w-md rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-amber-600">
                            <AlertTriangle size={20} />
                            Discard Unsaved Progress?
                        </DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-slate-500">
                        You have started creating a course. If you leave now, all entered data will be lost.
                    </p>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setShowExitConfirm(false)}>
                            Keep Editing
                        </Button>
                        <Button variant="destructive" onClick={confirmExit}>
                            Discard & Exit
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
