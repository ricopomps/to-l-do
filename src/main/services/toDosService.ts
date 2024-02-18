import { toDoWorkspaceConfigFileName, toDoWorkspaceConfigFolderName } from '@shared/constants'
import { ToDoWorkspace } from '@shared/models/todo'
import { CreateToDosWorkspaces, GetToDosWorkspaces } from '@shared/types'
import { ensureDir } from 'fs-extra'
import mongoose from 'mongoose'
import FileService, { IFileService } from './fileService'

export interface IToDosService {
  getToDoWorkspaceInfo(folderName: string): Promise<ToDoWorkspace>

  getToDosWorkspaces: GetToDosWorkspaces

  createWorkspace: CreateToDosWorkspaces
}

export default class ToDosService implements IToDosService {
  private fileService: IFileService

  constructor() {
    this.fileService = new FileService()
  }

  async getWorkspaceConfigFilePath(workspaceId: ToDoWorkspace['_id']) {
    const toDoDir = await this.fileService.getToDosDir()

    const workspaceConfigFilePath = `${toDoDir}/${workspaceId}/${toDoWorkspaceConfigFolderName}`

    await ensureDir(workspaceConfigFilePath)

    return workspaceConfigFilePath
  }

  async getToDoWorkspaceInfo(folderName: string) {
    const workspaceConfigFilePath = await this.getWorkspaceConfigFilePath(folderName)

    const workspace = await this.fileService.readJsonFile<ToDoWorkspace>(
      workspaceConfigFilePath,
      toDoWorkspaceConfigFileName
    ) //Ensure dir, so it creates again new in case the user deletes it

    const workspaceWithId = { ...workspace, _id: folderName }

    return workspaceWithId
  }

  async getToDosWorkspaces() {
    const toDosDir = await this.fileService.getToDosDir()

    const toDosWorkspacesFoldersNames = await this.fileService.getFilesNames(toDosDir)

    const notes = toDosWorkspacesFoldersNames.filter((folderName) => folderName) //check if is valid mongoId

    return await Promise.all(notes.map(this.getToDoWorkspaceInfo.bind(this)))
  }

  async createWorkspace(title: ToDoWorkspace['title']) {
    const newWorkspace: ToDoWorkspace = {
      _id: new mongoose.Types.ObjectId().toString(),
      lastEditTime: new Date().getTime(),
      title
    }

    const workspaceConfigFilePath = await this.getWorkspaceConfigFilePath(newWorkspace._id)

    await this.fileService.writeFile(
      workspaceConfigFilePath,
      toDoWorkspaceConfigFileName,
      JSON.stringify(newWorkspace)
    )

    return newWorkspace
  }
}
