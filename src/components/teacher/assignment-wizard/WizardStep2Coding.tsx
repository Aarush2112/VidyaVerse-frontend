"use client"

import { useWizard } from "./context"
import { useFieldArray } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Code2 } from "lucide-react"

export function WizardStep2Coding() {
    const { form } = useWizard()
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "testCases"
    })

    return (
        <Card className="bg-slate-900 border-slate-800 animate-in fade-in slide-in-from-right-4 duration-500">
            <CardHeader>
                <CardTitle className="text-white">Step 2: Coding Engine</CardTitle>
                <CardDescription className="text-slate-400">Configure languages and test cases.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Languages */}
                <div className="space-y-2">
                    <Label className="text-slate-300 mb-2 block">Allowed Languages</Label>
                    <div className="flex flex-wrap gap-4">
                        {["javascript", "python", "cpp", "java"].map((lang) => (
                            <label key={lang} className="flex items-center space-x-2 border border-slate-700 p-3 rounded cursor-pointer hover:bg-slate-800 transition">
                                <input
                                    type="checkbox"
                                    value={lang}
                                    {...form.register("allowedLanguages")}
                                    className="w-4 h-4 bg-slate-900 border-slate-600 rounded"
                                />
                                <span className="capitalize text-slate-200">{lang}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Test Cases */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label className="text-slate-300 text-lg flex items-center">
                            <Code2 className="mr-2 h-4 w-4 text-indigo-400" /> Test Cases
                        </Label>
                        <Button type="button" size="sm" onClick={() => append({ input: "", output: "", isHidden: false, points: 10 })} variant="secondary">
                            <Plus className="h-4 w-4 mr-2" /> Add Case
                        </Button>
                    </div>

                    {fields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-12 gap-4 items-start bg-slate-950/50 p-4 rounded border border-slate-800">
                            <div className="col-span-12 md:col-span-5 space-y-1">
                                <Label className="text-xs text-slate-500">Input (stdin)</Label>
                                <Textarea {...form.register(`testCases.${index}.input`)} className="h-20 bg-slate-900 border-slate-700 font-mono text-xs" placeholder="Hello" />
                            </div>
                            <div className="col-span-12 md:col-span-5 space-y-1">
                                <Label className="text-xs text-slate-500">Expected Output (stdout)</Label>
                                <Textarea {...form.register(`testCases.${index}.output`)} className="h-20 bg-slate-900 border-slate-700 font-mono text-xs" placeholder="Hello World" />
                            </div>
                            <div className="col-span-12 md:col-span-2 flex flex-col gap-3 pt-6">
                                <label className="flex items-center text-xs text-slate-400 cursor-pointer">
                                    <input type="checkbox" {...form.register(`testCases.${index}.isHidden`)} className="mr-2 rounded border-slate-700 bg-slate-900" />
                                    Hidden?
                                </label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="number"
                                        {...form.register(`testCases.${index}.points`)}
                                        className="h-8 bg-slate-900 border-slate-700 text-xs w-16"
                                        placeholder="Pts"
                                    />
                                    <Label className="text-xs text-slate-500">Pts</Label>
                                </div>
                                <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} className="h-8 w-8 self-end">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
