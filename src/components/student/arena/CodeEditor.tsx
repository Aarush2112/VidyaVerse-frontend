"use client";

import React, { useEffect, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useArenaStore } from "@/lib/store/useArenaStore";

interface CodeEditorProps {
    defaultValue: string;
}

export function CodeEditor({ defaultValue }: CodeEditorProps) {
    const { setCode, code, language } = useArenaStore();
    const monaco = useMonaco();
    const [mounted, setMounted] = useState(false);

    // Set initial code only once
    useEffect(() => {
        if (!code && defaultValue) {
            setCode(defaultValue);
        }
    }, [defaultValue, setCode, code]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (monaco) {
            // Define Neo-Glass Dark Theme
            monaco.editor.defineTheme('neo-glass-dark', {
                base: 'vs-dark',
                inherit: true,
                rules: [
                    { token: 'comment', foreground: '6272A4', fontStyle: 'italic' },
                    { token: 'keyword', foreground: 'FF79C6', fontStyle: 'bold' },
                    { token: 'string', foreground: 'F1FA8C' },
                    { token: 'number', foreground: 'BD93F9' },
                    { token: 'type', foreground: '8BE9FD' },
                ],
                colors: {
                    'editor.background': '#1E293B', // Slate 900
                    'editor.foreground': '#F8F8F2',
                    'editor.lineHighlightBackground': '#2D3748',
                    'editor.selectionBackground': '#44475a',
                    'editorCursor.foreground': '#8BE9FD',
                }
            });
            monaco.editor.setTheme('neo-glass-dark');
        }
    }, [monaco]);

    // Ensure hydration
    if (!mounted) return <div className="h-full bg-slate-900 animate-pulse rounded-[24px]" />;

    return (
        <div className="h-full w-full rounded-[24px] overflow-hidden shadow-xl bg-[#1E293B] border border-white/5 relative group">
            {/* Glass Reflection effect on top */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

            <Editor
                height="100%"
                language={language}
                value={code || defaultValue}
                onChange={(value) => setCode(value || "")}
                theme="neo-glass-dark"
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    scrollBeyondLastLine: false,
                    smoothScrolling: true,
                    cursorBlinking: "smooth",
                    padding: { top: 20 },
                    roundedSelection: true,
                }}
            />
        </div>
    );
}
