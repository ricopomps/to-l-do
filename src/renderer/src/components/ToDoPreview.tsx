import {
  createChildrenToDoAtom,
  toggleCollapseToDoAtom,
  toggleCompletedToDoAtom
} from '@renderer/store/todo'
import { cn } from '@renderer/utils'
import { ToDo } from '@shared/models/todo'
import { useSetAtom } from 'jotai'
import { Badge, BadgeCheck, ChevronDownCircle, ChevronUpCircle, PlusCircle } from 'lucide-react'
import { ComponentProps, useState } from 'react'
import InputModal from './Modal/InputModal'

type ToDoProps = {
  toDo: ToDo
  isActive?: boolean
} & ComponentProps<'div'>

export default function ToDoPreview({ toDo, isActive = false, ...props }: ToDoProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleCollapseToDo = useSetAtom(toggleCollapseToDoAtom)
  const toggleCompletedToDo = useSetAtom(toggleCompletedToDoAtom)
  const createChildrenToDo = useSetAtom(createChildrenToDoAtom)

  const handleCreate = async (input: ToDo['title']) => {
    await createChildrenToDo(toDo._id, input)
  }

  return (
    <>
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
          <div onClick={() => toggleCompletedToDo(toDo._id)}>
            {toDo.completed ? <BadgeCheck className="text-blue-400" /> : <Badge />}
          </div>
          <h3 className="font-bold truncate">{toDo.title}</h3>
        </div>
        <div className="flex gap-3">
          <PlusCircle onClick={() => setIsOpen(true)} className="text-green-300" />
          {toDo.children && toDo.children.length > 0 && (
            <div onClick={() => toggleCollapseToDo(toDo._id)}>
              {toDo.colapsed ? <ChevronUpCircle /> : <ChevronDownCircle />}
            </div>
          )}
        </div>
      </div>
      <InputModal isOpen={isOpen} onClose={() => setIsOpen(false)} onAccept={handleCreate} />
    </>
  )
}
