import * as z from "zod"

export const contestSchema = z.object({
    mode: z.literal("CONTEST"),
    startTime: z.string().min(1, "Start time is required"),
    duration: z.coerce.number().min(5, "Minimum duration is 5 mins"),
    lateBuffer: z.coerce.number().default(0),
    liveRanking: z.boolean().default(false),
    freezeLeaderboard: z.coerce.number().optional(),
})

export const standardSchema = z.object({
    mode: z.literal("STANDARD"),
    dueDate: z.string().min(1, "Due date is required"),
})

export const baseSchema = z.object({
    title: z.string().min(2, "Title is too short"),
    description: z.string().optional(),
    batchId: z.string().min(1, "Select a batch"),
    points: z.coerce.number().min(1).max(1000),
    allowedLanguages: z.array(z.string()).min(1, "Select at least 1 language"),
    strictMode: z.object({
        blockCopyPaste: z.boolean(),
        forceFullscreen: z.boolean(),
        preventTabSwitch: z.boolean(),
        maxTabSwitches: z.coerce.number().optional(),
    }),
    testCases: z.array(z.object({
        input: z.string(),
        output: z.string(),
        points: z.coerce.number().optional(),
        isHidden: z.boolean().default(false),
    })),
})

export const assignmentFormSchema = z.discriminatedUnion("mode", [
    baseSchema.merge(standardSchema),
    baseSchema.merge(contestSchema)
])

export type AssignmentFormValues = z.infer<typeof assignmentFormSchema>
