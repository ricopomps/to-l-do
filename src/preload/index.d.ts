import { ElectronAPI } from '@electron-toolkit/preload'
import {
  CreateNewToDo,
  CreateNote,
  CreateToDo,
  CreateToDosWorkspaces,
  DeleteNote,
  DeleteToDo,
  GetNotes,
  GetToDos,
  GetToDosWorkspaces,
  ReadNote,
  UpdateToDo,
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
        createNewToDo: CreateNewToDo
        getToDos: GetToDos
        updateToDo: UpdateToDo
        deleteToDo: DeleteToDo
      }
    }
  }
}
