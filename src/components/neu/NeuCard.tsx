
import React from 'react';
import { cn } from '@/lib/utils';

interface NeuCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export function NeuCard({ children, className, ...props }: NeuCardProps) {
    return (
        <div
            className={cn(
                "rounded-[30px] bg-[#E0E5EC] shadow-neu-convex p-8 transition-transform hover:-translate-y-2 duration-300",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
