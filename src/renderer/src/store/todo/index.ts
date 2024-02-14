import { ToDo } from '@shared/models/todo'
import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'
import { toDoMock } from '../mocks'

const loadToDos = async () => {
  const notes = toDoMock

  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

const toDosAtomAsync = atom<ToDo[] | Promise<ToDo[]>>(loadToDos())

export const toDosAtom = unwrap(toDosAtomAsync, (prev) => prev)

export const selectedToDoIndexAtom = atom<string | null>(null)

export const createEmptyToDoAtom = atom(null, async (get, set, toDoTitle: ToDo['title']) => {
  const toDos = get(toDosAtom)

  if (!toDos) return

  const title = toDoTitle

  if (!title) return

  const newToDo: ToDo = {
    _id: toDoTitle,
    title,
    lastEditTime: Date.now(),
    children: [],
    colapsed: false,
    completed: false
  }

  set(toDosAtom, [newToDo, ...toDos])
})
