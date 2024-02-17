import {
  appDirectoryName,
  fileEncoding,
  notesDirectoryName,
  toDosDirectoryName
} from '@shared/constants'
import { Stats, ensureDir, readFile, readJson, readdir, remove, stat, writeFile } from 'fs-extra'
import { homedir } from 'os'

export interface IFileService {
  getRootDir(): Promise<string>
  getNotesDir(): Promise<string>
  getToDosDir(): Promise<string>
  getFilesNames(directory: string): Promise<string[]>
  readFile(directory: string, filename: string): Promise<string>
  writeFile(directory: string, filename: string, content: string): Promise<void>
  deleteFile(directory: string, filename: string): Promise<void>
  getFileStats(directory: string, filename: string): Promise<Stats>
  readJsonFile<T>(directory: string, filename: string): Promise<T>
}

export default class FileService implements IFileService {
  async getRootDir(): Promise<string> {
    const rootDir = `${homedir()}/${appDirectoryName}`

    await ensureDir(rootDir)

    return rootDir
  }

  async getNotesDir(): Promise<string> {
    const rootDir = await this.getRootDir()
    const notesDir = `${rootDir}/${notesDirectoryName}`

    await ensureDir(notesDir)

    return notesDir
  }

  async getToDosDir(): Promise<string> {
    const rootDir = await this.getRootDir()
    const toDosDir = `${rootDir}/${toDosDirectoryName}`

    await ensureDir(toDosDir)

    return toDosDir
  }

  async getFilesNames(directory: string): Promise<string[]> {
    const filesNames = await readdir(directory, {
      encoding: fileEncoding,
      withFileTypes: false
    })

    return filesNames
  }

  async readFile(directory: string, filename: string): Promise<string> {
    return readFile(`${directory}/${filename}`, {
      encoding: fileEncoding
    })
  }

  async writeFile(directory: string, filename: string, content: string): Promise<void> {
    return writeFile(`${directory}/${filename}`, content, { encoding: fileEncoding })
  }

  async deleteFile(directory: string, filename: string): Promise<void> {
    await remove(`${directory}/${filename}`)
  }

  async getFileStats(directory: string, filename: string): Promise<Stats> {
    return await stat(`${directory}/${filename}`)
  }

  async readJsonFile<T>(directory: string, filename: string): Promise<T> {
    const json: T = await readJson(`${directory}/${filename}`, {
      encoding: fileEncoding
    })
    return json
  }
}
