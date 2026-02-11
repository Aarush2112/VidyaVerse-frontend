import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { KnowledgeSidebar } from "@/components/shared/shell/KnowledgeSidebar"

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="flex">
      <KnowledgeSidebar />
      <main className="flex-1">{children}</main>
    </div>
  )
}
