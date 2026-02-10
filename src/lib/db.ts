import { PrismaClient } from "@prisma/client";

declare global {
    var prisma_v4: PrismaClient | undefined;
}

export const db = globalThis.prisma_v4 || new PrismaClient({
    log: ['warn', 'error'],
});

if (process.env.NODE_ENV !== "production") globalThis.prisma_v4 = db;
