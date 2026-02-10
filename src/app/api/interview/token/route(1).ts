import { NextResponse } from "next/server";

export async function GET() {
    try {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            console.error("Missing OPENAI_API_KEY environment variable");
            return NextResponse.json({ error: "Server configuration error: Missing API Key" }, { status: 500 });
        }

        const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-realtime-preview-2024-10-01",
                voice: "alloy",
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("OpenAI API Error details:", errorText);
            throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Error fetching ephemeral token:", error);
        return NextResponse.json({ error: error.message || "Failed to create session" }, { status: 500 });
    }
}
