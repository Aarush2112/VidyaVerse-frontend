import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs/server";

const { video } = new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const upload = await video.uploads.create({
            new_asset_settings: {
                playback_policy: ["public"],
                // You can add more settings like mp4_support: "standard" for downloads
            },
            cors_origin: "*", // Adjust for production security if needed
        });

        return NextResponse.json(upload);
    } catch (error) {
        console.error("[MUX_UPLOAD_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
