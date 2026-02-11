
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
        where: { email: "jatin15062006@gmail.com" }
    });
    console.log("User found:", user);
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
    });
