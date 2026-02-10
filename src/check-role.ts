
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
    const user = await db.user.findFirst({
        where: { email: "poorak.pandey@gmail.com" },
        select: { email: true, role: true, clerkId: true }
    })
    console.log("Current User Role in DB:", user)
}

main()
    .catch(console.error)
    .finally(() => db.$disconnect())
