import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export default async function ResultsPage() {
    const user = await currentUser();
    const dbUser = user ? await db.user.findUnique({ where: { clerkId: user.id } }) : null;

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">My Analytics 📊</h1>
                <p className="text-gray-500">Track your learning progress.</p>
            </div>

            {/* Overview Cards */}
            <div className="grid gap-6 md:grid-cols-4">
                <Card className="bg-card border-border shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Total XP</CardTitle>
                        <TrendingUp className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">{dbUser?.xp || 0}</div>
                        <p className="text-xs text-gray-500">Lifelong Score</p>
                    </CardContent>
                </Card>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">Detailed Results Coming Soon</h3>
                <p className="text-gray-500 mt-2">Finish assignments and contests to generate analytics.</p>
            </div>
        </div>
    )
}
