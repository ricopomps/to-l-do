import { ComponentProps } from 'react'
import DeleteToDoButton from './Button/DeleteToDoButton'
import NewToDoButton from './Button/NewToDoButton'

export default function ActionButtonsRow({ ...props }: ComponentProps<'div'>) {
  return (
    <div {...props}>
      <NewToDoButton></NewToDoButton>
      <DeleteToDoButton></DeleteToDoButton>
    </div>
  )
}
