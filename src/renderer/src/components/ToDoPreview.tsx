import { cn } from '@renderer/utils'
import { ToDo } from '@shared/models/todo'
import { Badge, BadgeCheck, ChevronDownCircle, ChevronUpCircle } from 'lucide-react'
import { ComponentProps } from 'react'

type ToDoProps = {
  toDo: ToDo
  isActive?: boolean
} & ComponentProps<'div'>

export default function ToDoPreview({ toDo, isActive = false, ...props }: ToDoProps) {
  return (
    <div
      className={cn(
        'cursor-pointer px-2.5 py-3 rounded-md transition-colors duration-75 flex justify-between gap-2 items-center border-x border-y-4',
        {
          'bg-zinc-500/75': toDo.completed,
          'hover:bg-zinc-500/75': !toDo.completed && !isActive,
          'bg-zinc-800/75': isActive
        }
      )}
      {...props}
    >
      <div className="flex gap-2">
        <div>{toDo.completed ? <BadgeCheck /> : <Badge />}</div>
        <h3 className="font-bold truncate">{toDo.title}</h3>
      </div>
      {toDo.children && toDo.children.length > 0 && (
        <div>{toDo.colapsed ? <ChevronUpCircle /> : <ChevronDownCircle />}</div>
      )}
    </div>
  )
}
