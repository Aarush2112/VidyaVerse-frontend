"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera, Mic, Monitor, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import { useExamStore } from "@/lib/store/useExamStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function ProctorLobby() {
    const {
        isCameraReady, isMicReady, isScreenReady,
        setHardwareStatus, setStreams, setStatus
    } = useExamStore();

    const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

    // 1. Request Camera & Mic
    const requestMedia = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStreams('media', stream);
            setHardwareStatus('camera', true);
            setHardwareStatus('mic', true);

            if (videoRef) {
                videoRef.srcObject = stream;
            }
            toast.success("Camera & Microphone connected.");
        } catch (err) {
            console.error(err);
            toast.error("Permission denied. Please allow access to Camera & Microphone.");
        }
    };

    // 2. Request Screen Share
    const requestScreen = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            setStreams('screen', stream);
            setHardwareStatus('screen', true);

            // Handle if user stops sharing via browser UI
            stream.getVideoTracks()[0].onended = () => {
                setHardwareStatus('screen', false);
                setStreams('screen', null);
                toast.error("Screen sharing verification failed.");
            };

            toast.success("Screen sharing verified.");
        } catch (err) {
            console.error(err);
            toast.error("Screen sharing permission denied.");
        }
    };

    const allReady = isCameraReady && isMicReady && isScreenReady;

    return (
        <div className="min-h-screen bg-[#F3F4F6] flex flex-col items-center justify-center p-4 font-friendly">
            <motion.div
                className="max-w-2xl w-full bg-white rounded-[32px] p-8 md:p-12 shadow-soft-xl border border-slate-100 text-center"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                {/* Hero Icon */}
                <div className="h-20 w-20 bg-violet-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck size={40} className="text-violet-600" />
                </div>

                <h1 className="text-3xl font-bold text-slate-900 mb-2">System Compatibility Check</h1>
                <p className="text-slate-500 mb-10 max-w-lg mx-auto">
                    To ensure exam integrity, we need to verify your hardware permissions. This exam is proctored.
                </p>

                {/* Webcam Preview */}
                <div className="relative h-48 w-64 bg-slate-900 rounded-2xl mx-auto mb-8 overflow-hidden shadow-inner flex items-center justify-center">
                    {isCameraReady ? (
                        <video
                            ref={(ref) => {
                                if (ref && !ref.srcObject && useExamStore.getState().mediaStream) {
                                    ref.srcObject = useExamStore.getState().mediaStream;
                                }
                                setVideoRef(ref);
                            }}
                            autoPlay
                            muted
                            playsInline
                            className="h-full w-full object-cover transform scale-x-[-1]"
                        />
                    ) : (
                        <Camera size={32} className="text-slate-700" />
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-bold bg-black/50 text-white backdrop-blur-md flex items-center gap-1">
                        <div className={cn("h-1.5 w-1.5 rounded-full", isCameraReady ? "bg-emerald-500" : "bg-red-500")} />
                        {isCameraReady ? "LIVE" : "OFFLINE"}
                    </div>
                </div>

                {/* Check List */}
                <div className="space-y-4 max-w-md mx-auto mb-10">
                    <CheckItem
                        icon={<Camera size={20} />}
                        label="Webcam Access"
                        status={isCameraReady}
                        onClick={requestMedia}
                    />
                    <CheckItem
                        icon={<Mic size={20} />}
                        label="Microphone Access"
                        status={isMicReady}
                        onClick={requestMedia} // Single prompt usually handles both
                    />
                    <CheckItem
                        icon={<Monitor size={20} />}
                        label="Screen Sharing (Entire Screen)"
                        status={isScreenReady}
                        onClick={requestScreen}
                    />
                </div>

                {/* Action */}
                <div className="flex justify-center">
                    <Button
                        size="lg"
                        className={cn(
                            "rounded-full font-bold px-8 h-12 transition-all",
                            allReady
                                ? "bg-violet-600 hover:bg-violet-700 shadow-violet-500/25 shadow-lg"
                                : "bg-slate-100 text-slate-400 cursor-not-allowed"
                        )}
                        disabled={!allReady}
                        onClick={() => setStatus('IN_PROGRESS')}
                    >
                        {allReady ? "Enter Exam Arena" : "Complete Checks to Start"}
                    </Button>
                </div>

            </motion.div>
        </div>
    );
}

function CheckItem({ icon, label, status, onClick }: any) {
    return (
        <div
            className={cn(
                "flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer hover:bg-slate-50",
                status ? "bg-emerald-50/50 border-emerald-100" : "bg-white border-slate-100"
            )}
            onClick={!status ? onClick : undefined}
        >
            <div className="flex items-center gap-4">
                <div className={cn("h-10 w-10 rounded-full flex items-center justify-center", status ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500")}>
                    {icon}
                </div>
                <div className="text-left">
                    <div className={cn("font-bold text-sm", status ? "text-emerald-900" : "text-slate-900")}>{label}</div>
                    <div className="text-xs text-slate-400 capitalize">{status ? "Connected" : "Not Detected"}</div>
                </div>
            </div>
            <div>
                {status ? <CheckCircle2 size={20} className="text-emerald-500" /> : <AlertTriangle size={20} className="text-amber-400" />}
            </div>
        </div>
    )
}
