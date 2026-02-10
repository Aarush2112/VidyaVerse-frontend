"use client";

import React, { useRef, useState } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { Loader2 } from "lucide-react";

interface CodeEditorProps {
  language?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language = "javascript",
  defaultValue = "// Write your code here...",
  value,
  onChange,
  readOnly = false,
}) => {
  const editorRef = useRef<any>(null);
  
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Define a custom cyberpunk theme
    monaco.editor.defineTheme("cyberpunk", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6272a4" },
        { token: "keyword", foreground: "ff79c6" },
        { token: "identifier", foreground: "8be9fd" },
        { token: "string", foreground: "f1fa8c" },
        { token: "number", foreground: "bd93f9" },
      ],
      colors: {
        "editor.background": "#1a1b26", // Deep dark blue/black
        "editor.foreground": "#a9b1d6",
        "editorCursor.foreground": "#f779cb", // Neon pink cursor
        "editor.lineHighlightBackground": "#292e42",
        "editorLineNumber.foreground": "#565f89",
        "editor.selectionBackground": "#3e4451",
      },
    });

    monaco.editor.setTheme("cyberpunk");
  };

  return (
    <div className="h-full w-full overflow-hidden rounded-md border border-border/50 bg-background shadow-lg shadow-primary/5">
      <Editor
        height="100%"
        width="100%"
        language={language}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        theme="cyberpunk"
        onMount={handleEditorDidMount}
        loading={
            <div className="flex h-full items-center justify-center bg-card text-primary">
                <Loader2 className="animate-spin h-8 w-8" />
            </div>
        }
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
          fontLigatures: true,
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          padding: { top: 16, bottom: 16 },
        }}
      />
    </div>
  );
};

export default CodeEditor;
