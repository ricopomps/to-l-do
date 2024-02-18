import { ToDoWorkspace } from '@shared/models/todo'
import { NoteContent, NoteInfo } from '../models/note'

//NOTES TYPES
export type GetNotes = () => Promise<NoteInfo[]>
export type ReadNote = (title: NoteInfo['title']) => Promise<NoteContent>
export type WriteNote = (title: NoteInfo['title'], content: NoteContent) => Promise<void>
export type CreateNote = () => Promise<NoteInfo['title'] | false>
export type DeleteNote = (title: NoteInfo['title']) => Promise<boolean>

//TODOS TYPES
export type GetToDosWorkspaces = () => Promise<ToDoWorkspace[]>
export type CreateToDosWorkspaces = (title: ToDoWorkspace['title']) => Promise<ToDoWorkspace>
