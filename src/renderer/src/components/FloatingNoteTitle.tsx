import { selectedNoteAtom } from '@renderer/store'
import { cn } from '@renderer/utils'
import { useAtomValue } from 'jotai'
import { ComponentProps } from 'react'

export default function FloatingNoteTitle({ className, ...props }: ComponentProps<'div'>) {
  const selectedNote = useAtomValue(selectedNoteAtom)

  if (!selectedNote) return false

  return (
    <div className={cn('flex justify-center', className)} {...props}>
      <span className="text-gray-900">{selectedNote.title}</span>
    </div>
  )
}
