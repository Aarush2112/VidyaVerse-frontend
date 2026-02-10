"use client";

import { useEffect, useState } from "react";
import { getMyRiskStatus } from "@/app/actions/student-actions";
import { AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const RiskAlert = () => {
    const [status, setStatus] = useState<{ isFlagged: boolean; reason?: string } | null>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const fetchStatus = async () => {
            const res = await getMyRiskStatus();
            if (res.success && res.data?.isFlagged) {
                setStatus({ isFlagged: true, reason: res.data.reason || "Academic Concerns" });
            }
        };
        fetchStatus();
    }, []);

    if (!status || !isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 bg-rose-50 border border-rose-100 rounded-[24px] p-4 flex items-start gap-4 relative overflow-hidden"
            >
                <div className="bg-rose-100 p-2 rounded-full text-rose-600 shrink-0">
                    <AlertTriangle size={20} />
                </div>
                <div>
                    <h3 className="text-rose-700 font-bold">Action Required: Academic Intervention Active</h3>
                    <p className="text-rose-600/80 text-sm mt-1">
                        Your professor has flagged your profile due to: <span className="font-bold">{status.reason}</span>.
                        Please schedule a meeting during office hours immediately.
                    </p>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-4 right-4 text-rose-400 hover:text-rose-600 transition-colors"
                >
                    <X size={18} />
                </button>

                {/* Decorative Pattern */}
                <div className="absolute -right-6 -bottom-6 text-rose-100/50 rotate-12">
                    <AlertTriangle size={120} />
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
