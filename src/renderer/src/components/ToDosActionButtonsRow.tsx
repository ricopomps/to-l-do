import { ComponentProps } from 'react'
import DeleteToDoButton from './Button/DeleteNoteButton'
import NewToDoButton from './Button/NewToDoButton'

export default function ToDosActionButtonsRow({ ...props }: ComponentProps<'div'>) {
  return (
    <div {...props}>
      <NewToDoButton></NewToDoButton>
      <DeleteToDoButton></DeleteToDoButton>
    </div>
  )
}
