import { Elysia } from "elysia"
import { folderController } from "./modules/explorer/interface/folder.controller"

new Elysia()
  .use(folderController)
  .listen(3000)

console.log("API running at http://localhost:3000")