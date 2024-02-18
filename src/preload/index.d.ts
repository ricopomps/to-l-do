import { ElectronAPI } from '@electron-toolkit/preload'
import {
  CreateNote,
  CreateToDo,
  CreateToDosWorkspaces,
  DeleteNote,
  GetNotes,
  GetToDos,
  GetToDosWorkspaces,
  ReadNote,
  WriteNote
} from 'src/shared/types'

declare global {
  interface Window {
    electron: ElectronAPI
    context: {
      locale: string
      notesApi: {
        getNotes: GetNotes
        readNote: ReadNote
        writeNote: WriteNote
        createNote: CreateNote
        deleteNote: DeleteNote
      }
      toDosApi: {
        getToDosWorkspaces: GetToDosWorkspaces
        createWorkspace: CreateToDosWorkspaces
        createToDo: CreateToDo
        getToDos: GetToDos
      }
    }
  }
}
