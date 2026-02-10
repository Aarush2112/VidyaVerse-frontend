export default function ExamRoomLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Isolated Layout: No Sidebar, No Header, No Footer.
    // Just a dark canvas to minimize distractions.
    return (
        <div className="min-h-screen bg-[#0B0F19] text-white">
            {children}
        </div>
    );
}
