import { toDoMock } from '@renderer/store/mocks'
import { ToDo } from '@shared/models/todo'
import ToDoPreview from './ToDoPreview'

export default function ToDoList() {
  return (
    <div className="space-y-1 p-2">
      {toDoMock.map((toDo) => (
        <div key={toDo._id}>
          <ToDoWithChild toDo={toDo} />
        </div>
      ))}
    </div>
  )
}

interface ToDoWithChildProps {
  toDo: ToDo
}

function ToDoWithChild({ toDo }: ToDoWithChildProps) {
  return (
    <>
      <ToDoPreview toDo={toDo} />
      {!toDo.colapsed && toDo.children && toDo.children.length > 0 && (
        <div className="pl-8 md:pl-16 lg:pl-32 mt-2 mb-2 space-y-1">
          {toDo.children.map((toDoChild) => (
            <div key={toDoChild._id}>
              <ToDoWithChild toDo={toDoChild} />
            </div>
          ))}
        </div>
      )}
    </>
  )
}
