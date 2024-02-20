import { ToDo } from '@shared/models/todo'

export const completeAll = (toDos: ToDo[]) => {
  return toDos.map((toDo) => ({
    ...toDo,
    completed: true,
    children: toDo.children && completeAll(toDo.children)
  }))
}

export const mapToDo = (
  toDos: ToDo[],
  selectedToDoIndex: string,
  updateToDo: (toDo: ToDo) => ToDo
): { parentToDo: ToDo; mappedToDos: ToDo[] } => {
  const mappedToDos = mapToDoList(toDos, selectedToDoIndex, updateToDo)
  const parentToDo = findRootParentToDo(mappedToDos, selectedToDoIndex)

  if (!parentToDo) throw new Error('No parent found')

  return { mappedToDos, parentToDo }
}

const mapToDoList = (
  toDos: ToDo[],
  selectedToDoIndex: string,
  updateToDo: (toDo: ToDo) => ToDo
): ToDo[] => {
  const mappedToDos = toDos.map((toDo) => {
    if (toDo._id === selectedToDoIndex) {
      return updateToDo(toDo)
    } else if (toDo.children) {
      const mappedToDos = mapToDoList(toDo.children, selectedToDoIndex, updateToDo)
      return { ...toDo, children: mappedToDos }
    }

    return toDo
  })

  return mappedToDos
}

export const filterToDoList = (toDos: ToDo[], selectedToDoIndex: string): ToDo[] => {
  const filteredToDos = toDos.filter((toDo) => {
    if (toDo._id === selectedToDoIndex) {
      return false
    } else if (toDo.children) {
      toDo.children = filterToDoList(toDo.children, selectedToDoIndex)
    }
    return true
  })

  return filteredToDos
}

export const findRootParentToDo = (toDos: ToDo[], selectedToDoIndex: string): ToDo | null => {
  let rootParent: ToDo | null = null

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const parent = findParentToDo(toDos, selectedToDoIndex)

    if (!parent || parent === rootParent) break

    rootParent = parent
    selectedToDoIndex = rootParent._id
  }

  return rootParent
}

const findParentToDo = (toDos: ToDo[], selectedToDoIndex: string): ToDo | null => {
  let parentToDo: ToDo | null = null

  for (const toDo of toDos) {
    if (toDo._id === selectedToDoIndex) {
      return toDo
    }

    if (toDo.children) {
      if (toDo.children.some((child) => child._id === selectedToDoIndex)) {
        return toDo
      }
      parentToDo = findParentToDo(toDo.children, selectedToDoIndex)
      if (parentToDo) {
        return parentToDo
      }
    }
  }

  return null
}
