import { ToDo, ToDoWorkspace } from '@shared/models/todo'
import { CreateToDo, CreateToDosWorkspaces, GetToDos, GetToDosWorkspaces } from '@shared/types'

export const getToDosWorkspaces: GetToDosWorkspaces = async () => {
  return await window.context.toDosApi.getToDosWorkspaces()
}

export const createToDosWorkspaces: CreateToDosWorkspaces = async (
  title: ToDoWorkspace['title']
) => {
  return await window.context.toDosApi.createWorkspace(title)
}

export const createToDo: CreateToDo = async (
  workspaceId: ToDoWorkspace['_id'],
  toDoTitle: ToDo['title']
) => {
  return await window.context.toDosApi.createToDo(workspaceId, toDoTitle)
}

export const getToDos: GetToDos = async (workspaceId: ToDoWorkspace['_id']) => {
  return await window.context.toDosApi.getToDos(workspaceId)
}
