import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function ForbiddenPage() {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl shadow-rose-900/10">
                <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldAlert size={32} />
                </div>

                <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Access Denied</h1>
                <p className="text-slate-400 mb-8 leading-relaxed">
                    You do not have permission to access the <strong>God Mode</strong> area. This incident has been logged.
                </p>

                <div className="flex flex-col gap-3">
                    <Link
                        href="/"
                        className="w-full py-3 px-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={16} />
                        Return to Safety
                    </Link>

                    <div className="text-[10px] text-slate-600 font-mono mt-4">
                        ERROR_CODE: 403_FORBIDDEN_ADMIN_GATE
                    </div>
                </div>
            </div>
        </div>
    );
}
