"use client"

import { createContext, useContext, useState } from "react"
import { UseFormReturn } from "react-hook-form"
import { AssignmentFormValues } from "./schema"

interface WizardContextType {
    step: number
    setStep: (step: number) => void
    form: UseFormReturn<AssignmentFormValues>
    courses: any[]
}

const WizardContext = createContext<WizardContextType | null>(null)

export function WizardProvider({
    children,
    form,
    initialStep = 1,
    courses = []
}: {
    children: React.ReactNode
    form: UseFormReturn<AssignmentFormValues>
    initialStep?: number
    courses?: any[]
}) {
    const [step, setStep] = useState(initialStep)

    return (
        <WizardContext.Provider value={{ step, setStep, form, courses }}>
            {children}
        </WizardContext.Provider>
    )
}

export function useWizard() {
    const context = useContext(WizardContext)
    if (!context) throw new Error("useWizard must be used within WizardProvider")
    return context
}
