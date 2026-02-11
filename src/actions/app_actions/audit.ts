"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { subDays, subHours, subMinutes } from "date-fns";

// --- TYPES ---

export type AuditActionType =
    | 'CREATE'
    | 'UPDATE'
    | 'DELETE'
    | 'LOGIN'
    | 'LOGOUT'
    | 'PERMISSION_CHANGE'
    | 'SENSITIVE_VIEW'
    | 'USER_BANNED'
    | 'COURSE_DELETED'
    | 'GRADE_OVERRIDE'
    | 'ROLE_UPDATED'
    | 'SYSTEM_CONFIG_CHANGED'
    | 'ADMIN_IMPERSONATION'
    | 'USER_WIPEOUT';

export type AuditSeverityType = 'INFO' | 'WARNING' | 'CRITICAL';

interface LogEventParams {
    action: AuditActionType;
    resourceType: string;
    resourceId?: string;
    changes?: Record<string, any>;
    metadata?: Record<string, any>;
    severity?: AuditSeverityType;
}

// --- RECORDER ---

/**
 * Fire-and-forget logger.
 * In production, this might write to a queue (Kafka/SQS).
 */
export async function logEvent(params: LogEventParams) {
    try {
        const { userId, sessionClaims } = await auth();
        // Fallback for system actions or unidentified users
        const actorId = userId || "system";
        const actorEmail = (sessionClaims?.email as string) || "system@lms.hq";

        // We can't easily get request details (IP, UA) in a Server Action without headers()
        // For simplicity in this demo, we mock or omit them if not passed explicitly.
        // In a real app, middleware would pass these contexts.
        const ipAddress = "127.0.0.1";
        const userAgent = "Mozilla/5.0 (Server Action)";

        // Safety check if user exists in our DB (foreign key constraint)
        const userExists = await db.user.findUnique({ where: { clerkId: actorId } });

        // If user doesn't exist (e.g. system), we might need a fallback 'System User' in DB
        // For this demo, we assume the admin exists.

        if (userExists) {
            await db.auditEvent.create({
                data: {
                    action: params.action,
                    resourceType: params.resourceType,
                    resourceId: params.resourceId,
                    changes: params.changes || Prisma.JsonNull,
                    metadata: params.metadata || Prisma.JsonNull,
                    severity: params.severity || 'INFO',
                    actorId: userExists.id,
                    actorEmail: userExists.email,
                    ipAddress,
                    userAgent
                }
            });
        }
    } catch (error) {
        console.error("Failed to log audit event:", error);
        // We generally don't want to crash the main thread if logging fails
    }
}

// --- FETCHER ---

export async function fetchAuditLogs(
    page = 1,
    limit = 50,
    filters?: { severity?: string, action?: string, search?: string }
) {
    const skip = (page - 1) * limit;

    const where: Prisma.AuditEventWhereInput = {};

    if (filters?.severity && filters.severity !== 'ALL') {
        where.severity = filters.severity as any;
    }

    if (filters?.action && filters.action !== 'ALL') {
        where.action = filters.action as any;
    }

    if (filters?.search) {
        where.OR = [
            { actorEmail: { contains: filters.search, mode: 'insensitive' } },
            { resourceId: { contains: filters.search, mode: 'insensitive' } },
            { resourceType: { contains: filters.search, mode: 'insensitive' } }
        ];
    }

    const [data, total] = await Promise.all([
        db.auditEvent.findMany({
            where,
            orderBy: { timestamp: 'desc' },
            take: limit,
            skip,
            include: {
                actor: {
                    select: { name: true, role: true } // Fetch actor details for UI
                }
            }
        }),
        db.auditEvent.count({ where })
    ]);

    return { data, total, totalPages: Math.ceil(total / limit) };
}

// --- ANALYTICS ---

export async function getAuditStats() {
    // 1. Total Events Today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const countToday = await db.auditEvent.count({
        where: { timestamp: { gte: todayStart } }
    });

    // 2. Critical Events (All Time or Last 24h)
    const criticalCount = await db.auditEvent.count({
        where: { severity: 'CRITICAL' }
    });

    // 3. Activity Heatmap (Last 12 hours) - Mocked for visual if DB aggregation is heavy,
    // or we can do a simple groupBy if using proper SQL. 
    // Prisma groupBy is good here.

    // For the UI, we'll return a simplified array of "density"
    // Mocking for "Neo-Glass" visual richness:
    const heatmap = Array.from({ length: 24 }).map((_, i) => ({
        hour: i,
        count: Math.floor(Math.random() * 50)
    }));

    return { countToday, criticalCount, heatmap };
}

// --- SEEDER ---

export async function seedAuditLogs() {
    // Safety check: Don't seed if plenty exists
    const count = await db.auditEvent.count();
    if (count > 50) return { message: "Data already exists" };

    const admin = await db.user.findFirst();
    if (!admin) return { error: "No admin user found to attribute logs to." };

    console.log("Seeding Audit Logs...");

    const actions: AuditActionType[] = ['LOGIN', 'CREATE', 'UPDATE', 'DELETE', 'SENSITIVE_VIEW'];
    const resources = ['Course', 'User', 'Grade', 'SystemConfig'];

    const batch = [];
    for (let i = 0; i < 100; i++) {
        const action = actions[Math.floor(Math.random() * actions.length)];
        const severity = action === 'DELETE' ? 'CRITICAL' : (action === 'UPDATE' ? 'WARNING' : 'INFO');

        batch.push({
            timestamp: subMinutes(new Date(), Math.floor(Math.random() * 10000)), // Random time in last week
            actorId: admin.id,
            actorEmail: admin.email,
            ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
            userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
            action,
            resourceType: resources[Math.floor(Math.random() * resources.length)],
            resourceId: `res_${Math.floor(Math.random() * 1000)}`,
            changes: action === 'UPDATE' ? {
                field: "status",
                old: "DRAFT",
                new: "PUBLISHED"
            } : Prisma.JsonNull,
            metadata: { session_id: `sess_${Math.floor(Math.random() * 1000)}` },
            severity
        });
    }

    await db.auditEvent.createMany({
        data: batch as any
    });

    return { success: true, count: 100 };
}
