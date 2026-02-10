import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

const handleAuth = async () => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    return { userId };
}

export const ourFileRouter = {
    courseAttachment: f({
        text: { maxFileSize: "16MB", maxFileCount: 4 },
        image: { maxFileSize: "4MB", maxFileCount: 4 },
        pdf: { maxFileSize: "16MB", maxFileCount: 4 },
        blob: { maxFileSize: "16MB", maxFileCount: 4 }
    })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }), // Client handles updating DB to avoid syncing issues
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
