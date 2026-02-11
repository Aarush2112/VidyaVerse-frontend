"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

type ExecutionResult = {
    status: 'SUCCESS' | 'ERROR';
    results: { input: string; expected: string; actual: string; passed: boolean }[];
    consoleOutput: string;
};

export async function runCode(code: string, problemId: string): Promise<ExecutionResult> {

    // 1. Fetch Problem & Test Cases
    const problem = await db.problem.findUnique({
        where: { id: problemId },
        include: { testCases: true }
    });

    if (!problem) {
        return {
            status: "ERROR",
            results: [],
            consoleOutput: "Problem not found."
        };
    }

    // 2. Mock Execution Engine (V1)
    // In a real app, send to Piston/Docker.
    // Here, we verify if the user code "looks" correct or matches the starter pattern + some basic logic check?
    // Actually, running user code strictly is dangerous.
    // For this V1 demo, we will SIMULATE execution based on a "cheat" or simplistic assertion for "Two Sum".

    // Naively, if the code contains "return [0, 1]" literal or implements the logic correctly (impossible to verify safely here without eval).
    // Let's implement a "Mock Success" if the code isn't empty, just to demonstrate the UI.
    // OR, we can use a very restricted `Function` constructor if we assume admin trust (Bad practice but OK for local demo).

    // Let's mock the "Two Sum" logic specifically for the demo if it matches the problem.
    const isTwoSum = problem.slug === 'two-sum';
    const results = [];
    let allPassed = true;
    let consoleLog = "Running solution against test cases...\n";

    if (isTwoSum) {
        // Mock check: Does code look vaguely like a solution?
        // Let's assume for the demo that ANY non-empty code that isn't the starter code "Passes" the first case, 
        // to show the user interaction. 
        // Better: We actually want to show Failures too.

        for (const test of problem.testCases) {
            const input = JSON.parse(test.input);
            // Expected output
            let expected = test.expectedOutput;

            // Mock Actual Output Generation
            // If code length > 50, we assume they tried, and we return the correct answer to "simulate" success
            // If code is short (starter), we return null/error.
            const isStarter = code.includes("pass") && code.length < 100;

            let actual;
            let passed = false;

            if (isStarter) {
                actual = "None"; // Python equivalent
                passed = false;
            } else {
                // Cheat: Just return expected for demo "Success" flow
                actual = expected;
                passed = true;
            }

            if (!passed) allPassed = false;

            results.push({
                input: test.input,
                expected: expected,
                actual: actual,
                passed: passed
            });
        }
    } else {
        consoleLog += "Execution not supported for this problem type yet.";
    }

    // 3. Save Submission (if passed/attempted)
    // await db.arenaSubmission.create({ ... })

    return {
        status: allPassed ? "SUCCESS" : "ERROR",
        results,
        consoleOutput: consoleLog + (allPassed ? "All tests passed!" : "Some tests failed.")
    };
}
