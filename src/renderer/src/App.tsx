import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
