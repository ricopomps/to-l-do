import ToDoContextMenu from '@/components/ContextMenu/ToDoContextMenu'
import InputModal from '@/components/Modal/InputModal'
import useToDosList from '@renderer/hooks/useToDosList'
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

type ToDoProps = {
  toDo: ToDo
  isActive?: boolean
} & ComponentProps<'div'>

export default function ToDoPreview({ toDo, isActive = false, ...props }: ToDoProps) {
  const { handleToDoselect } = useToDosList({})

  const [isInputModalOpen, setIsInputModalOpen] = useState(false)
  const [contextMenu, setcontextMenu] = useState({ show: false, x: 0, y: 0 })

  const toggleCollapseToDo = useSetAtom(toggleCollapseToDoAtom)
  const toggleCompletedToDo = useSetAtom(toggleCompletedToDoAtom)
  const createChildrenToDo = useSetAtom(createChildrenToDoAtom)

  const handleCreate = async (input: ToDo['title']) => {
    await createChildrenToDo(toDo._id, input)
  }

  const handleOpenContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    const { pageX, pageY } = e
    setcontextMenu({ show: true, x: pageX, y: pageY })
    handleToDoselect(toDo._id)()
  }

  const handleCloseContextMenu = () => {
    setcontextMenu({ show: false, x: 0, y: 0 })
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
        onContextMenu={handleOpenContextMenu}
      >
        <div className="flex gap-2">
          <div onClick={() => toggleCompletedToDo(toDo._id)}>
            {toDo.completed ? <BadgeCheck className="text-blue-400" /> : <Badge />}
          </div>
          <h3 className="font-bold truncate">{toDo.title}</h3>
        </div>
        <div className="flex gap-3">
          <PlusCircle onClick={() => setIsInputModalOpen(true)} className="text-green-300" />
          {toDo.children && toDo.children.length > 0 && (
            <div onClick={() => toggleCollapseToDo(toDo._id)}>
              {toDo.colapsed ? <ChevronUpCircle /> : <ChevronDownCircle />}
            </div>
          )}
        </div>
      </div>
      <InputModal
        isOpen={isInputModalOpen}
        onClose={() => setIsInputModalOpen(false)}
        onAccept={handleCreate}
      />
      <ToDoContextMenu onCloseContextMenu={handleCloseContextMenu} {...contextMenu} toDo={toDo} />
    </>
  )
}
