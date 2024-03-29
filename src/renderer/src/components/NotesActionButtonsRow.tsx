import { ComponentProps } from 'react'
import DeleteToDoButton from './Button/DeleteNoteButton'
import NewToDoButton from './Button/NewNoteButton'

export default function NotesActionButtonsRow({ ...props }: ComponentProps<'div'>) {
  return (
    <div {...props}>
      <NewToDoButton></NewToDoButton>
      <DeleteToDoButton></DeleteToDoButton>
    </div>
  )
}
