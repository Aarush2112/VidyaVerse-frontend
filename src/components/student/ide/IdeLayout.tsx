import React from "react";
import {
    Panel,
    PanelGroup,
    PanelResizeHandle
} from "react-resizable-panels";
import { cn } from "@/lib/utils";

interface IdeLayoutProps {
    header: React.ReactNode;
    problemPane: React.ReactNode;
    editorPane: React.ReactNode;
    terminalPane: React.ReactNode;
    footer?: React.ReactNode;
}

export function IdeLayout({
    header,
    problemPane,
    editorPane,
    terminalPane,
    footer
}: IdeLayoutProps) {
    return (
        <div className="h-screen w-full bg-neu-base flex flex-col overflow-hidden font-sans selection:bg-neu-accent selection:text-white">
            {/* Header Area - Floating/Soft */}
            <header className="h-20 flex-shrink-0 z-50 px-6 flex items-center">
                <div className="w-full h-14 bg-neu-base rounded-[2rem] shadow-neu-convex-sm flex items-center px-2">
                    {header}
                </div>
            </header>

            {/* Main Workspace */}
            <main className="flex-1 overflow-hidden px-6 pb-6 pt-2 flex gap-6">
                <div className="flex-1 h-full min-w-0">
                    <PanelGroup direction="horizontal">
                        {/* Left Panel: Problem Description */}
                        <Panel defaultSize={25} minSize={15} className="bg-neu-base rounded-[2rem] shadow-neu-convex-md border border-neu-text-sub/5 flex flex-col overflow-hidden">
                            <div className="flex-1 overflow-y-auto no-scrollbar p-1">
                                {problemPane}
                            </div>
                        </Panel>

                        <PanelResizeHandle className="w-6 flex items-center justify-center group outline-none">
                            <div className="h-12 w-1.5 bg-neu-base shadow-neu-convex-sm rounded-full group-hover:bg-slate-300 transition-all duration-300" />
                        </PanelResizeHandle>

                        {/* Middle Panel Area: Editor & Terminal */}
                        <Panel defaultSize={75}>
                            <PanelGroup direction="vertical">
                                {/* Editor */}
                                <Panel defaultSize={70} minSize={30} className="bg-neu-base rounded-[2rem] shadow-neu-convex-md border border-neu-text-sub/5 relative overflow-hidden flex flex-col">
                                    {editorPane}
                                </Panel>

                                <PanelResizeHandle className="h-6 flex items-center justify-center group outline-none">
                                    <div className="w-12 h-1.5 bg-neu-base shadow-neu-convex-sm rounded-full group-hover:bg-slate-300 transition-all duration-300" />
                                </PanelResizeHandle>

                                {/* Terminal/Console */}
                                <Panel defaultSize={30} minSize={10} className="bg-neu-base rounded-[2rem] shadow-neu-convex-md border border-neu-text-sub/5 overflow-hidden flex flex-col">
                                    {terminalPane}
                                </Panel>
                            </PanelGroup>
                        </Panel>
                    </PanelGroup>
                </div>
            </main>

            {/* Footer / Gamification Pill */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
                <div className="h-10 px-6 bg-neu-base rounded-full shadow-neu-float flex items-center gap-6 border border-white/5">
                    <span className="text-[10px] font-bold text-neu-text-sub uppercase tracking-widest">Gamification info</span>

                    {/* Progress Bar Visual */}
                    <div className="w-24 h-1.5 bg-neu-text-sub/10 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-neu-accent rounded-full shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
                    </div>

                    <span className="text-[10px] font-bold text-neu-text-main uppercase tracking-widest">
                        XP: 1200 <span className="text-neu-text-sub ml-1">(Rank #42)</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
