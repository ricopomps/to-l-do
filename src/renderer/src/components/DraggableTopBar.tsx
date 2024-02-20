import NotesLinkButton from './Button/NotesLinkButton'
import ToDoLinkButton from './Button/ToDoLinkButton'

export default function DraggableTopBar() {
  return (
    <header className="h-8 bg-zinc-700 px-24">
      <div className="flex justify-between items-center h-full">
        <ToDoLinkButton />
        <NotesLinkButton />
      </div>
    </header>
  )
}
