import Content from '@/components/AppLayout/Content'
import RootLayout from '@/components/AppLayout/RootLayout'
import Sidebar from '@/components/AppLayout/Sidebar'
import ToDoList from '@renderer/components/ToDoList'
import ToDosActionButtonsRow from '@renderer/components/ToDosActionButtonsRow'
import ToDosWorkspacesPreviewList from '@renderer/components/ToDosWorkspacesPreviewList'
import { useRef } from 'react'

export default function ToDoPage() {
  const contentConainerRef = useRef<HTMLDivElement>(null)

  function resetScroll() {
    contentConainerRef.current?.scrollTo(0, 0)
  }
  return (
    <RootLayout>
      <Sidebar className="bg-zinc-400">
        <ToDosActionButtonsRow className="flex justify-between mt-1" />
        <ToDosWorkspacesPreviewList className="mt-3 p-1 space-y-1" onSelect={resetScroll} />
      </Sidebar>
      <Content ref={contentConainerRef} className="border-l bg-zinc-900/50 border-l-white/20">
        <ToDoList />
      </Content>
    </RootLayout>
  )
}
