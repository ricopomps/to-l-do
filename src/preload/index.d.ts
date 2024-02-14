import { ElectronAPI } from '@electron-toolkit/preload'
import { GetNotes, ReadNote, WriteNote } from 'src/shared/types'

declare global {
  interface Window {
    electron: ElectronAPI
    context: {
      locale: string
      getNotes: GetNotes
      readNote: ReadNote
      writeNote: WriteNote
    }
  }
}
