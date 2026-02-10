import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface NeuInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: LucideIcon;
    error?: boolean;
}

const NeuInput = React.forwardRef<HTMLInputElement, NeuInputProps>(
    ({ className, icon: Icon, error, ...props }, ref) => {
        return (
            <div className="relative w-full group">
                {Icon && (
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-neu-text-sub group-focus-within:text-neu-accent transition-colors">
                        <Icon size={20} />
                    </div>
                )}
                <input
                    ref={ref}
                    className={cn(
                        "w-full h-14 rounded-neu-sm bg-neu-base text-neu-text-main placeholder-neu-text-sub px-6 outline-none transition-all",
                        "shadow-neu-concave-md border border-transparent",
                        "focus:ring-2 focus:ring-neu-accent/20 focus:border-neu-accent/10 focus:shadow-neu-concave-sm",
                        error && "ring-2 ring-neu-danger/20 border-neu-danger/10 text-neu-danger shadow-neu-concave-sm",
                        Icon && "pl-14",
                        className
                    )}
                    {...props}
                />
            </div>
        );
    }
);

NeuInput.displayName = "NeuInput";

export { NeuInput };
