"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Medal, User } from "lucide-react"
import Pusher from "pusher-js"

interface LeaderboardUser {
    id: string
    name: string | null
    xp: number
}

export function LeaderboardClient({ initialData }: { initialData: LeaderboardUser[] }) {
    const [users, setUsers] = useState(initialData)

    useEffect(() => {
        // Mock Pusher setup - In real app, put keys in env
        // const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
        //     cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        // });

        // const channel = pusher.subscribe("leaderboard");
        // channel.bind("update", (data: any) => {
        //    // logic to merge or re-fetch
        //    // setUsers(newData)
        // });

        // return () => {
        //     pusher.unsubscribe("leaderboard");
        // };
    }, [])

    return (
        <div className="space-y-4">
            {users.map((user, index) => (
                <div
                    key={user.id}
                    className={`flex items-center justify-between p-4 rounded-xl border ${index === 0 ? "bg-yellow-500/10 border-yellow-500/50" :
                            index === 1 ? "bg-zinc-800/50 border-zinc-700" :
                                index === 2 ? "bg-orange-500/10 border-orange-500/50" :
                                    "bg-zinc-900 border-zinc-800"
                        }`}
                >
                    <div className="flex items-center gap-4">
                        <div className={`h-8 w-8 flex items-center justify-center font-bold rounded-lg ${index === 0 ? "bg-yellow-500 text-black" :
                                index === 1 ? "bg-zinc-400 text-black" :
                                    index === 2 ? "bg-orange-600 text-white" :
                                        "bg-zinc-800 text-zinc-500"
                            }`}>
                            {index + 1}
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-zinc-800 rounded-full flex items-center justify-center">
                                <User className="text-zinc-400 h-5 w-5" />
                            </div>
                            <div>
                                <h3 className={`font-semibold ${index === 0 ? "text-yellow-500" : "text-white"
                                    }`}>
                                    {user.name || "Anonymous Student"}
                                </h3>
                                <p className="text-xs text-zinc-500">Batch 2026</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Trophy className={`h-4 w-4 ${index === 0 ? "text-yellow-500" : "text-zinc-600"
                            }`} />
                        <span className="font-mono font-bold text-zinc-200">{user.xp} XP</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
