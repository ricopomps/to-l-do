import { ToDoWorkspace } from '@shared/models/todo'
import { CreateToDosWorkspaces, GetToDosWorkspaces } from '@shared/types'

export const getToDosWorkspaces: GetToDosWorkspaces = async () => {
  return await window.context.toDosApi.getToDosWorkspaces()
}

export const createToDosWorkspaces: CreateToDosWorkspaces = async (
  title: ToDoWorkspace['title']
) => {
  return await window.context.toDosApi.createWorkspace(title)
}
