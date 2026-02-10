"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

interface HolographicCardProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: string; // Hex color for hover glow
}

export const HolographicCard = ({
    children,
    className = "",
    glowColor = "#22d3ee" // Default Cyan
}: HolographicCardProps) => {

    // Tilt Logic (Simplified 3D Tilt)
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5; // Max -5deg tilt
        const rotateY = ((x - centerX) / centerX) * 5;  // Max 5deg tilt

        setRotation({ x: rotateX, y: rotateY });
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
        setOpacity(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            }}
            className={`
                relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md 
                shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] overflow-hidden transition-transform duration-200 ease-out will-change-transform
                hover:border-white/20 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]
                ${className}
            `}
        >
            {/* Gradient Border Glow Container (Pseudo-element substitute) */}
            <div
                className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-white/10 to-transparent pointer-events-none"
                style={{
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                }}
            />

            {/* Dynamic Glow Spotlight */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                    background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}15, transparent 40%)`,
                    opacity: opacity,
                }}
            />

            {/* Content Buffer */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>

            {/* Scanline Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0" />
        </motion.div>
    );
}

// Helper to inject mouse coordinates for CSS variables
function useMousePosition(ref: React.RefObject<HTMLElement>) {
    // Note: Implementation simpler inside component for now
}
