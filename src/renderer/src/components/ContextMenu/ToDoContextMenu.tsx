import { deleteToDoAtom, updateToDoTitleAtom } from '@renderer/store/todo'
import { ToDo } from '@shared/models/todo'
import { useSetAtom } from 'jotai'
import { BadgeX, Pencil } from 'lucide-react'
import { useState } from 'react'
import InputModal from '../Modal/InputModal'
import ContextMenu from './ContextMenu'
interface ToDoContextMenuProps {
  show: boolean
  x: number
  y: number
  onCloseContextMenu: () => void
  toDo: ToDo
}
export default function ToDoContextMenu({
  show,
  x,
  y,
  toDo,
  onCloseContextMenu
}: ToDoContextMenuProps) {
  const updateToDoTitle = useSetAtom(updateToDoTitleAtom)
  const deleteToDo = useSetAtom(deleteToDoAtom)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleToDoUpdate = (input: string) => {
    updateToDoTitle(toDo._id, input)
  }

  const handleToDoDelete = async () => {
    onCloseContextMenu()
    //TODO: Confirm the Delete

    deleteToDo(toDo._id)
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
  }

  const handleOpenEditModal = () => {
    onCloseContextMenu()
    setIsEditModalOpen(true)
  }

  return (
    <>
      {show && (
        <ContextMenu onCloseContextMenu={onCloseContextMenu} x={x} y={y}>
          <div className="flex flex-col">
            <div
              className="flex gap-2 hover:bg-zinc-700 p-1 rounded-lg"
              onClick={handleOpenEditModal}
            >
              <Pencil />
              Edit
            </div>
            <div className="flex gap-2 hover:bg-zinc-700 p-1 rounded-lg" onClick={handleToDoDelete}>
              <BadgeX className="text-red-300" /> Delete
            </div>
          </div>
        </ContextMenu>
      )}
      {isEditModalOpen && (
        <InputModal
          defaultText={toDo.title}
          onAccept={handleToDoUpdate}
          onClose={handleCloseEditModal}
        />
      )}
    </>
  )
}
