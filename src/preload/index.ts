import {
  CreateNote,
  CreateToDosWorkspaces,
  DeleteNote,
  GetNotes,
  GetToDosWorkspaces,
  ReadNote,
  WriteNote
} from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

enum NotesRoutes {
  GET_NOTES = 'getNotes',
  READ_NOTE = 'readNote',
  WRITE_NOTE = 'writeNote',
  CREATE_NOTE = 'createNote',
  DELETE_NOTE = 'deleteNote'
}

enum ToDosRoutes {
  GET_TODOS_WORKSPACES = 'getToDosWorkspaces',
  CREATE_TODOS_WORKSPACE = 'createToDosWorkspace'
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    notesApi: {
      getNotes: (...args: Parameters<GetNotes>) =>
        ipcRenderer.invoke(NotesRoutes.GET_NOTES, ...args),
      readNote: (...args: Parameters<ReadNote>) =>
        ipcRenderer.invoke(NotesRoutes.READ_NOTE, ...args),
      writeNote: (...args: Parameters<WriteNote>) =>
        ipcRenderer.invoke(NotesRoutes.WRITE_NOTE, ...args),
      createNote: (...args: Parameters<CreateNote>) =>
        ipcRenderer.invoke(NotesRoutes.CREATE_NOTE, ...args),
      deleteNote: (...args: Parameters<DeleteNote>) =>
        ipcRenderer.invoke(NotesRoutes.DELETE_NOTE, ...args)
    },
    toDosApi: {
      getToDosWorkspaces: (...args: Parameters<GetToDosWorkspaces>) =>
        ipcRenderer.invoke(ToDosRoutes.GET_TODOS_WORKSPACES, ...args),
      createWorkspace: (...args: Parameters<CreateToDosWorkspaces>) =>
        ipcRenderer.invoke(ToDosRoutes.CREATE_TODOS_WORKSPACE, ...args)
    }
  })
} catch (error) {
  console.error(error)
}
