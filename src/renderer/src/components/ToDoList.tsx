import useToDosList from '@renderer/hooks/useToDosList'
import { ToDo } from '@shared/models/todo'
import ToDoPreview from './ToDoPreview'

export default function ToDoList() {
  const { toDos } = useToDosList({})

  if (!toDos) return null

  return (
    <div className="space-y-1 p-2">
      {toDos.map((toDo) => (
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
  const { selectedToDoIndex, handleToDoselect } = useToDosList({})

  return (
    <>
      <ToDoPreview
        toDo={toDo}
        isActive={selectedToDoIndex === toDo._id}
        onClick={handleToDoselect(toDo._id)}
      />
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
