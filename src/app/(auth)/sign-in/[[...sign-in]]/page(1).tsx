import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="border border-primary/20 p-8 rounded-xl shadow-2xl shadow-primary/10 bg-card">
                <h1 className="mb-6 text-center text-3xl font-bold text-primary">PoorakVerse Access</h1>
                <SignIn />
            </div>
        </div>
    );
}
