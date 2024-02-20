import {
  createNewToDo,
  createToDo,
  createToDosWorkspaces,
  deleteToDo,
  getToDos,
  getToDosWorkspaces,
  updateToDo
} from '@renderer/api/toDosApi'
import { ToDo, ToDoWorkspace } from '@shared/models/todo'
import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'
import { completeAll, filterToDoList, findRootParentToDo, mapToDo } from './utils'

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

export const createEmptyToDoAtom = atom(
  null,
  async (_, set, workspaceId: ToDoWorkspace['_id'], toDoTitle: ToDo['title']) => {
    const title = toDoTitle

    if (!title) return

    await createToDo(workspaceId, toDoTitle)

    set(refreshCounter, (i) => i + 1)
  }
)

export const toggleCollapseToDoAtom = atom(null, async (get, set, selectedToDoIndex: string) => {
  const workspace = get(selectedToDoWorkspaceAtom)

  if (!workspace) return
  const updateToDoFunction = (toDo: ToDo) => {
    return { ...toDo, colapsed: !toDo.colapsed }
  }

  const { parentToDo } = mapToDo(workspace.toDos, selectedToDoIndex, updateToDoFunction)

  await updateToDo(parentToDo.workspaceId, parentToDo)

  set(refreshCounter, (i) => i + 1)
})

export const toggleCompletedToDoAtom = atom(null, async (get, set, selectedToDoIndex: string) => {
  const workspace = get(selectedToDoWorkspaceAtom)

  if (!workspace) return

  const updateToDoFunction = (toDo: ToDo) => {
    return {
      ...toDo,
      completed: !toDo.completed,
      ...(toDo.children && !toDo.completed && { children: completeAll(toDo.children) })
    }
  }

  const { parentToDo } = mapToDo(workspace.toDos, selectedToDoIndex, updateToDoFunction)

  await updateToDo(parentToDo.workspaceId, parentToDo)

  set(refreshCounter, (i) => i + 1)
})

export const createChildrenToDoAtom = atom(
  null,
  async (get, set, selectedToDoIndex: string, title: ToDo['title']) => {
    const workspace = get(selectedToDoWorkspaceAtom)

    if (!workspace || !title) return

    const newToDo = await createNewToDo(title, workspace._id) // TODO: All ipc conecctions are async, fix this

    const updateToDoFunction = (toDo: ToDo) => {
      return {
        ...toDo,
        children: [newToDo, ...(toDo.children ?? [])],
        ...(toDo.colapsed && { colapsed: false })
      }
    }

    const { parentToDo } = mapToDo(workspace.toDos, selectedToDoIndex, updateToDoFunction)

    await updateToDo(parentToDo.workspaceId, parentToDo)

    set(refreshCounter, (i) => i + 1)
  }
)

const selectedToDoWorkspaceAtomAsync = atom(
  async (get) => {
    get(refreshCounter)
    const toDosWorkspaces = get(toDosWorkspacesAtom)
    const selectedToDosWorkspaceId = get(selectedToDosWorkspaceIdAtom)

    if (selectedToDosWorkspaceId === null || !toDosWorkspaces) return null

    const selectedToDoWorkspace = toDosWorkspaces.find(
      (toDoWorkspace) => toDoWorkspace._id === selectedToDosWorkspaceId
    )

    if (!selectedToDoWorkspace) return null

    const toDos = await getToDos(selectedToDoWorkspace._id)

    return {
      ...selectedToDoWorkspace,
      toDos
    }
  },
  (_, set) => set(refreshCounter, (i) => i + 1)
)

export const selectedToDoWorkspaceAtom = unwrap(
  selectedToDoWorkspaceAtomAsync,
  (prev) => prev ?? null
)
const refreshCounter = atom(0)

export const updateToDoTitleAtom = atom(
  null,
  async (get, set, selectedToDoIndex: string, title: string) => {
    const workspace = get(selectedToDoWorkspaceAtom)

    if (!workspace) return
    const updateToDoFunction = (toDo: ToDo) => {
      return { ...toDo, title }
    }

    const { parentToDo } = mapToDo(workspace.toDos, selectedToDoIndex, updateToDoFunction)

    await updateToDo(parentToDo.workspaceId, parentToDo)

    set(refreshCounter, (i) => i + 1)
  }
)

export const deleteToDoAtom = atom(null, async (get, set, selectedToDoIndex: string) => {
  const workspace = get(selectedToDoWorkspaceAtom)
  if (!workspace) return

  const rootParentToDo = findRootParentToDo(workspace.toDos, selectedToDoIndex)
  if (!rootParentToDo) return

  const isParentToDo = rootParentToDo._id === selectedToDoIndex

  if (isParentToDo) {
    await deleteToDo(rootParentToDo.workspaceId, rootParentToDo)
  } else {
    filterToDoList(workspace.toDos, selectedToDoIndex)
    await updateToDo(rootParentToDo.workspaceId, rootParentToDo)
  }

  set(refreshCounter, (i) => i + 1)
})
