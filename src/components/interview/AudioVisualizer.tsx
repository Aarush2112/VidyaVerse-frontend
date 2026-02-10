"use client";

import React, { useRef, useEffect } from 'react';

interface AudioVisualizerProps {
    onData?: (data: Uint8Array) => void;
    isActive?: boolean;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isActive = false }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // This component primarily renders the visual effect. 
        // The actual audio data processing might happen in the hook 
        // and passed down, or we can expose a method to feed data.
        // For the "Sentient Orb" effect, we'll create a WebGL-like 2D context animation.

        // For now, let's implement the 'pulsing' effect based on `isActive` 
        // or if we receive data props later.
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let time = 0;

        const draw = () => {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Base Radius
            const baseRadius = 50 + Math.sin(time) * 5;
            const activeRadius = isActive ? baseRadius * 1.5 + Math.random() * 10 : baseRadius;

            // Gradient
            const gradient = ctx.createRadialGradient(centerX, centerY, activeRadius * 0.2, centerX, centerY, activeRadius);
            gradient.addColorStop(0, isActive ? '#A855F7' : '#0EA5E9'); // Purple when active, Sky Blue when idle
            gradient.addColorStop(0.6, isActive ? '#7E22CE' : '#0284C7');
            gradient.addColorStop(1, 'transparent');

            ctx.beginPath();
            ctx.arc(centerX, centerY, activeRadius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Glow (Simulated)
            if (isActive) {
                ctx.shadowBlur = 30;
                ctx.shadowColor = '#A855F7';
            } else {
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#0EA5E9';
            }

            time += 0.05;
            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [isActive]);

    return (
        <div className="relative flex items-center justify-center w-64 h-64">
            <canvas ref={canvasRef} width={300} height={300} className="w-full h-full" />
        </div>
    );
};
