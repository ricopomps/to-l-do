import { cn } from '@renderer/utils'
import { ToDo } from '@shared/models/todo'
import { Badge, BadgeCheck, ChevronDownCircle, ChevronUpCircle } from 'lucide-react'

interface ToDoProps {
  toDo: ToDo
}

export default function ToDoPreview({ toDo }: ToDoProps) {
  return (
    <div
      className={cn(
        'cursor-pointer px-2.5 py-3 rounded-md transition-colors duration-75 flex justify-between gap-2 items-center border-x border-y-4',
        {
          'bg-zinc-500/75': toDo.completed,
          'hover:bg-zinc-500/75': !toDo.completed
        }
      )}
    >
      <div className="flex gap-2">
        <div>{toDo.completed ? <BadgeCheck /> : <Badge />}</div>
        <h3 className="font-bold truncate">{toDo.title}</h3>
      </div>
      {toDo.children && <div>{toDo.colapsed ? <ChevronUpCircle /> : <ChevronDownCircle />}</div>}
    </div>
  )
}
