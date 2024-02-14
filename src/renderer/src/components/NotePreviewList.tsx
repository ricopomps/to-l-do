import { notesMock } from '@renderer/store/mocks'
import { cn } from '@renderer/utils'
import { ComponentProps } from 'react'
import NotePreview from './NotePreview'
export default function NotePreviewList({ className, ...props }: ComponentProps<'ul'>) {
  if (notesMock.length === 0) {
    return (
      <ul className={cn('text-center pt-4', className)} {...props}>
        <span>No notes yet!</span>
      </ul>
    )
  }

  return (
    <ul className={className} {...props}>
      {notesMock.map((note) => (
        <NotePreview key={note.title + note.lastEditTime} {...note} />
      ))}
    </ul>
  )
}
