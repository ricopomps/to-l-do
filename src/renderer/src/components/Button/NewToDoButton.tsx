import { createEmptyToDoAtom } from '@renderer/store/todo'
import { ToDo, ToDoWorkspace } from '@shared/models/todo'
import { useSetAtom } from 'jotai'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import InputModal from '../Modal/InputModal'
import ActionButton, { ActionButtonProps } from './ActionButton'

type NewToDoButtonProps = ActionButtonProps & {
  workspaceId: ToDoWorkspace['_id']
}

export default function NewToDoButton({ workspaceId, ...props }: NewToDoButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const createEmptyToDo = useSetAtom(createEmptyToDoAtom)

  const handleCreate = async (input: ToDo['title']) => {
    await createEmptyToDo(workspaceId, input)
  }

  return (
    <>
      <ActionButton {...props} onClick={() => setIsOpen(true)}>
        <Plus className="w-4 h-4 text-zinc-300" />
      </ActionButton>
      <InputModal isOpen={isOpen} onClose={() => setIsOpen(false)} onAccept={handleCreate} />
    </>
  )
}
