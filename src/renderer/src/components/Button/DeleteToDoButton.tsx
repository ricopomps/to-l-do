import { deleteNoteAtom } from '@renderer/store'
import { useSetAtom } from 'jotai'
import { Trash2 } from 'lucide-react'
import ActionButton, { ActionButtonProps } from './ActionButton'

export default function DeleteToDoButton({ ...props }: ActionButtonProps) {
  const deleteNote = useSetAtom(deleteNoteAtom)

  const handleDelete = () => {
    deleteNote()
  }
  return (
    <ActionButton {...props} onClick={handleDelete}>
      <Trash2 className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
