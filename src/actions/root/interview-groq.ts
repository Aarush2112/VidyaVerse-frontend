'use server';

import Groq from "groq-sdk";

export async function getGroqResponse(history: { role: "user" | "model", parts: string }[], message: string) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        console.error("GROQ_API_KEY is missing in server process.env");
        throw new Error("Server configuration error: GROQ_API_KEY is missing");
    }

    try {
        const groq = new Groq({ apiKey });

        // Convert history to Groq format
        const messages: any[] = history.map(h => ({
            role: h.role === 'model' ? 'assistant' : 'user', // Groq uses 'assistant' not 'model'
            content: h.parts
        }));

        // Add current message
        messages.push({ role: 'user', content: message });

        // Add system prompt behavior if needed (optional context injection)
        // messages.unshift({ role: 'system', content: "You are a helpful AI interviewer." }); 

        const completion = await groq.chat.completions.create({
            messages: messages,
            model: "llama-3.3-70b-versatile",
            temperature: 0.6,
            max_tokens: 500,
        });

        const responseText = completion.choices[0]?.message?.content || "";
        return responseText;
    } catch (error: any) {
        console.error("Groq API Error details:", error);
        throw new Error(`Groq Error: ${error.message || "Unknown error"}`);
    }
}
