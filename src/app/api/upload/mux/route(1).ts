import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const { video } = new Mux({
    tokenId: process.env.MUX_TOKEN_ID!,
    tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const upload = await video.uploads.create({
            new_asset_settings: {
                playback_policy: ["public"],
                encoding_tier: "smart",
            },
            cors_origin: "*", // Adjust in production
        });

        return NextResponse.json({
            uploadUrl: upload.url,
            uploadId: upload.id
        });

    } catch (error) {
        console.error("[MUX_UPLOAD]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
