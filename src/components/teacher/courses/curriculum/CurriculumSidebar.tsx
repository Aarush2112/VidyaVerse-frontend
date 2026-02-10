"use client";

import { useState } from "react";
import { Chapter, Lesson, Course } from "@prisma/client";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { GripVertical, Plus } from "lucide-react";
import { AddContentPopover } from "./AddContentPopover";
import { createChapter, reorderChapters } from "@/app/actions/curriculum";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Extend types to include relations
interface LessonWithData extends Lesson { }

interface ChapterWithLessons extends Chapter {
    lessons: LessonWithData[];
}

interface CurriculumSidebarProps {
    course: Course & { chapters: ChapterWithLessons[] };
    editMode?: boolean;
}

export const CurriculumSidebar = ({ course }: CurriculumSidebarProps) => {
    const [chapters, setChapters] = useState(course.chapters);
    const [isCreatingChapter, setIsCreatingChapter] = useState(false);
    const [newChapterTitle, setNewChapterTitle] = useState("");

    const onDragEnd = async (result: DropResult) => {
        const { destination, source, type } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        // Reordering Chapters
        if (type === "chapter") {
            const items = Array.from(chapters);
            const [reorderedItem] = items.splice(source.index, 1);
            items.splice(destination.index, 0, reorderedItem);

            const startIndex = Math.min(source.index, destination.index);
            const endIndex = Math.max(source.index, destination.index);

            const updatedChapters = items.slice(startIndex, endIndex + 1);

            setChapters(items); // Optimistic Update

            const bulkUpdateData = items.map((chapter, index) => ({
                id: chapter.id,
                position: index + 1,
            }));

            await reorderChapters(course.id, bulkUpdateData);
            return;
        }

        // Reordering Lessons - To Be Implemented for inter-chapter movement
        if (type === "lesson") {
            // For V1, we'll focus on Chapter reordering logic first or implement simple intra-chapter lesson reorder
            // This requires a more complex server action for Lesson reordering which we haven't built yet in `curriculum.ts`
            // Stick to Chapter reordering for this exact step to keep it robust.
        }
    };

    const handleCreateChapter = async () => {
        try {
            if (!newChapterTitle) return;
            const res = await createChapter(course.id, newChapterTitle);
            if (res.success && res.chapter) {
                toast.success("Chapter created");
                setNewChapterTitle("");
                setIsCreatingChapter(false);
                // Optimistic add (though revalidatePath usually handles it)
                // setChapters([...chapters, { ...res.chapter, lessons: [] }]); 
            } else {
                toast.error("Failed to create chapter");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="h-full border-r border-slate-200 bg-slate-50 flex flex-col w-80">
            <div className="p-4 border-b border-slate-200 bg-white">
                <h2 className="font-semibold text-slate-800">Curriculum</h2>
                <p className="text-xs text-slate-500">{chapters.length} Chapters</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="chapters" type="chapter">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                                {chapters.map((chapter, index) => (
                                    <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className={cn(
                                                    "bg-white rounded-lg border border-slate-200 shadow-sm",
                                                    snapshot.isDragging && "shadow-lg scale-105 border-violet-400"
                                                )}
                                            >
                                                <div
                                                    className="p-3 flex items-center gap-2 border-b border-slate-100 bg-slate-50/50 rounded-t-lg"
                                                    {...provided.dragHandleProps}
                                                >
                                                    <GripVertical className="h-4 w-4 text-slate-400" />
                                                    <span className="font-medium text-sm text-slate-700 line-clamp-1">
                                                        {chapter.title}
                                                    </span>
                                                </div>

                                                <div className="p-2 space-y-2">
                                                    {/* Lessons would map here */}
                                                    {chapter.lessons.length === 0 && (
                                                        <div className="text-center py-4 text-xs text-slate-400 italic">
                                                            No lessons yet
                                                        </div>
                                                    )}
                                                    {chapter.lessons.map(lesson => (
                                                        <div key={lesson.id} className="p-2 text-sm bg-slate-50 rounded border border-slate-100 flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                                                            {lesson.title}
                                                        </div>
                                                    ))}

                                                    <AddContentPopover onSelect={(type) => console.log("Add", type, "to", chapter.id)} />
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                {isCreatingChapter ? (
                    <div className="flex items-center gap-2 p-2 animate-in fade-in slide-in-from-top-2">
                        <Input
                            value={newChapterTitle}
                            onChange={(e) => setNewChapterTitle(e.target.value)}
                            placeholder="Chapter Title..."
                            className="h-8 text-sm"
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleCreateChapter();
                                if (e.key === "Escape") setIsCreatingChapter(false);
                            }}
                        />
                        <Button size="sm" onClick={handleCreateChapter} disabled={!newChapterTitle}>Add</Button>
                    </div>
                ) : (
                    <Button
                        variant="ghost"
                        className="w-full border-dashed border-2 border-slate-200 text-slate-500 hover:border-violet-400 hover:text-violet-600"
                        onClick={() => setIsCreatingChapter(true)}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Chapter
                    </Button>
                )}
            </div>
        </div>
    );
};
