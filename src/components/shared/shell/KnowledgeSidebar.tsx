"use client"

import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { LayoutDashboard, ClipboardList, Code2, Trophy, Settings } from "lucide-react"

export function KnowledgeSidebar() {
  const { user } = useUser()

  return (
    <aside className="w-64 min-h-screen bg-black text-white p-6 space-y-6">
      <div className="text-xl font-bold">
        VidyaVerse
      </div>

      <div className="text-sm opacity-70">
        {user?.firstName || "Student"}
      </div>

      <nav className="space-y-4 pt-6">
        <Link href="/student/dashboard" className="flex items-center gap-2 hover:text-blue-400">
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link href="/student/assignments" className="flex items-center gap-2 hover:text-blue-400">
          <ClipboardList size={18} />
          Assignments
        </Link>

        <Link href="/student/arena" className="flex items-center gap-2 hover:text-blue-400">
          <Code2 size={18} />
          Arena
        </Link>

        <Link href="/student/leaderboard" className="flex items-center gap-2 hover:text-blue-400">
          <Trophy size={18} />
          Leaderboard
        </Link>

        <Link href="/student/settings" className="flex items-center gap-2 hover:text-blue-400">
          <Settings size={18} />
          Settings
        </Link>
      </nav>
    </aside>
  )
}
