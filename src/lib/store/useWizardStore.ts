import { create } from 'zustand';
import { Stream, CourseDifficulty } from '@prisma/client';
import { checkCourseCode } from '@/app/actions/course-actions';

interface WizardState {
    step: number;
    data: {
        title: string;
        code: string;
        description: string;
        stream: Stream;
        semester: string;
        credits: number;
        capacity: number;
        difficulty: CourseDifficulty;
        templateId: string | null;
        theme: string; // Gradient CSS
        thumbnail: string | null;
        isAIEnabled: boolean;
    };
    validation: {
        isCodeAvailable: boolean | null; // null = unchecked
        isCheckingCode: boolean;
        errors: Record<string, string>;
    };
    actions: {
        nextStep: () => void;
        prevStep: () => void;
        setStep: (step: number) => void;
        updateData: (field: string, value: any) => void;
        validateStep: (step: number) => boolean;
        checkCode: () => Promise<void>;
        reset: () => void;
    };
}

const INITIAL_DATA = {
    title: "",
    code: "",
    description: "",
    stream: "CSE" as Stream,
    semester: "Spring 2026",
    credits: 4,
    capacity: 60,
    difficulty: "INTERMEDIATE" as CourseDifficulty,
    templateId: null,
    theme: "from-violet-500 to-purple-600",
    thumbnail: null,
    isAIEnabled: false
};

export const useWizardStore = create<WizardState>((set, get) => ({
    step: 1,
    data: INITIAL_DATA,

    validation: {
        isCodeAvailable: null,
        isCheckingCode: false,
        errors: {}
    },

    actions: {
        updateData: (field, value) => {
            set((state) => ({
                data: { ...state.data, [field]: value },
                // Clear error for this field if exists
                validation: {
                    ...state.validation,
                    errors: { ...state.validation.errors, [field]: '' }
                }
            }));
        },

        nextStep: () => {
            const currentStep = get().step;
            if (get().actions.validateStep(currentStep)) {
                set((state) => ({ step: Math.min(state.step + 1, 4) }));
            }
        },

        prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),

        setStep: (step) => set({ step }),

        checkCode: async () => {
            const { code } = get().data;
            if (!code || code.length < 3) return;

            set((state) => ({ validation: { ...state.validation, isCheckingCode: true } }));

            const result = await checkCourseCode(code);

            set((state) => ({
                validation: {
                    ...state.validation,
                    isCheckingCode: false,
                    isCodeAvailable: result.available,
                    errors: result.available
                        ? { ...state.validation.errors, code: '' }
                        : { ...state.validation.errors, code: `Code taken. Try: ${result.suggestion}` }
                }
            }));
        },

        validateStep: (step) => {
            const { data, validation } = get();
            const errors: Record<string, string> = {};
            let isValid = true;

            if (step === 1) {
                if (!data.title) errors.title = "Title is required";
                if (!data.code) errors.code = "Course Code is required";
                if (validation.isCodeAvailable === false) errors.code = "Code already taken";
            }

            // Step 2, 3, 4 have defaults, generally valid unless cleared.

            if (Object.keys(errors).length > 0) {
                set((state) => ({ validation: { ...state.validation, errors } }));
                isValid = false;
            }

            return isValid;
        },

        reset: () => set({ step: 1, data: INITIAL_DATA, validation: { isCodeAvailable: null, isCheckingCode: false, errors: {} } })
    }
}));
