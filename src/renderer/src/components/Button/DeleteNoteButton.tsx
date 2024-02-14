import { deleteNoteAtom } from '@renderer/store/note'
import { useSetAtom } from 'jotai'
import { Trash2 } from 'lucide-react'
import ActionButton, { ActionButtonProps } from './ActionButton'

export default function DeleteNoteButton({ ...props }: ActionButtonProps) {
  const deleteNote = useSetAtom(deleteNoteAtom)

  const handleDelete = async () => {
    await deleteNote()
  }
  return (
    <ActionButton {...props} onClick={handleDelete}>
      <Trash2 className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
