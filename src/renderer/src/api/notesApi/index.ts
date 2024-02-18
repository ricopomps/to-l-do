import { NoteContent, NoteInfo } from '@shared/models/note'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'

export const getNotes: GetNotes = async () => {
  return await window.context.notesApi.getNotes()
}

export const readNote: ReadNote = async (title: NoteInfo['title']) => {
  return await window.context.notesApi.readNote(title)
}

export const writeNote: WriteNote = async (title: NoteInfo['title'], content: NoteContent) => {
  return await window.context.notesApi.writeNote(title, content)
}

export const createNote: CreateNote = async () => {
  return await window.context.notesApi.createNote()
}

export const deleteNote: DeleteNote = async (title: NoteInfo['title']) => {
  return await window.context.notesApi.deleteNote(title)
}
