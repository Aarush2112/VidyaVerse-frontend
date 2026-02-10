export interface Judge0Response {
    stdout: string | null
    stderr: string | null
    compile_output: string | null
    message: string | null
    status: {
        id: number
        description: string
    }
    time: string
    memory: number
}

// Map language names to Judge0 IDs
export const LANGUAGE_IDS = {
    javascript: 63,
    python: 71,
    cpp: 54, // C++ (GCC 9.2.0)
    java: 62,
    c: 50
}

export async function submitCode(source_code: string, language_id: number, stdin: string = ""): Promise<Judge0Response> {
    const JUDGE0_URL = process.env.JUDGE0_URL || "https://judge0-ce.p.rapidapi.com"
    const API_KEY = process.env.RAPID_API_KEY
    const HOST = new URL(JUDGE0_URL).host

    if (!API_KEY) throw new Error("RAPID_API_KEY is missing")

    // Encode to Base64
    const base64Code = Buffer.from(source_code).toString('base64')
    const base64Stdin = Buffer.from(stdin).toString('base64')

    const response = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=true&wait=true`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": HOST
        },
        body: JSON.stringify({
            source_code: base64Code,
            language_id: language_id,
            stdin: base64Stdin
        })
    })

    if (!response.ok) {
        throw new Error(`Judge0 API Error: ${response.statusText}`)
    }

    const result = await response.json()

    // Decode output (Judge0 returns base64 if query param base64_encoded=true)
    return {
        ...result,
        stdout: result.stdout ? Buffer.from(result.stdout, 'base64').toString('utf-8') : null,
        stderr: result.stderr ? Buffer.from(result.stderr, 'base64').toString('utf-8') : null,
        compile_output: result.compile_output ? Buffer.from(result.compile_output, 'base64').toString('utf-8') : null
    }
}
