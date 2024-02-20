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
  CREATE_TODOS_WORKSPACE = 'createToDosWorkspace',
  CREATE_TODO = 'createToDo',
  CREATE_NEW_TODO = 'createNewToDo',
  GET_TODOS = 'getToDos',
  UPDATE_TODO = 'updateToDo',
  DELETE_TODO = 'deleteToDo'
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
        ipcRenderer.invoke(ToDosRoutes.CREATE_TODOS_WORKSPACE, ...args),
      createToDo: (...args: Parameters<CreateToDo>) =>
        ipcRenderer.invoke(ToDosRoutes.CREATE_TODO, ...args),
      createNewToDo: (...args: Parameters<CreateNewToDo>) =>
        ipcRenderer.invoke(ToDosRoutes.CREATE_NEW_TODO, ...args),
      getToDos: (...args: Parameters<GetToDos>) =>
        ipcRenderer.invoke(ToDosRoutes.GET_TODOS, ...args),
      updateToDo: (...args: Parameters<UpdateToDo>) =>
        ipcRenderer.invoke(ToDosRoutes.UPDATE_TODO, ...args),
      deleteToDo: (...args: Parameters<DeleteToDo>) =>
        ipcRenderer.invoke(ToDosRoutes.DELETE_TODO, ...args)
    } // TODO: make generic assing function, passing the channel and the generic type
  })
} catch (error) {
  console.error(error)
}
