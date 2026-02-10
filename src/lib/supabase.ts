import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client;

if (supabaseUrl && supabaseKey) {
    client = createClient(supabaseUrl, supabaseKey);
} else {
    console.warn("⚠️ Supabase credentials missing. Realtime features will be disabled.");
    // Mock client to prevent runtime crash in development
    const mockChannel = {
        on: () => mockChannel,
        subscribe: () => mockChannel,
        unsubscribe: () => Promise.resolve('ok'),
        send: () => Promise.resolve('ok'),
    };

    client = {
        channel: () => mockChannel,
        removeChannel: () => { },
        from: () => ({
            select: () => Promise.resolve({ data: [], error: null }),
            insert: () => Promise.resolve({ data: [], error: null }),
            // Add other methods as needed if used elsewhere
        })
    };
}

export const supabase = client;
