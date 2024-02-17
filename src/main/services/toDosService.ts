import { toDoWorkspaceConfigFileName, toDoWorkspaceConfigFolderName } from '@shared/constants'
import { ToDoWorkspace } from '@shared/models/todo'
import { GetToDosWorkspaces } from '@shared/types'
import FileService, { IFileService } from './fileService'

export interface IToDosService {
  getToDoWorkspaceInfo(folderName: string): Promise<ToDoWorkspace>

  getToDosWorkspaces: GetToDosWorkspaces
}

export default class ToDosService implements IToDosService {
  private fileService: IFileService

  constructor() {
    this.fileService = new FileService()
  }
  async getToDoWorkspaceInfo(folderName: string) {
    const toDoDir = await this.fileService.getToDosDir()

    const workspace = await this.fileService.readJsonFile<ToDoWorkspace>(
      `${toDoDir}/${folderName}/${toDoWorkspaceConfigFolderName}`,
      toDoWorkspaceConfigFileName
    ) //Ensure dir, so it creates again new in case the user deletes it

    return workspace
  }

  async getToDosWorkspaces() {
    const toDosDir = await this.fileService.getToDosDir()

    const toDosWorkspacesFoldersNames = await this.fileService.getFilesNames(toDosDir)

    const notes = toDosWorkspacesFoldersNames.filter((folderName) => folderName) //check if is valid mongoId

    return await Promise.all(notes.map(this.getToDoWorkspaceInfo.bind(this)))
  }
}
