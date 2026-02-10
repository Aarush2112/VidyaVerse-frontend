"use client";

import { useEffect, useState } from "react";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { GripVertical, Plus, FileText, Video, Puzzle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { reorderChapters, reorderLessons, createChapter, createLesson } from "@/app/actions/curriculum";
import { Chapter, Lesson, Course } from "@prisma/client";
import { useRouter } from "next/navigation";

// Extended type to include relations
type ChapterWithLessons = Chapter & { lessons: Lesson[] };
type CourseWithChapters = Course & { chapters: ChapterWithLessons[] };

interface CurriculumTreeProps {
    course: CourseWithChapters;
}

export const CurriculumTree = ({ course }: CurriculumTreeProps) => {
    const router = useRouter();
    const [chapters, setChapters] = useState(course.chapters);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        setChapters(course.chapters);
    }, [course.chapters]);

    const onDragEnd = async (result: DropResult) => {
        const { destination, source, type } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        // Reordering Chapters
        if (type === "CHAPTER") {
            const reorderedChapters = Array.from(chapters);
            const [movedChapter] = reorderedChapters.splice(source.index, 1);
            reorderedChapters.splice(destination.index, 0, movedChapter);

            setChapters(reorderedChapters); // Optimistic

            const updateData = reorderedChapters.map((chapter, index) => ({
                id: chapter.id,
                position: index + 1,
            }));

            const res = await reorderChapters(course.id, updateData);
            if (!res.success) {
                toast.error("Failed to reorder chapters");
                router.refresh(); // Revert
            }
            return;
        }

        // Reordering Lessons
        if (type === "LESSON") {
            const sourceChapterIndex = chapters.findIndex(c => c.id === source.droppableId);
            const destChapterIndex = chapters.findIndex(c => c.id === destination.droppableId);

            if (sourceChapterIndex === -1 || destChapterIndex === -1) return;

            const newChapters = [...chapters];
            const sourceChapter = newChapters[sourceChapterIndex];
            const destChapter = newChapters[destChapterIndex];

            // Same Chapter
            if (source.droppableId === destination.droppableId) {
                const reorderedLessons = Array.from(sourceChapter.lessons);
                const [movedLesson] = reorderedLessons.splice(source.index, 1);
                reorderedLessons.splice(destination.index, 0, movedLesson);

                sourceChapter.lessons = reorderedLessons;
                setChapters(newChapters);

                const updateData = reorderedLessons.map((lesson, index) => ({
                    id: lesson.id,
                    position: index + 1,
                }));

                const res = await reorderLessons(course.id, sourceChapter.id, updateData);
                if (!res.success) {
                    toast.error("Failed to reorder lessons");
                    router.refresh();
                }
            } else {
                toast.error("Drag between chapters disabled in this version.");
                // In future: needs createLesson/deleteLesson or updateLesson.chapterId and reorder
            }
        }
    };

    const handleCreateChapter = async () => {
        setIsCreating(true);
        const title = "New Section";
        // In a real app, we'd show an input field first or default to "New Chapter"
        const res = await createChapter(course.id, title);

        if (res.success) {
            toast.success("Chapter created");
            router.refresh();
        } else {
            toast.error(res.error || "Failed to create chapter");
        }
        setIsCreating(false);
    };

    const handleCreateLesson = async (chapterId: string) => {
        const title = "New Lesson";
        const res = await createLesson(chapterId, title);
        if (res.success) {
            toast.success("Lesson created");
            router.refresh();
        } else {
            toast.error(res.error || "Failed to create lesson");
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-50/50">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10 shadow-sm">
                <h2 className="font-bold text-slate-800 text-sm">Course Structure</h2>
                <Button size="sm" variant="ghost" onClick={handleCreateChapter} disabled={isCreating} className="text-violet-600 hover:text-violet-700 hover:bg-violet-50">
                    <Plus size={16} className="mr-1" /> Section
                </Button>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="chapters" type="CHAPTER">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4"
                        >
                            {chapters.length === 0 && (
                                <div className="text-center py-10 text-slate-400 text-sm">
                                    No chapters yet. Click "+ Section" to start.
                                </div>
                            )}

                            {chapters.map((chapter, index) => (
                                <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className={cn(
                                                "bg-white border rounded-xl overflow-hidden transition-all duration-200",
                                                snapshot.isDragging ? "shadow-2xl ring-2 ring-violet-500/20 rotate-2 z-50 border-violet-200" : "border-slate-200 shadow-sm hover:border-violet-200/50"
                                            )}
                                        >
                                            <div
                                                {...provided.dragHandleProps}
                                                className="p-3 flex items-center gap-3 bg-slate-50/50 border-b border-slate-100 group"
                                            >
                                                <GripVertical size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                                                <span className="font-semibold text-sm text-slate-700">{chapter.title}</span>
                                                <div className="ml-auto flex gap-1 transform opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button size="icon" variant="ghost" className="h-6 w-6 text-slate-400 hover:text-violet-600" onClick={() => handleCreateLesson(chapter.id)}>
                                                        <Plus size={14} />
                                                    </Button>
                                                </div>
                                            </div>

                                            <Droppable droppableId={chapter.id} type="LESSON">
                                                {(provided) => (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        className={cn(
                                                            "p-2 space-y-2 min-h-[10px]",
                                                            chapter.lessons.length === 0 && "py-4"
                                                        )}
                                                    >
                                                        {chapter.lessons.length === 0 && (
                                                            <div className="text-center text-xs text-slate-300 italic">Drop lessons here</div>
                                                        )}

                                                        {chapter.lessons.map((lesson, lessonIndex) => (
                                                            <Draggable key={lesson.id} draggableId={lesson.id} index={lessonIndex}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className={cn(
                                                                            "p-2.5 rounded-lg border flex items-center gap-3 text-sm transition-all group cursor-pointer",
                                                                            snapshot.isDragging
                                                                                ? "bg-violet-50 border-violet-200 text-violet-700 shadow-md"
                                                                                : "bg-white border-slate-100 text-slate-600 hover:border-violet-200 hover:bg-slate-50/50"
                                                                        )}
                                                                        onClick={() => {
                                                                            // Selection logic via URL param or global store
                                                                            router.push(`?lessonId=${lesson.id}`);
                                                                        }}
                                                                    >
                                                                        <GripVertical size={12} className="text-slate-200 group-hover:text-slate-400 transition-colors" />

                                                                        {lesson.type === 'VIDEO' && <Video size={14} className="text-blue-500" />}
                                                                        {lesson.type === 'QUIZ' && <Puzzle size={14} className="text-amber-500" />}
                                                                        {lesson.type === 'TEXT' && <FileText size={14} className="text-emerald-500" />}

                                                                        <span className="truncate font-medium">{lesson.title}</span>

                                                                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                                                            {/* Future: Edit/Delete Actions */}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};
