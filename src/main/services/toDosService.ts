import { toDoWorkspaceConfigFileName, toDoWorkspaceConfigFolderName } from '@shared/constants'
import { ToDo, ToDoWorkspace } from '@shared/models/todo'
import { CreateToDo, CreateToDosWorkspaces, GetToDos, GetToDosWorkspaces } from '@shared/types'
import { ensureDir } from 'fs-extra'
import mongoose from 'mongoose'
import FileService, { IFileService } from './fileService'

export interface IToDosService {
  getToDoWorkspaceInfo(folderName: string): Promise<ToDoWorkspace>

  getToDosWorkspaces: GetToDosWorkspaces

  createWorkspace: CreateToDosWorkspaces

  createToDo: CreateToDo

  getToDos: GetToDos
}

export default class ToDosService implements IToDosService {
  private fileService: IFileService

  constructor() {
    this.fileService = new FileService()
  }

  async getWorkspaceFolder(workspaceId: ToDoWorkspace['_id']) {
    const toDoDir = await this.fileService.getToDosDir()

    const workspaceConfigFilePath = `${toDoDir}/${workspaceId}`

    return workspaceConfigFilePath
  }

  async getWorkspaceConfigFilePath(workspaceId: ToDoWorkspace['_id']) {
    const workspaceFolder = await this.getWorkspaceFolder(workspaceId)

    const workspaceConfigFilePath = `${workspaceFolder}/${toDoWorkspaceConfigFolderName}`

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
      title,
      createdAtTime: new Date().getTime()
    }

    const workspaceConfigFilePath = await this.getWorkspaceConfigFilePath(newWorkspace._id)

    await this.fileService.writeFile(
      workspaceConfigFilePath,
      toDoWorkspaceConfigFileName,
      JSON.stringify(newWorkspace)
    )

    return newWorkspace
  }

  createNewToDo(title: ToDo['title']) {
    const newToDo: ToDo = {
      _id: new mongoose.Types.ObjectId().toString(),
      title,
      lastEditTime: Date.now(),
      createdAtTime: Date.now(),
      children: [],
      colapsed: false,
      completed: false
    }

    return newToDo
  }

  async createToDo(workspaceId: ToDoWorkspace['_id'], toDoTitle: ToDo['title']) {
    const workspaceFolder = await this.getWorkspaceFolder(workspaceId)

    const newToDo = this.createNewToDo(toDoTitle)

    await this.fileService.writeFile(
      workspaceFolder,
      `${newToDo._id}.json`,
      JSON.stringify(newToDo)
    )

    return newToDo
  }

  async getToDos(workspaceId: ToDoWorkspace['_id']) {
    const workspaceFolder = await this.getWorkspaceFolder(workspaceId)

    const toDosFilesNames = await this.fileService.getFilesNames(workspaceFolder)

    const toDos = toDosFilesNames.filter((fileName) => fileName.endsWith('.json'))

    return await Promise.all(
      toDos.map((toDo) => this.fileService.readJsonFile<ToDo>(workspaceFolder, toDo))
    )
  }
}
