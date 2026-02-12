import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="border border-primary/20 p-8 rounded-xl shadow-2xl shadow-primary/10 bg-card w-full max-w-md text-center">
                <h1 className="mb-4 text-2xl font-bold text-primary">Sign up</h1>
                <p className="mb-6 text-muted-foreground">
                    Account creation is managed by your institution. Please sign in with your existing account or contact your admin.
                </p>
                <Link href="/sign-in">
                    <Button variant="default" className="w-full">Go to Sign in</Button>
                </Link>
            </div>
        </div>
    );
}
