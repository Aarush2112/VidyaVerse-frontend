import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                neu: {
                    base: '#E0E5EC',
                    'text-main': '#4A5568',
                    'text-sub': '#A0AEC0',
                    accent: '#7C3AED',
                    danger: '#EF4444',
                    success: '#10B981',
                }
            },
            boxShadow: {
                // Soft Clay Shadows
                'neu-convex': '9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5)',
                'neu-concave': 'inset 6px 6px 10px 0 rgba(163,177,198, 0.7), inset -6px -6px 10px 0 rgba(255,255,255, 0.8)',
                'neu-pressed': 'inset 3px 3px 7px rgba(163,177,198, 0.7), inset -3px -3px 7px rgba(255,255,255, 0.8)',

                // Keep existing layers if needed for other parts, or override if they conflict.
                // For now, I'll append the specific ones requested.
                'neu-convex-sm': '5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff',
                'neu-convex-md': '9px 9px 16px #a3b1c6, -9px -9px 16px #ffffff',
                'neu-convex-lg': '20px 20px 60px #a3b1c6, -20px -20px 60px #ffffff',
                'neu-concave-sm': 'inset 3px 3px 7px #a3b1c6, -3px -3px 7px #ffffff',
                'neu-concave-md': 'inset 6px 6px 12px #a3b1c6, inset -6px -6px 12px #ffffff',
                'neu-float': '15px 15px 30px #a3b1c6, -15px -15px 30px #ffffff',
            },
            borderRadius: {
                'neu': '30px', // Soft Clay requires super-ellipses
                'neu-sm': '15px',
            },
            transitionTimingFunction: {
                'neu-spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Bouncy feel
            }
        }
    },
    plugins: [],
};

export default config;
