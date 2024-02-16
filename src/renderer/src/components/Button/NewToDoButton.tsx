import { createEmptyToDoAtom } from '@renderer/store/todo'
import { ToDo } from '@shared/models/todo'
import { useSetAtom } from 'jotai'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import InputModal from '../Modal/InputModal'
import ActionButton, { ActionButtonProps } from './ActionButton'

export default function NewToDoButton({ ...props }: ActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const createEmptyToDo = useSetAtom(createEmptyToDoAtom)

  const handleCreate = async (input: ToDo['title']) => {
    await createEmptyToDo(input)
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
