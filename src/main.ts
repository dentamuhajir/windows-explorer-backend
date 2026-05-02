import { Elysia } from "elysia"
import { folderController } from "./modules/explorer/interface/folder.controller"
import cors from "@elysiajs/cors"

new Elysia()
  .use(cors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
    methods: ['GET'],
  }))
  .use(folderController)
  .listen(3000)

console.log("API running at http://localhost:3000")