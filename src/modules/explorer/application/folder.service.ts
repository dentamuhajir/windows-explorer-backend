export class FolderService {
  constructor(private repo: any) {}

  async getTree() {
    const folders = await this.repo.findAll()
    return this.buildTree(folders)
  }

  async getChildren(id: string) {
    return this.repo.findChildren(id)
  }

  async getFiles(id: string) {
    return this.repo.findFiles(id)
  }

  private buildTree(folders: any[]) {
    const map = new Map()
    const roots: any[] = []

    for (const f of folders) {
      map.set(f.id, { ...f, children: [] })
    }

    for (const f of folders) {
      if (f.parentId) {
        map.get(f.parentId)?.children.push(map.get(f.id))
      } else {
        roots.push(map.get(f.id))
      }
    }

    return roots
  }
}