export type ToDo = {
  _id: string
  title: string
  lastEditTime: number
  completed?: boolean
  colapsed?: boolean
  children?: ToDo[]
}
