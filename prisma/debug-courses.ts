import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
    const courses = await db.course.findMany({
        include: {
            teacher: true
        }
    });
    console.log("--- DEBUG COURSES ---");
    console.log(JSON.stringify(courses, null, 2));
    console.log("---------------------");
}

main();
