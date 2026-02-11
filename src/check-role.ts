
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
        where: { email: "poorak.pandey@gmail.com" },
        select: { email: true, role: true, clerkId: true }
    })
    console.log("Current User Role in DB:", user)
}

main()
    .catch(console.error)
