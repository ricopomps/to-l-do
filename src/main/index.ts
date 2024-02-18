import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import {
  CreateNewToDo,
  CreateNote,
  CreateToDo,
  CreateToDosWorkspaces,
  DeleteNote,
  GetNotes,
  GetToDos,
  GetToDosWorkspaces,
  ReadNote,
  UpdateToDo,
  WriteNote
} from '@shared/types'
import { BrowserWindow, app, ipcMain, shell } from 'electron'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'
import NotesService, { INotesService } from './services/notesService'
import ToDosService, { IToDosService } from './services/toDosService'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    center: true,
    title: 'To-l-Do',
    vibrancy: 'under-window',
    visualEffectState: 'active',
    trafficLightPosition: { x: 15, y: 10 },
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  notesRoutesConfig(ipcMain)
  toDosRoutesConfig(ipcMain)

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
enum NotesRoutes {
  GET_NOTES = 'getNotes',
  READ_NOTE = 'readNote',
  WRITE_NOTE = 'writeNote',
  CREATE_NOTE = 'createNote',
  DELETE_NOTE = 'deleteNote'
}

const notesRoutesConfig = (ipcMain: Electron.IpcMain) => {
  const notesService: INotesService = new NotesService()

  ipcMain.handle(NotesRoutes.GET_NOTES, (_, ...args: Parameters<GetNotes>) =>
    notesService.getNotes(...args)
  )
  ipcMain.handle(NotesRoutes.READ_NOTE, (_, ...args: Parameters<ReadNote>) =>
    notesService.readNote(...args)
  )
  ipcMain.handle(NotesRoutes.WRITE_NOTE, (_, ...args: Parameters<WriteNote>) =>
    notesService.writeNote(...args)
  )
  ipcMain.handle(NotesRoutes.CREATE_NOTE, (_, ...args: Parameters<CreateNote>) =>
    notesService.createNote(...args)
  )
  ipcMain.handle(NotesRoutes.DELETE_NOTE, (_, ...args: Parameters<DeleteNote>) =>
    notesService.deleteNote(...args)
  )
}

enum ToDosRoutes {
  GET_TODOS_WORKSPACES = 'getToDosWorkspaces',
  CREATE_TODOS_WORKSPACE = 'createToDosWorkspace',
  CREATE_TODO = 'createToDo',
  CREATE_NEW_TODO = 'createNewToDo',
  GET_TODOS = 'getToDos',
  UPDATE_TODO = 'updateToDo'
}

const toDosRoutesConfig = (ipcMain: Electron.IpcMain) => {
  const todosService: IToDosService = new ToDosService()

  ipcMain.handle(ToDosRoutes.GET_TODOS_WORKSPACES, (_, ...args: Parameters<GetToDosWorkspaces>) =>
    todosService.getToDosWorkspaces(...args)
  )

  ipcMain.handle(
    ToDosRoutes.CREATE_TODOS_WORKSPACE,
    (_, ...args: Parameters<CreateToDosWorkspaces>) => todosService.createWorkspace(...args)
  )

  ipcMain.handle(ToDosRoutes.CREATE_TODO, (_, ...args: Parameters<CreateToDo>) =>
    todosService.createToDo(...args)
  )

  ipcMain.handle(ToDosRoutes.CREATE_NEW_TODO, (_, ...args: Parameters<CreateNewToDo>) =>
    todosService.createNewToDo(...args)
  )

  ipcMain.handle(ToDosRoutes.GET_TODOS, (_, ...args: Parameters<GetToDos>) =>
    todosService.getToDos(...args)
  )

  ipcMain.handle(ToDosRoutes.UPDATE_TODO, (_, ...args: Parameters<UpdateToDo>) =>
    todosService.updateToDo(...args)
  )
}
