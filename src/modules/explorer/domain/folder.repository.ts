export interface FolderRepository {
  findAll(): Promise<any[]>
  findChildren(parentId: string): Promise<any[]>
  findFiles(folderId: string): Promise<any[]>
}