"use server";

import { groq } from "@/lib/groq";
import { auth } from "@clerk/nextjs/server";

export async function executeCodeWithAI(code: string, language: string) {
    const { userId } = await auth();
    if (!userId) return { success: false, output: ["Error: Unauthorized"] };

    const systemPrompt = `You are a Code Execution Engine. 
    You act as a compiler/interpreter for ${language}.
    
    RULES:
    1. Analyze the user's code.
    2. Simulate its execution accurately.
    3. Return ONLY the console output (stdout) that this code would produce.
    4. If there is an error, return the error message as it would appear in the console.
    5. Do NOT provide explanations, analysis, or markdown. JUST the raw output string.
    6. Limit execution time simulation to 5 seconds (i.e., user cannot run infinite loops).
    
    Example:
    Code: print("Hello")
    Output: Hello
    `;

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: code }
            ],
            model: "llama3-70b-8192",
            temperature: 0, // Deterministic for "execution"
            max_tokens: 1024
        });

        const output = chatCompletion.choices[0].message.content || "";

        // Split by newlines to mimic console array
        const outputLines = output.split("\n");

        return { success: true, output: outputLines };
    } catch (error) {
        console.error("AI EXECUTION ERROR:", error);
        return { success: false, output: ["Error: Execution Runtime Failed"] };
    }
}
