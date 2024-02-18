import { ComponentProps } from 'react'
import DeleteToDoButton from './Button/DeleteNoteButton'
import NewToDoWorkspaceButton from './Button/NewToDosWorkspaceButton'

export default function ToDosActionButtonsRow({ ...props }: ComponentProps<'div'>) {
  return (
    <div {...props}>
      <NewToDoWorkspaceButton></NewToDoWorkspaceButton>
      <DeleteToDoButton></DeleteToDoButton>
    </div>
  )
}
