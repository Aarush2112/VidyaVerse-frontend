"use client";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Video, FileText, HelpCircle, File, Plus } from "lucide-react";

interface AddContentPopoverProps {
    onSelect: (type: "VIDEO" | "TEXT" | "QUIZ" | "FILE") => void;
}

export const AddContentPopover = ({ onSelect }: AddContentPopoverProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-full justify-start text-slate-500 hover:text-violet-600 hover:bg-violet-50">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Content
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2" align="start">
                <div className="grid grid-cols-2 gap-2">
                    <Button
                        variant="ghost"
                        className="flex flex-col items-center justify-center p-4 gap-2 h-auto hover:bg-violet-50 hover:text-violet-700"
                        onClick={() => onSelect("VIDEO")}
                    >
                        <Video className="h-6 w-6 text-violet-500" />
                        <span className="text-xs">Video</span>
                    </Button>
                    <Button
                        variant="ghost"
                        className="flex flex-col items-center justify-center p-4 gap-2 h-auto hover:bg-emerald-50 hover:text-emerald-700"
                        onClick={() => onSelect("TEXT")}
                    >
                        <FileText className="h-6 w-6 text-emerald-500" />
                        <span className="text-xs">Article</span>
                    </Button>
                    <Button
                        variant="ghost"
                        className="flex flex-col items-center justify-center p-4 gap-2 h-auto hover:bg-rose-50 hover:text-rose-700"
                        onClick={() => onSelect("QUIZ")}
                    >
                        <HelpCircle className="h-6 w-6 text-rose-500" />
                        <span className="text-xs">Quiz</span>
                    </Button>
                    <Button
                        variant="ghost"
                        className="flex flex-col items-center justify-center p-4 gap-2 h-auto hover:bg-blue-50 hover:text-blue-700"
                        onClick={() => onSelect("FILE")}
                    >
                        <File className="h-6 w-6 text-blue-500" />
                        <span className="text-xs">File</span>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};
