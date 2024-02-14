import { RoutesPaths } from '@shared/constants/routes'
import { StickyNote } from 'lucide-react'
import { Link } from 'react-router-dom'
import ActionButton, { ActionButtonProps } from './ActionButton'

export default function NotesLinkButton({ ...props }: ActionButtonProps) {
  return (
    <Link to={RoutesPaths.notes}>
      <ActionButton {...props}>
        <StickyNote className="w-4 h-4 text-zinc-300" />
      </ActionButton>
    </Link>
  )
}
