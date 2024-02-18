export type ToDoWorkspace = {
  _id: string
  title: string
  lastEditTime: number
  createdAtTime: number
}

export type ToDo = {
  _id: string
  workspaceId: string
  title: string
  lastEditTime: number
  createdAtTime: number
  completed?: boolean
  colapsed?: boolean
  children?: ToDo[]
}
