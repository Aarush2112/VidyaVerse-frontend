"use server";

import { db } from "@/lib/db";
import { subHours, subMinutes, format } from "date-fns";

// --- TYPES ---
export interface HealthMetrics {
    dbStatus: 'UP' | 'DOWN' | 'DEGRADED';
    latency: number; // ms
    memory: string; // MB
    cpu: number; // %
    errorRate: number; // %
    activeRequests: number;
}

// --- CHECKS ---

export async function checkSystemHealth(): Promise<HealthMetrics> {
    const start = performance.now();
    let dbStatus: 'UP' | 'DOWN' | 'DEGRADED' = 'UP';

    // 1. DB Latency Check
    try {
        await db.$queryRaw`SELECT 1`;
    } catch (e) {
        console.error("Health Check Failed:", e);
        dbStatus = 'DOWN';
    }
    const latency = Math.round(performance.now() - start);

    // 2. Memory / CPU (Mocked for Node environment in Vercel/Serverless where process.cpuUsage is tricky)
    // We use process.memoryUsage for real data where possible.
    const memoryData = process.memoryUsage();
    const memoryUsedMB = Math.round(memoryData.heapUsed / 1024 / 1024);

    // Mocking active requests / error rate for the visual demo as these require middleware tracking
    const activeRequests = Math.floor(Math.random() * 150) + 50;
    const errorRate = Math.random() < 0.05 ? Math.random() * 2 : 0; // Occasionally spike

    // Persist snapshot to DB for history graph
    if (dbStatus === 'UP') {
        // We don't want to block the UI response with the write
        // In a real app, this might go to a queue or be fire-and-forget
        try {
            await db.systemHealthSnapshot.create({
                data: {
                    cpuLoad: Math.random() * 30 + 10, // Mock CPU
                    memoryUsage: (memoryUsedMB / 2048) * 100, // Assuming 2GB container
                    databaseLatencyMs: latency,
                    activeRequests,
                    errorRate
                }
            });
        } catch (err) {
            console.error("Failed to save health snapshot", err);
        }
    }

    return {
        dbStatus,
        latency,
        memory: `${memoryUsedMB} MB`,
        cpu: Math.round(Math.random() * 30 + 10),
        errorRate: Number(errorRate.toFixed(2)),
        activeRequests
    };
}

export async function getMetricsHistory(range: '1h' | '24h') {
    // Determine cutoff
    const cutoff = range === '1h'
        ? subHours(new Date(), 1)
        : subHours(new Date(), 24);

    const snapshots = await db.systemHealthSnapshot.findMany({
        where: {
            timestamp: {
                gte: cutoff
            }
        },
        orderBy: { timestamp: 'asc' },
        take: 100 // Cap for performance
    });

    return snapshots.map(s => ({
        time: format(s.timestamp, "HH:mm"),
        latency: s.databaseLatencyMs,
        errors: s.errorRate
    }));
}

export async function getRecentLogs() {
    // Mocking logs for the UI as we don't have a real centralized log store hooked up in this schema yet
    // In production, this would query ServiceStatusLog or ErrorLog

    // Let's fetch real ErrorLogs if any, mixed with mock functional logs
    const dbErrors = await db.errorLog.findMany({
        take: 10,
        orderBy: { timestamp: 'desc' }
    });

    const mockLogs = [
        { level: "INFO", msg: "User login verified (Auth0)", time: new Date() },
        { level: "INFO", msg: "Transcode job completed: asset_83j", time: subMinutes(new Date(), 1) },
        { level: "WARN", msg: "High memory pressure on worker-01", time: subMinutes(new Date(), 2) },
        { level: "INFO", msg: "Cache refreshed: /api/courses", time: subMinutes(new Date(), 5) },
    ];

    // Combine and sort
    const combined = [
        ...dbErrors.map(e => ({ level: e.severity, msg: e.errorMessage, time: e.timestamp })),
        ...mockLogs
    ].sort((a, b) => b.time.getTime() - a.time.getTime());

    return combined;
}

export async function seedHealthData() {
    // Safety check for caching issues
    if (!(db as any).systemHealthSnapshot) {
        console.warn("SystemHealthSnapshot model not found on Prisma Client. Skipping seed.");
        return;
    }

    const count = await db.systemHealthSnapshot.count();
    if (count > 10) return; // Don't over-seed

    console.log("Seeding Health Data...");

    // Generate 24 hours of data points (one every 30 mins)
    const points = [];
    for (let i = 0; i < 48; i++) {
        points.push({
            timestamp: subMinutes(new Date(), i * 30),
            cpuLoad: Math.random() * 40 + 10,
            memoryUsage: Math.random() * 60 + 20,
            databaseLatencyMs: Math.random() * 80 + 20,
            activeRequests: Math.floor(Math.random() * 500) + 100,
            errorRate: Math.random() > 0.9 ? Math.random() * 5 : 0 // Occasional spikes
        });
    }

    await db.systemHealthSnapshot.createMany({
        data: points
    });

    return { success: true };
}
