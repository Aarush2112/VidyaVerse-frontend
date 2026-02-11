
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const templates = [
    {
        name: "Empty Canvas",
        description: "Start from scratch with a blank course structure.",
        defaultModules: [],
        tags: ["blank", "custom"]
    },
    {
        name: "Theory Heavy",
        description: "Lecture-heavy structure with reading materials and quizzes.",
        defaultModules: [
            { title: "Introduction", type: "VIDEO" },
            { title: "Core Concepts", type: "VIDEO" },
            { title: "Mid-Term Review", type: "QUIZ" },
            { title: "Advanced Topics", type: "VIDEO" },
            { title: "Final Exam Prep", type: "QUIZ" }
        ],
        tags: ["theory", "academic", "traditional"]
    },
    {
        name: "Engineering Lab",
        description: "Practical focus with lab manuals and submission portals.",
        defaultModules: [
            { title: "Lab Safety & Setup", type: "VIDEO" },
            { title: "Experiment 1: Basics", type: "LAB" },
            { title: "Experiment 2: Advanced", type: "LAB" },
            { title: "Final Project Submission", type: "LAB" }
        ],
        tags: ["lab", "practical", "engineering"]
    }
];

async function main() {
    console.log(`Start seeding templates...`);

    // Clear existing for idempotency
    await prisma.courseTemplate.deleteMany({});

    for (const t of templates) {
        const template = await prisma.courseTemplate.create({
            data: {
                name: t.name,
                description: t.description,
                defaultModules: t.defaultModules,
                tags: t.tags
            }
        });
        console.log(`Created template with id: ${template.id}`);
    }
    console.log(`Seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
