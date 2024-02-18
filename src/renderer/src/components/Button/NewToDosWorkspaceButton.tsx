import { createToDoWorkspace } from '@renderer/store/todo'
import { ToDoWorkspace } from '@shared/models/todo'
import { useSetAtom } from 'jotai'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import InputModal from '../Modal/InputModal'
import ActionButton, { ActionButtonProps } from './ActionButton'

export default function NewToDoWorkspaceButton({ ...props }: ActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const createToDosWorkspace = useSetAtom(createToDoWorkspace)

  const handleCreate = async (input: ToDoWorkspace['title']) => {
    await createToDosWorkspace(input)
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
