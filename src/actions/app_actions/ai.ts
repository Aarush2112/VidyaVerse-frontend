"use server";

interface LessonPlan {
    title: string;
    type: "VIDEO" | "TEXT" | "QUIZ" | "PROJECT";
}

export async function generateCourseStructure(topic: string, stream: string): Promise<LessonPlan[]> {
    console.log(`[AI_AGENT] Generating curriculum for: ${topic} (${stream})`);

    // SIMULATION MODE (No API Key)
    // In a real app, this would call Google Gemini API

    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate "Thinking" delay

    // Dynamic generation based on keyword matching
    const keywords = topic.toLowerCase();
    const isCoding = keywords.includes("code") || keywords.includes("program") || keywords.includes("dev") || stream === "CSE";

    if (isCoding) {
        return [
            { title: `Introduction to ${topic}`, type: "VIDEO" },
            { title: "Environment Setup & Tools", type: "TEXT" },
            { title: "Core Syntax & Variables", type: "VIDEO" },
            { title: "Control Flow Logic", type: "QUIZ" },
            { title: "Data Structures 101", type: "VIDEO" },
            { title: `Building your first ${topic} App`, type: "PROJECT" }
        ];
    }

    if (stream === "ECE" || keywords.includes("circuit") || keywords.includes("signal")) {
        return [
            { title: "fundamentals of Electronics", type: "VIDEO" },
            { title: "Circuit Analysis Theorems", type: "TEXT" },
            { title: "Signal Processing Basics", type: "VIDEO" },
            { title: "Lab Safety Protocol", type: "QUIZ" },
            { title: "Final Design Project", type: "PROJECT" }
        ];
    }

    // Default Fallback
    return [
        { title: `Overview of ${topic}`, type: "VIDEO" },
        { title: "Historical Context", type: "TEXT" },
        { title: "Key Principles", type: "VIDEO" },
        { title: "Case Studies", type: "TEXT" },
        { title: "Mid-Term Assessment", type: "QUIZ" },
        { title: "Future Trends", type: "VIDEO" },
        { title: "Capstone Analysis", type: "PROJECT" }
    ];
}
