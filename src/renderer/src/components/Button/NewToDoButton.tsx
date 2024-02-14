import { Plus } from 'lucide-react'
import ActionButton, { ActionButtonProps } from './ActionButton'

export default function NewToDoButton({ ...props }: ActionButtonProps) {
  return (
    <ActionButton {...props}>
      <Plus className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
