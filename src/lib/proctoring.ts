import { ProctorEvent, AttemptStatus } from "@prisma/client";

export class ProctoringService {

    /**
     * Logs a violation and checks if the session should be terminated.
     */
    static async logViolation(attemptId: string, type: ProctorEvent, metadata: any = {}) {
        // 1. Fetch Attempt to get User ID
        if (!attempt) throw new Error("Attempt not found");

        // 2. Log the violation
            data: {
                attemptId,
                userId: attempt.studentId,
                event: type,
                details: metadata,
            },
        });

        // 3. Check for "Three Strikes" (CRITICAL violations only)
        const criticalTypes = ['TAB_SWITCH', 'FULLSCREEN_EXIT', 'MULTIPLE_FACES'];

        // Check if the current event is critical
        if (criticalTypes.includes(type)) {
                where: {
                    attemptId,
                    event: { in: ['TAB_SWITCH', 'FULLSCREEN_EXIT', 'MULTIPLE_FACES'] }
                }
            });

            if (violationCount >= 3) {
                await this.terminateSession(attemptId, "Automated Termination: Three Strikes Rule");
                return { action: 'TERMINATE', log };
            }
        }

        return { action: 'WARNING', log };
    }

    /**
     * Terminates an exam session immediately.
     */
    static async terminateSession(attemptId: string, reason: string) {
            where: { id: attemptId },
            data: {
                status: 'TERMINATED',
                endTime: new Date(),
            }
        });
    }

    /**
     * Calculates a "Trust Score" (0-100) based on logs.
     * 100 = Perfect, < 50 = Suspicious
     */
    static async calculateTrustScore(attemptId: string) {
        let score = 100;

        logs.forEach(log => {
            switch (log.event) {
                case 'TAB_SWITCH': score -= 15; break;
                case 'FULLSCREEN_EXIT': score -= 15; break;
                case 'MULTIPLE_FACES': score -= 30; break;
                case 'NO_FACE': score -= 10; break;
                default: score -= 5;
            }
        });

        return Math.max(0, score);
    }
}
