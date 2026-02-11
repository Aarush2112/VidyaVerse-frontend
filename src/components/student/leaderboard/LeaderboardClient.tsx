"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Crown, Medal } from "lucide-react"

interface LeaderboardUser {
    id: string
    name: string | null
    xp: number
    rank: number
}

export function LeaderboardClient({
    initialUsers,
    label = "XP"
}: {
    initialUsers: LeaderboardUser[],
    label?: string
}) {
    const [users] = useState(initialUsers)

    return (
        <div className="space-y-4">
            {users.map((user, index) => (
                <div
                    key={user.id}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                        index === 0
                            ? "bg-amber-500/10 border-amber-500/50"
                            : index === 1
                            ? "bg-slate-300/10 border-slate-400/50"
                            : index === 2
                            ? "bg-amber-700/10 border-amber-700/50"
                            : "bg-slate-950/50 border-slate-800"
                    }`}
                >
                    <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 font-bold text-slate-400">
                            {index === 0 ? (
                                <Crown className="h-6 w-6 text-amber-500" />
                            ) : index === 1 ? (
                                <Medal className="h-6 w-6 text-slate-300" />
                            ) : index === 2 ? (
                                <Medal className="h-6 w-6 text-amber-700" />
                            ) : (
                                `#${user.rank}`
                            )}
                        </div>

                        <Avatar className="h-10 w-10 border border-slate-700">
                            <AvatarImage
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                            />
                            <AvatarFallback>
                                {user.name?.[0] || "?"}
                            </AvatarFallback>
                        </Avatar>

                        <div>
                            <div className="font-semibold text-white">
                                {user.name || "Anonymous"}
                            </div>
                            <div className="text-xs text-slate-400">
                                Rank #{user.rank}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-indigo-400" />
                        <span className="font-mono font-bold text-indigo-400">
                            {user.xp} {label}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}
