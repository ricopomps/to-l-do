import { ToDo } from '@shared/models/todo'
import mongoose from 'mongoose'

export const createNewToDo = (title: string) => {
  const newToDo: ToDo = {
    _id: new mongoose.Types.ObjectId().toString(),
    title,
    lastEditTime: Date.now(),
    createdAtTime: Date.now(),
    children: [],
    colapsed: false,
    completed: false
  }

  return newToDo
}

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
): ToDo[] => {
  return toDos.map((toDo) => {
    if (toDo._id === selectedToDoIndex) {
      return updateToDo(toDo)
    } else if (toDo.children) {
      return { ...toDo, children: mapToDoList(toDo.children, selectedToDoIndex, updateToDo) }
    }
    return toDo
  })
}
