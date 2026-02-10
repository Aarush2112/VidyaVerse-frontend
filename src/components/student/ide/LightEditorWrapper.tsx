"use client";

import React from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
    code: string;
    onChange: (value: string | undefined) => void;
    language?: string;
    theme?: "light" | "dark";
}

export function LightEditorWrapper({ code, onChange, language = "javascript", theme = "light" }: CodeEditorProps) {
    const handleEditorDidMount = (editor: any, monaco: any) => {
        // Define Light Theme
        monaco.editor.defineTheme('neu-light', {
            base: 'vs',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#F3F4F6', // neu-base
                'editor.lineHighlightBackground': '#E2E8F0',
                'editorLineNumber.foreground': '#A0AEC0',
                'editor.selectionBackground': '#C3DAFE',
                'editor.inactiveSelectionBackground': '#E2E8F0'
            }
        });

        // Define Dark Theme
        monaco.editor.defineTheme('neu-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#1E293B', // neu-base-dark (slate-800)
                'editor.lineHighlightBackground': '#334155',
                'editorLineNumber.foreground': '#64748B',
                'editor.selectionBackground': '#3B82F640',
                'editor.inactiveSelectionBackground': '#334155'
            }
        });

        monaco.editor.setTheme(theme === 'dark' ? 'neu-dark' : 'neu-light');
    };

    return (
        <div className="h-full w-full pt-2 relative">
            {/* Clean Editor Area - Header handled by parent banner */}

            <Editor
                height="100%"
                language={language}
                value={code}
                theme={theme === 'dark' ? 'neu-dark' : 'neu-light'}
                onChange={onChange}
                onMount={handleEditorDidMount}
                loading={<div className="text-neu-text-sub text-xs font-bold tracking-widest animate-pulse">Initializing Neural Interface...</div>}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: true,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    fontFamily: "var(--font-mono)",
                    padding: { top: 20 },
                    scrollbar: {
                        vertical: 'hidden',
                        horizontal: 'hidden'
                    },
                    renderLineHighlight: 'all',
                    cursorBlinking: 'smooth',
                    cursorSmoothCaretAnimation: 'on',
                    overviewRulerLanes: 0,
                    hideCursorInOverviewRuler: true,
                    overviewRulerBorder: false,
                }}
            />
        </div>
    );
}
