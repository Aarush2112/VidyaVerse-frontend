import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const POLL_INTERVAL_MS = 20_000; // 20s – data refreshed via query invalidation

/**
 * Keeps the given query key fresh by invalidating it on an interval.
 * Replaces former Supabase realtime; all data is loaded via backend (actions/APIs).
 */
export function useRealtime(tableName: string, queryKey: string[]) {
    const queryClient = useQueryClient();

    useEffect(() => {
        const interval = setInterval(() => {
            queryClient.invalidateQueries({ queryKey });
        }, POLL_INTERVAL_MS);

        return () => clearInterval(interval);
    }, [tableName, queryKey, queryClient]);
}
