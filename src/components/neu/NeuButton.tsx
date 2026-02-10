
import React from 'react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

interface NeuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    variant?: 'primary' | 'secondary' | 'ghost' | 'icon' | 'filled';
}

export const NeuButton = React.forwardRef<HTMLButtonElement, NeuButtonProps>(
    ({ className, variant = "primary", asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";

        const variantStyles = {
            primary: "text-gray-600 hover:text-violet-600",
            secondary: "text-gray-500",
            ghost: "shadow-none hover:shadow-neu-convex bg-transparent",
            filled: "text-white bg-violet-600 shadow-neu-convex hover:bg-violet-700",
            icon: "p-3 w-auto aspect-square flex items-center justify-center rounded-full"
        };

        return (
            <Comp
                className={cn(
                    "w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-200",
                    "shadow-neu-convex",
                    "active:shadow-neu-pressed active:translate-y-[1px]",
                    variantStyles[variant === 'filled' ? 'filled' : variant === 'icon' ? 'icon' : variant] || variantStyles.primary,
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
NeuButton.displayName = "NeuButton";
