import { RoutesPaths } from '@shared/constants/routes'
import { ListTodo } from 'lucide-react'
import { Link } from 'react-router-dom'
import ActionButton, { ActionButtonProps } from './ActionButton'

export default function ToDoLinkButton({ ...props }: ActionButtonProps) {
  return (
    <Link to={RoutesPaths.todo}>
      <ActionButton {...props}>
        <ListTodo className="w-4 h-4 text-zinc-300" />
      </ActionButton>
    </Link>
  )
}
