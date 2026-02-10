"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { toast } from "sonner";
import { Maximize2, AlertTriangle, Monitor, Mic, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadEvidence } from "@/app/actions/proctor";

interface ProctorGuardProps {
    examId: string;
    onViolation?: (type: "TAB_SWITCH" | "FULLSCREEN_EXIT" | "COPY_PASTE") => void;
    onReady?: () => void;
    onTerminate?: () => void;
    strictMode?: boolean;
}

const ProctorGuard: React.FC<ProctorGuardProps> = ({ examId, onViolation, onReady, onTerminate, strictMode = true }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isSetupComplete, setIsSetupComplete] = useState(false);
    const [warnings, setWarnings] = useState(0);

    const videoRef = useRef<HTMLVideoElement>(null);
    const screenRef = useRef<HTMLVideoElement>(null);

    // Canvas refs for snapshot capture
    const webcamCanvasRef = useRef<HTMLCanvasElement>(null);
    const screenCanvasRef = useRef<HTMLCanvasElement>(null);

    const reportViolation = useCallback(
        (type: "TAB_SWITCH" | "FULLSCREEN_EXIT" | "COPY_PASTE") => {
            setWarnings((prev) => prev + 1);
            toast.error(`Violation Detected: ${type}`, {
                description: "This action has been logged completely.",
            });
            if (onViolation) {
                onViolation(type);
            }
        },
        [onViolation]
    );

    const requestFullscreen = async () => {
        try {
            if (document.documentElement.requestFullscreen) {
                await document.documentElement.requestFullscreen();
            }
        } catch (err) {
            console.error("Fullscreen denial:", err);
            toast.error("Could not enter fullscreen mode.");
        }
    };

    const startProctoring = async () => {
        try {
            // 1. Request Camera & Mic
            const webcamStream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 }, audio: true });
            if (videoRef.current) {
                videoRef.current.srcObject = webcamStream;
            }

            // 2. Request Screen Share
            // @ts-ignore - getDisplayMedia exists
            const screenStream = await navigator.mediaDevices.getDisplayMedia({
                // @ts-ignore - cursor property
                video: { cursor: "always" },
                audio: false
            });

            if (screenRef.current) {
                screenRef.current.srcObject = screenStream;
            }

            // Handle Screen Share Stop (User clicks "Stop Sharing")
            screenStream.getVideoTracks()[0].onended = () => {
                toast.error("Screen sharing stopped. Violation Recorded.");
                reportViolation("FULLSCREEN_EXIT"); // Treat as exit/interruption
            };

            setIsSetupComplete(true);
            if (onReady) onReady();

            // Auto-enter fullscreen after setup represents "start"
            requestFullscreen();

        } catch (err) {
            console.error("Proctoring setup failed", err);
            toast.error("Failed to access camera, mic, or screen. Please allow all permissions.");
        }
    };

    // Snapshot loop (only runs when setup is complete)
    useEffect(() => {
        if (!isSetupComplete) return;

        const interval = setInterval(async () => {
            try {
                // Capture Webcam
                let webcamSnapshot = null;
                if (videoRef.current && webcamCanvasRef.current) {
                    const context = webcamCanvasRef.current.getContext("2d");
                    if (context) {
                        context.drawImage(videoRef.current, 0, 0, 320, 240);
                        webcamSnapshot = webcamCanvasRef.current.toDataURL("image/jpeg", 0.4); // Slightly lower quality for high frequency
                    }
                }

                // Capture Screen
                let screenSnapshot = null;
                if (screenRef.current && screenCanvasRef.current) {
                    const context = screenCanvasRef.current.getContext("2d");
                    if (context) {
                        context.drawImage(screenRef.current, 0, 0, 320, 240);
                        screenSnapshot = screenCanvasRef.current.toDataURL("image/jpeg", 0.4);
                    }
                }

                if (webcamSnapshot || screenSnapshot) {
                    uploadEvidence(examId, screenSnapshot, webcamSnapshot)
                        .catch(err => console.error("Upload failed", err));
                }
            } catch (err) {
                console.error("Proctoring snapshot error:", err);
            }

        }, 1500); // 1.5 seconds for true "Live" feel

        return () => clearInterval(interval);
    }, [isSetupComplete, examId]);

    // Violation Monitoring (Visibility, Blur, Fullscreen)
    useEffect(() => {
        if (!isSetupComplete) return;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                reportViolation("TAB_SWITCH");
            }
        };

        const handleBlur = () => {
            reportViolation("TAB_SWITCH");
        };

        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                setIsFullscreen(false);
                reportViolation("FULLSCREEN_EXIT");
            } else {
                setIsFullscreen(true);
            }
        };

        const preventDefault = (e: Event) => {
            if (strictMode) {
                e.preventDefault();
                reportViolation("COPY_PASTE");
            }
        };

        const preventContextMenu = (e: MouseEvent) => {
            if (strictMode) {
                e.preventDefault();
            }
        }

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("blur", handleBlur);
        document.addEventListener("fullscreenchange", handleFullscreenChange);

        if (strictMode) {
            document.addEventListener("copy", preventDefault);
            document.addEventListener("cut", preventDefault);
            document.addEventListener("paste", preventDefault);
            document.addEventListener("contextmenu", preventContextMenu);
        }

        if (document.fullscreenElement) {
            setIsFullscreen(true);
        }

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("blur", handleBlur);
            document.removeEventListener("fullscreenchange", handleFullscreenChange);

            if (strictMode) {
                document.removeEventListener("copy", preventDefault);
                document.removeEventListener("cut", preventDefault);
                document.removeEventListener("paste", preventDefault);
                document.removeEventListener("contextmenu", preventContextMenu);
            }
        };
    }, [isSetupComplete, reportViolation, strictMode]);

    // Setup UI
    if (!isSetupComplete) {
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0F19] p-4 text-center">
                <div className="max-w-md space-y-6 rounded-xl border border-blue-500/20 bg-[#151b2b] p-8 shadow-2xl">
                    <div className="flex justify-center">
                        <div className="h-20 w-20 rounded-full bg-blue-500/10 flex items-center justify-center animate-pulse">
                            <Monitor className="h-10 w-10 text-blue-400" />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Proctoring Setup</h2>
                        <p className="text-slate-400 text-sm">
                            To enter the exam environment, you must enable your camera, microphone, and screen sharing.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-xs text-slate-400 py-4 border-y border-white/5">
                        <div className="flex flex-col items-center gap-2">
                            <Video className="h-6 w-6 text-emerald-400" />
                            <span>Webcam</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Mic className="h-6 w-6 text-emerald-400" />
                            <span>Microphone</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Monitor className="h-6 w-6 text-emerald-400" />
                            <span>Screen</span>
                        </div>
                    </div>

                    <Button
                        onClick={startProctoring}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-lg"
                    >
                        Start Proctoring Session
                    </Button>
                </div>
            </div>
        );
    }

    // Fullscreen Blocking UI
    if (!isFullscreen) {
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm p-4 text-center">
                <div className="max-w-md space-y-4 rounded-xl border border-destructive/50 bg-destructive/10 p-8 shadow-2xl">
                    <AlertTriangle className="mx-auto h-12 w-12 text-destructive animate-pulse" />
                    <h2 className="text-2xl font-bold text-destructive">Proctoring Interrupted</h2>
                    <p className="text-muted-foreground">
                        Please return to FULLSCREEN mode to continue your assessment.
                    </p>
                    <Button
                        onClick={requestFullscreen}
                        className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        <Maximize2 className="mr-2 h-4 w-4" />
                        Enter Fullscreen
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed top-0 right-0 m-4 z-50 pointer-events-none">
            <div className="bg-destructive/10 text-destructive border border-destructive/20 rounded-full px-4 py-1 text-xs font-mono font-bold backdrop-blur-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                LIVE MONITORED
            </div>
            {/* Hidden Video Elements for Capture */}
            <div className="opacity-0 absolute pointer-events-none">
                {/* Webcam */}
                <video ref={videoRef} autoPlay playsInline muted width={320} height={240} />
                <canvas ref={webcamCanvasRef} width={320} height={240} />

                {/* Screen */}
                <video ref={screenRef} autoPlay playsInline muted width={320} height={240} />
                <canvas ref={screenCanvasRef} width={320} height={240} />
            </div>
        </div>
    );
};

export default ProctorGuard;
