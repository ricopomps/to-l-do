import DraggableTopBar from '@/components/DraggableTopBar'
import { RoutesPaths } from '@shared/constants/routes'
import { Route, Routes } from 'react-router-dom'
import NotesPage from './pages/NotesPage'
import ToDoPage from './pages/ToDoPage'

export default function AppRoutes() {
  return (
    <div>
      <DraggableTopBar />
      <Routes>
        <Route path={RoutesPaths.notes} element={<NotesPage />} />
        <Route path={RoutesPaths.todo} element={<ToDoPage />} />
      </Routes>
    </div>
  )
}
