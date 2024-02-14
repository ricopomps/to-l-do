import { createEmptyToDoAtom } from '@renderer/store/todo'
import { useSetAtom } from 'jotai'
import { Plus } from 'lucide-react'
import ActionButton, { ActionButtonProps } from './ActionButton'

export default function NewToDoButton({ ...props }: ActionButtonProps) {
  const createEmptyToDo = useSetAtom(createEmptyToDoAtom)

  const handleCreate = async () => {
    await createEmptyToDo('New cara')
  }
  return (
    <ActionButton {...props} onClick={handleCreate}>
      <Plus className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
