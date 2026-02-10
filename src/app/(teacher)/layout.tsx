import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { KnowledgeSidebar } from "@/components/shared/shell/KnowledgeSidebar"

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
    const { userId } = await auth()
    if (!userId) redirect("/sign-in")

    const users = await db.user.findMany({ where: { clerkId: userId } })
    const user = users[0];

    if (!user || (user.role !== "TEACHER" && user.role !== "ADMIN")) {
        console.log("TeacherLayout: Access Denied for role", user?.role)
        redirect("/access-denied?source=teacher_layout&role=" + (user?.role || "none"))
    }

    const userData = {
        name: user.name || "Faculty",
        email: user.email,
        // image: user.imageUrl || undefined // Removed invalid property
    }

    return (
        <div className="min-h-screen bg-background text-foreground font-friendly">
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:wght@400;500;600;700&display=swap');
                .font-friendly { font-family: 'Poppins', sans-serif; }
            `}} />

            <KnowledgeSidebar role="teacher" user={userData} />

            <main className="pl-64 min-h-screen">
                {children}
            </main>
        </div>
    );
}
