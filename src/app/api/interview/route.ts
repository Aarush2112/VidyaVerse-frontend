import { NextResponse } from "next/server";
import { groq } from "@/lib/groq";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: body.messages,
    });

    return NextResponse.json(completion);
  } catch (error: any) {
    console.error("GROQ ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Groq request failed" },
      { status: 500 }
    );
  }
}
