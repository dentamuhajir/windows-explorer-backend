import { prisma } from '@/shared/db/prisma'
import type { FolderRepository } from "../domain/folder.repository"

export class PrismaFolderRepository implements FolderRepository {

  async findAll() {
    return prisma.folder.findMany()
  }

  async findChildren(parentId: string) {
    return prisma.folder.findMany({
      where: { parentId }
    })
  }

  async findFiles(folderId: string) {
    return prisma.file.findMany({
      where: { folderId }
    })
  }
}