"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Bold, Italic, List, ListOrdered, Underline as UnderlineIcon, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
        ],
        content: value,
        editorProps: {
            attributes: {
                class: "min-h-[200px] p-4 focus:outline-none prose prose-slate max-w-none border-0",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) return null;

    return (
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-2 bg-slate-50 border-b border-slate-200">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive("bold") ? "bg-violet-100 text-violet-700" : "text-slate-600"}
                >
                    <Bold size={16} />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive("italic") ? "bg-violet-100 text-violet-700" : "text-slate-600"}
                >
                    <Italic size={16} />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive("underline") ? "bg-violet-100 text-violet-700" : "text-slate-600"}
                >
                    <UnderlineIcon size={16} />
                </Button>
                <div className="w-px h-6 bg-slate-200 mx-1" />
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive("bulletList") ? "bg-violet-100 text-violet-700" : "text-slate-600"}
                >
                    <List size={16} />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive("orderedList") ? "bg-violet-100 text-violet-700" : "text-slate-600"}
                >
                    <ListOrdered size={16} />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive("blockquote") ? "bg-violet-100 text-violet-700" : "text-slate-600"}
                >
                    <Quote size={16} />
                </Button>
            </div>

            {/* Editor Area */}
            <EditorContent editor={editor} />
        </div>
    );
};
