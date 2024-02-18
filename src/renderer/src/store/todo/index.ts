import { createToDosWorkspaces, getToDosWorkspaces } from '@renderer/api/toDosApi'
import { ToDo, ToDoWorkspace } from '@shared/models/todo'
import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'
import { toDoMock } from '../mocks'
import { completeAll, createNewToDo, mapToDoList } from './utils'

const loadToDos = async () => {
  const toDos = toDoMock

  return toDos.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

const toDosAtomAsync = atom<ToDo[] | Promise<ToDo[]>>(loadToDos())

export const toDosAtom = unwrap(toDosAtomAsync, (prev) => prev)

const loadToDosWorkspaces = async () => {
  const workspaces = await getToDosWorkspaces()

  return workspaces
}

const toDosWorkspacesAtomAsync = atom<ToDoWorkspace[] | Promise<ToDoWorkspace[]>>(
  loadToDosWorkspaces()
)

export const toDosWorkspacesAtom = unwrap(toDosWorkspacesAtomAsync, (prev) => prev)

export const selectedToDoIndexAtom = atom<string | null>(null)

export const selectedToDosWorkspaceIdAtom = atom<string | null>(null)

export const createToDoWorkspace = atom(null, async (get, set, title: ToDoWorkspace['title']) => {
  const toDosWorkspaces = get(toDosWorkspacesAtom)

  if (!toDosWorkspaces) return

  const newToDosWorkspace = await createToDosWorkspaces(title)

  set(toDosWorkspacesAtom, [newToDosWorkspace, ...toDosWorkspaces])
})

export const createEmptyToDoAtom = atom(null, async (get, set, toDoTitle: ToDo['title']) => {
  const toDos = get(toDosAtom)

  if (!toDos) return

  const title = toDoTitle

  if (!title) return

  const newToDo = createNewToDo(title)

  set(toDosAtom, [newToDo, ...toDos])
})

const selectedToDoAtomAsync = atom(async (get) => {
  const toDos = get(toDosAtom)
  const selectedToDoIndex = get(selectedToDoIndexAtom)

  if (selectedToDoIndex === null || !toDos) return null

  const selectedToDo = toDos.find((toDo) => toDo._id === selectedToDoIndex)

  if (!selectedToDo) return null

  return selectedToDo
})

const emptyToDo: ToDo = {
  _id: '',
  title: '',
  lastEditTime: Date.now()
}

export const selectedToDoAtom = unwrap(selectedToDoAtomAsync, (prev) => prev ?? emptyToDo)

export const toggleCollapseToDoAtom = atom(null, (get, set, selectedToDoIndex: string) => {
  const toDos = get(toDosAtom)

  if (!toDos) return

  const updateToDo = (toDo: ToDo) => {
    return { ...toDo, colapsed: !toDo.colapsed }
  }

  set(toDosAtom, mapToDoList(toDos, selectedToDoIndex, updateToDo))
})

export const toggleCompletedToDoAtom = atom(null, (get, set, selectedToDoIndex: string) => {
  const toDos = get(toDosAtom)

  if (!toDos) return

  const updateToDo = (toDo: ToDo) => {
    return {
      ...toDo,
      completed: !toDo.completed,
      ...(toDo.children && !toDo.completed && { children: completeAll(toDo.children) })
    }
  }

  set(toDosAtom, mapToDoList(toDos, selectedToDoIndex, updateToDo))
})

export const createChildrenToDoAtom = atom(
  null,
  (get, set, selectedToDoIndex: string, title: ToDo['title']) => {
    const toDos = get(toDosAtom)

    if (!toDos || !title) return

    const newToDo = createNewToDo(title)

    const updateToDo = (toDo: ToDo) => {
      return {
        ...toDo,
        children: [newToDo, ...(toDo.children ?? [])],
        ...(toDo.colapsed && { colapsed: false })
      }
    }

    set(toDosAtom, mapToDoList(toDos, selectedToDoIndex, updateToDo))
  }
)
