import 'dotenv/config'
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
    console.log('Seeding database...')

    await prisma.file.deleteMany()
    await prisma.folder.deleteMany()

    // Helper
    async function createFolder(name: string, parentId?: string) {
        return prisma.folder.create({
            data: { name, parentId }
        })
    }

    async function createFiles(folderId: string, count: number, prefix: string) {
        const data = Array.from({ length: count }).map((_, i) => ({
            name: `${prefix}-${i + 1}.txt`,
            size: 500 + i * 37,
            folderId
        }))

        return prisma.file.createMany({ data })
    }

    // ROOT
    const rootFolders = await Promise.all([
        createFolder('Documents'),
        createFolder('Images'),
        createFolder('Videos'),
        createFolder('Projects'),
        createFolder('Downloads')
    ])

    const [documents, images, videos, projects, downloads] = rootFolders

    // LEVEL 1 - Documents
    const work = await createFolder('Work', documents.id)
    const personal = await createFolder('Personal', documents.id)
    const archive = await createFolder('Archive', documents.id)

    // LEVEL 2 - Work
    const reports = await createFolder('Reports', work.id)
    const presentations = await createFolder('Presentations', work.id)

    // LEVEL 2 - Personal
    const finance = await createFolder('Finance', personal.id)
    const notes = await createFolder('Notes', personal.id)

    // LEVEL 3
    const tax2024 = await createFolder('Tax-2024', finance.id)

    // Projects tree
    const projectA = await createFolder('Project-A', projects.id)
    const projectB = await createFolder('Project-B', projects.id)

    const srcA = await createFolder('src', projectA.id)
    const docsA = await createFolder('docs', projectA.id)

    const srcB = await createFolder('src', projectB.id)

    // Files (spread across structure)

    // Documents
    await createFiles(reports.id, 10, 'report')
    await createFiles(presentations.id, 8, 'slides')
    await createFiles(notes.id, 6, 'note')
    await createFiles(tax2024.id, 5, 'tax')

    // Images
    await createFiles(images.id, 15, 'image')

    // Videos
    await createFiles(videos.id, 10, 'video')

    // Projects
    await createFiles(srcA.id, 12, 'codeA')
    await createFiles(docsA.id, 6, 'docA')
    await createFiles(srcB.id, 10, 'codeB')

    // Downloads (mixed)
    await createFiles(downloads.id, 20, 'download')

    console.log('Seeding completed')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })