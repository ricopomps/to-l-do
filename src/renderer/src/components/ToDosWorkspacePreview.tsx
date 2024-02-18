import { cn, formatDateFromMs } from '@renderer/utils'
import { ToDoWorkspace } from '@shared/models/todo'
import { ComponentProps } from 'react'
import NewToDoButton from './Button/NewToDoButton'

export type ToDosWorkspacePreviewProps = ToDoWorkspace & {
  isActive?: boolean
} & ComponentProps<'div'>

export default function ToDosWorkspacePreview({
  _id,
  title,
  lastEditTime,
  isActive = false,
  className,
  ...props
}: ToDosWorkspacePreviewProps) {
  const date = formatDateFromMs(lastEditTime)
  return (
    <div
      className={cn(
        'cursor-pointer px-2.5 py-3 rounded-md transition-colors duration-75',
        {
          'bg-zinc-500/75': isActive,
          'hover:bg-zinc-500/75': !isActive
        },
        className
      )}
      {...props}
    >
      <span title={title}>
        <h3 className="mb-1 font-bold truncate">{title}</h3>
      </span>
      <div className="flex items-center justify-between">
        <span className="inline-block w-full mb-2 text-xs font-light text-left">{date}</span>
        <NewToDoButton workspaceId={_id} />
      </div>
    </div>
  )
}
