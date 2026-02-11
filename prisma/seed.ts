import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // 1. Ensure Admin Exists
    const adminEmail = "admin@poorakverse.com"
    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            clerkId: "user_admin_123", // Placeholder, ideally synced from Clerk manually or dev
            email: adminEmail,
            name: "System Admin",
            role: "ADMIN",
            xp: 99999
        }
    })
    console.log({ admin })

    // 2. Create Default Batch
    const batchName = "CSE-2026"
    const batch = await prisma.batch.findFirst({ where: { name: batchName } }) || await prisma.batch.create({
        data: {
            name: batchName
        }
    })
    console.log({ batch })

    // 3. Create Demo Course
    const courseCode = "PY101"
    const course = await prisma.course.upsert({
        where: { code: courseCode },
        update: {},
        create: {
            title: "Intro to Python",
            description: "A comprehensive guide to Python programming.",
            code: courseCode,
            teacherId: admin.id, // Assign to admin as teacher for now
        }
    })
    console.log({ course })

    // Link Batch to Course
    // We can do this by updating the course or batch if relations allow?
    // Batch has `courses Course[]`. Course has `batches Batch[]`. Implicit many-to-many.
    // Let's connect them.
    await prisma.course.update({
        where: { id: course.id },
        data: {
            batches: {
                connect: { id: batch.id }
            }
        }
    })
    // 4. Seed Arena Problem (Two Sum)
    console.log("Seeding Two Sum Arena Problem...")
    const twoSum = await prisma.problem.upsert({
        where: { slug: "two-sum" },
        update: {},
        create: {
            slug: "two-sum",
            title: "Two Sum",
            description: "# Two Sum\n\nGiven an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nYou can return the answer in any order.\n\n## Example 1:\n\n```\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].\n```",
            difficulty: "EASY",
            starterCode: `def solution(nums, target):
    # Write your code here
    pass`,

            testCases: {
                create: [
                    {
                        input: JSON.stringify({ nums: [2, 7, 11, 15], target: 9 }),
                        expectedOutput: JSON.stringify([0, 1]),
                        isHidden: false
                    },
                    {
                        input: JSON.stringify({ nums: [3, 2, 4], target: 6 }),
                        expectedOutput: JSON.stringify([1, 2]),
                        isHidden: false
                    },
                    {
                        input: JSON.stringify({ nums: [3, 3], target: 6 }),
                        expectedOutput: JSON.stringify([0, 1]),
                        isHidden: true // Anti-cheat test
                    }
                ]
            }

        }
    })
    console.log(`Created Arena Problem: ${twoSum.title}`);
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
