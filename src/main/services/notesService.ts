import { NoteInfo } from '@shared/models/note'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { dialog } from 'electron'
import path from 'path'
import FileService, { IFileService } from './fileService'

export interface INotesService {
  getNoteInfoFromFilename(filename: string): Promise<NoteInfo>
  getNotes: GetNotes
  readNote: ReadNote
  writeNote: WriteNote
  createNote: CreateNote
  deleteNote: DeleteNote
}

export default class NotesService implements INotesService {
  private fileService: IFileService

  constructor() {
    this.fileService = new FileService()
  }

  async getNoteInfoFromFilename(filename: string): Promise<NoteInfo> {
    const notesDir = await this.fileService.getNotesDir()

    const fileStats = await this.fileService.getFileStats(notesDir, filename)

    return {
      title: filename.replace(/\.md$/, ''),
      lastEditTime: fileStats.mtimeMs
    }
  }

  async getNotes() {
    if (!this.fileService) {
      this.fileService = new FileService()
    }
    const notesDir = await this.fileService.getNotesDir()

    const notesFilesNames = await this.fileService.getFilesNames(notesDir)

    const notes = notesFilesNames.filter((fileName) => fileName.endsWith('.md'))

    return await Promise.all(notes.map(this.getNoteInfoFromFilename.bind(this)))
  }

  async readNote(filename: string) {
    const notesDir = await this.fileService.getNotesDir()

    return await this.fileService.readFile(notesDir, `${filename}.md`)
  }

  async writeNote(filename: string, content: string) {
    const notesDir = await this.fileService.getNotesDir()

    return await this.fileService.writeFile(notesDir, `${filename}.md`, content)
  }

  async createNote() {
    const notesDir = await this.fileService.getNotesDir()

    const { filePath, canceled } = await dialog.showSaveDialog({
      title: 'New note',
      defaultPath: `${notesDir}/Untitled.md`,
      buttonLabel: 'Create',
      properties: ['showOverwriteConfirmation'],
      showsTagField: false,
      filters: [{ name: 'Markdown', extensions: ['md'] }]
    })

    if (canceled || !filePath) return false

    const { name: filename, dir: parentDir, ext: fileExtension } = path.parse(filePath)

    if (parentDir !== notesDir) {
      await dialog.showMessageBox({
        type: 'error',
        title: 'Creation failed',
        message: `All notes must be saved under ${notesDir}.
        Avoid using other directories!`
      })

      return false
    }

    await this.fileService.writeFile(notesDir, `${filename}${fileExtension}`, '')

    return filename
  }

  async deleteNote(filename) {
    const notesDir = await this.fileService.getNotesDir()

    const { response } = await dialog.showMessageBox({
      type: 'warning',
      title: 'Delete note',
      message: `Are you sure you want to delete ${filename}?`,
      buttons: ['Delete', 'Cancel'], // 0 is Delete, 1 is Cancel
      defaultId: 1,
      cancelId: 1
    })

    if (response === 1) {
      console.info('Note deletion canceled')
      return false
    }

    console.info(`Deleting note: ${filename}`)
    await this.fileService.deleteFile(notesDir, `${filename}.md`)

    return true
  }
}
