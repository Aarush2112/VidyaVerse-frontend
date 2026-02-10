import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { KnowledgeSidebar } from "@/components/shared/shell/KnowledgeSidebar"

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
    const { userId } = await auth()
    if (!userId) redirect("/sign-in")

    const user = await db.user.findUnique({ where: { clerkId: userId } })
    if (!user) {
        redirect("/sign-in")
    }

    if (user.role !== "STUDENT" && user.role !== "ADMIN") {
        redirect("/access-denied?source=student_layout&role=" + user.role)
    }

    const userData = {
        name: user.name || "Student",
        email: user.email,
        // image: user.imageUrl || undefined // Removed invalid property
    }

    return (
        <div className="min-h-screen bg-background text-foreground font-friendly">
            <KnowledgeSidebar role="student" user={userData} />

            {/* Main Content Area - Padded for Sidebar */}
            <main className="pl-64 min-h-screen">
                {children}
            </main>
        </div>
    );
}
