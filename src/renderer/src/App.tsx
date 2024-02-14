import ActionButtonsRow from './components/ActionButtonsRow'
import Content from './components/AppLayout/Content'
import RootLayout from './components/AppLayout/RootLayout'
import Sidebar from './components/AppLayout/Sidebar'
import DraggableTopBar from './components/DraggableTopBar'
import MarkdownEditor from './components/MarkdownEditor'
import NotePreviewList from './components/NotePreviewList'

function App(): JSX.Element {
  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2 bg-zinc-400">
          <ActionButtonsRow className="flex justify-between mt-1" />
          <NotePreviewList className="" />
        </Sidebar>
        <Content className="mt-8 border-l bg-zinc-900/50 border-l-white/20">
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
