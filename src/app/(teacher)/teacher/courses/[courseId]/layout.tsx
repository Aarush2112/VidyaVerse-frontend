export default function CourseStudioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex-1 flex flex-col h-full bg-[#f8f9fc]">
            {children}
        </div>
    );
}
