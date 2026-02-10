import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';

export function useRealtime(tableName: string, queryKey: string[]) {
    const queryClient = useQueryClient();

    useEffect(() => {
        const channel = supabase
            .channel(`public:${tableName}`)
            .on(
                'postgres_changes' as any,
                { event: '*', schema: 'public', table: tableName } as any,
                (payload: any) => {
                    console.log(`Realtime update from ${tableName}:`, payload);
                    // INSTANT REFRESH: Invalidate the specific query key
                    queryClient.invalidateQueries({ queryKey });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel as any);
        };
    }, [tableName, queryKey, queryClient]);
}
