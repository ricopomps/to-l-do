import { createEmptyNoteAtom } from '@renderer/store'
import { useSetAtom } from 'jotai'
import { Plus } from 'lucide-react'
import ActionButton, { ActionButtonProps } from './ActionButton'

export default function NewNoteButton({ ...props }: ActionButtonProps) {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)

  const handleCreate = async () => {
    await createEmptyNote()
  }
  return (
    <ActionButton {...props} onClick={handleCreate}>
      <Plus className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
