"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Plus } from "lucide-react"

export default function BatchesPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">My Batches</h1>
                    <p className="text-slate-400">Manage student groups and enrollments.</p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Create Batch
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Mock Data */}
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="bg-slate-900 border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center justify-between">
                                <span>Class of 202{5 + i}</span>
                                <Users className="h-4 w-4 text-slate-500" />
                            </CardTitle>
                            <CardDescription className="text-slate-400">Computer Science A</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white mb-2">{40 + i * 5} Students</div>
                            <Button variant="outline" size="sm" className="w-full border-slate-700 text-slate-300">View Details</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
