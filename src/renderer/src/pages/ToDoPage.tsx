import Content from '@/components/AppLayout/Content'
import RootLayout from '@/components/AppLayout/RootLayout'
import Sidebar from '@/components/AppLayout/Sidebar'
import NotePreviewList from '@/components/NotePreviewList'
import InputModal from '@renderer/components/Modal/InputModal'
import ToDoList from '@renderer/components/ToDoList'
import ToDosActionButtonsRow from '@renderer/components/ToDosActionButtonsRow'
import { useRef, useState } from 'react'

export default function ToDoPage() {
  const [isOpen, setIsOpen] = useState(false)
  const contentConainerRef = useRef<HTMLDivElement>(null)

  function resetScroll() {
    contentConainerRef.current?.scrollTo(0, 0)
  }
  return (
    <RootLayout>
      <Sidebar className="bg-zinc-400">
        <ToDosActionButtonsRow className="flex justify-between mt-1" />
        <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
      </Sidebar>
      <Content ref={contentConainerRef} className="border-l bg-zinc-900/50 border-l-white/20">
        <ToDoList />
        <InputModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </Content>
    </RootLayout>
  )
}
