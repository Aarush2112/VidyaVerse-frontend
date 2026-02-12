import { KnowledgeSidebar } from "@/components/shared/shell/KnowledgeSidebar"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <KnowledgeSidebar />
      <main className="flex-1">{children}</main>
    </div>
  )
}
