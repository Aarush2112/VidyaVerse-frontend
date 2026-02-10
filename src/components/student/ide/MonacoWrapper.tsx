"use client";

import React, { useRef, useEffect } from "react";
import Editor, { OnMount, loader } from "@monaco-editor/react";

interface MonacoWrapperProps {
    value?: string;
    onChange?: (value: string | undefined) => void;
    language?: string;
}

export function MonacoWrapper({ value, onChange, language = "javascript" }: MonacoWrapperProps) {
    const editorRef = useRef<any>(null);

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;

        // Final polish for monaco instance
        editor.updateOptions({
            fontSize: 14,
            fontFamily: "'Geist Mono', 'Fira Code', monospace",
            lineHeight: 22,
            minimap: { enabled: false },
            padding: { top: 20 },
            scrollbar: {
                vertical: "visible",
                horizontal: "visible",
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10,
            },
            lineNumbers: "on",
            glyphMargin: true,
            folding: true,
        });

        // Add custom theme
        monaco.editor.defineTheme('poorak-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#1e1e1e',
                'editor.lineHighlightBackground': '#2a2a2a',
                'editor.selectionBackground': '#3e3e3e',
                'editorLineNumber.foreground': '#5a5a5a',
                'editorCursor.foreground': '#6366f1',
            }
        });
        monaco.editor.setTheme('poorak-dark');
    };

    return (
        <div className="h-full w-full bg-[#1e1e1e] overflow-hidden">
            <Editor
                height="100%"
                defaultLanguage={language}
                value={value}
                onChange={onChange}
                onMount={handleEditorDidMount}
                theme="poorak-dark"
                options={{
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                }}
            />
        </div>
    );
}
