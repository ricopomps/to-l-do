import useToDosWorkspacesList from '@renderer/hooks/useToDosWorkspacesList'
import { cn } from '@renderer/utils'
import { isEmpty } from 'lodash'
import { ComponentProps } from 'react'
import ToDosWorkspacePreview from './ToDosWorkspacePreview'

export type ToDosWorkspacesPreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}

export default function ToDosWorkspacesPreviewList({
  className,
  onSelect,
  ...props
}: ToDosWorkspacesPreviewListProps) {
  const { toDosWorkspaces, selectedToDosWorkspaceId, handleToDosWorkspaceSelect } =
    useToDosWorkspacesList({ onSelect })

  if (!toDosWorkspaces) return null

  if (isEmpty(toDosWorkspaces)) {
    return (
      <ul className={cn('text-center pt-4', className)} {...props}>
        <span>No workspaces yet!</span>
      </ul>
    )
  }

  return (
    <ul className={className} {...props}>
      {toDosWorkspaces.map((toDosWorkspace) => (
        <ToDosWorkspacePreview
          key={toDosWorkspace._id}
          {...toDosWorkspace}
          isActive={selectedToDosWorkspaceId === toDosWorkspace._id}
          onClick={handleToDosWorkspaceSelect(toDosWorkspace._id)}
        />
      ))}
    </ul>
  )
}
