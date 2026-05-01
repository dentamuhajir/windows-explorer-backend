import { Elysia } from "elysia"
import { PrismaFolderRepository } from "../infrastructure/prisma-folder.repository"
import { FolderService } from "../application/folder.service"

const repo = new PrismaFolderRepository()
const service = new FolderService(repo)

export const folderController = new Elysia({ prefix: "/api/v1" })
  .get("/folders/tree", () => service.getTree())
  .get("/folders/:id/children", ({ params }) => service.getChildren(params.id))
  .get("/folders/:id/files", ({ params }) => service.getFiles(params.id))