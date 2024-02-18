import { ToDo } from '@shared/models/todo'

export const completeAll = (toDos: ToDo[]) => {
  return toDos.map((toDo) => ({
    ...toDo,
    completed: true,
    children: toDo.children && completeAll(toDo.children)
  }))
}

export const mapToDoList = (
  toDos: ToDo[],
  selectedToDoIndex: string,
  updateToDo: (toDo: ToDo) => ToDo
): { parentToDo: ToDo; mappedToDos: ToDo[] } => {
  let parentToDo: ToDo = toDos[0] //TODO: improve
  const mappedToDos = toDos.map((toDo) => {
    parentToDo = toDo
    if (toDo._id === selectedToDoIndex) {
      return updateToDo(toDo)
    } else if (toDo.children) {
      const { mappedToDos } = mapToDoList(toDo.children, selectedToDoIndex, updateToDo)
      return { ...toDo, children: mappedToDos }
    }
    return toDo
  })
  parentToDo = mappedToDos.find((parentsToDo) => parentsToDo._id === parentToDo._id) ?? parentToDo
  return { parentToDo, mappedToDos }
}
