import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db as prisma } from "@/lib/db";

export default async function Home() {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // 1. Try generic session claim (Fastest)
  const roleMetadata = (sessionClaims?.metadata as any)?.role;

  if (roleMetadata === "ADMIN") redirect("/teacher/dashboard");
  if (roleMetadata === "TEACHER") redirect("/teacher/dashboard");

  // 2. Database Check & Auto-Sync
  let user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { role: true }
  });

  // FIX: If user is authenticated but not in DB, create them now.
  if (!user) {
    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses[0]?.emailAddress;

    if (email) {
      // 2a. Check if user exists by email (Account Linking)
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        // LINK: Update the existing user with the new Clerk ID
        user = await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            clerkId: userId,
            // Optional: Sync name if missing? 
            name: existingUser.name || `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim()
          }
        });
      }
    }

    // 2b. If still no user (truly new), create them
    if (!user) {
      // Check if this is the FIRST user in the system (Make them ADMIN)
      const userCount = await prisma.user.count();
      const role = userCount === 0 ? "ADMIN" : "STUDENT";

      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: email || "unknown@email.com",
          name: `${clerkUser?.firstName || ""} ${clerkUser?.lastName || ""}`.trim() || "New Scholar",
          role,
          xp: 0
        }
      });
    }
  }

  if (user?.role === "ADMIN") redirect("/teacher/dashboard");
  if (user?.role === "TEACHER") redirect("/teacher/dashboard");

  // Default to student
  redirect("/student/dashboard");
}
