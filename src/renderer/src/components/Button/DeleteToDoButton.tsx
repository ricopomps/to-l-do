import { Trash2 } from 'lucide-react'
import ActionButton, { ActionButtonProps } from './ActionButton'

export default function DeleteToDoButton({ ...props }: ActionButtonProps) {
  return (
    <ActionButton {...props}>
      <Trash2 className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
