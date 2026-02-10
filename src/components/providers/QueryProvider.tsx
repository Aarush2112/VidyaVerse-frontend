"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                // Prevent automatic refetching on window focus for now to avoid redundant calls
                // We will drive updates via Supabase Realtime
                refetchOnWindowFocus: false,
                staleTime: 1000 * 60 * 5, // 5 minutes
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
