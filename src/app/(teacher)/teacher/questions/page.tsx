"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Database, Plus, Filter } from "lucide-react"

export default function QuestionBankPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Question Bank</h1>
                    <p className="text-slate-400">Repository of coding problems and quizzes.</p>
                </div>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Add Question
                </Button>
            </div>

            <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-lg border border-slate-800">
                <Search className="h-5 w-5 text-slate-500" />
                <Input placeholder="Search by tag, topic, or difficulty..." className="bg-transparent border-none text-white focus-visible:ring-0 placeholder:text-slate-600" />
                <Button variant="ghost" size="icon" className="text-slate-400">
                    <Filter className="h-5 w-5" />
                </Button>
            </div>

            <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-lg bg-slate-900/50">
                <Database className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-300">No questions found</h3>
                <p className="text-slate-500 max-w-sm mx-auto mt-2">Start building your repository by adding your first coding problem or MCQ.</p>
            </div>
        </div>
    )
}
