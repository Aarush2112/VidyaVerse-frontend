import { create } from 'zustand';

export type ExecutionResult = {
    status: 'SUCCESS' | 'ERROR';
    results: { input: string; expected: string; actual: string; passed: boolean }[];
    consoleOutput: string;
}

interface ArenaState {
    code: string;
    isExecuting: boolean;
    executionResult: ExecutionResult | null;
    activeTab: 'DESCRIPTION' | 'CONSOLE';
    language: 'python' | 'javascript';

    setCode: (code: string) => void;
    setIsExecuting: (isExecuting: boolean) => void;
    setExecutionResult: (result: ExecutionResult | null) => void;
    setActiveTab: (tab: 'DESCRIPTION' | 'CONSOLE') => void;
    setLanguage: (lang: 'python' | 'javascript') => void;
}

export const useArenaStore = create<ArenaState>((set) => ({
    code: "",
    isExecuting: false,
    executionResult: null,
    activeTab: 'DESCRIPTION', // Default
    language: 'python',

    setCode: (code) => set({ code }),
    setIsExecuting: (isExecuting) => set({ isExecuting }),
    setExecutionResult: (executionResult) => set({ executionResult }),
    setActiveTab: (activeTab) => set({ activeTab }),
    setLanguage: (language) => set({ language }),
}));
