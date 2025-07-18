import { BrowserRouter as Router } from 'react-router-dom'
import ComponenteEncabezado from './components/Header'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <Router>
      <ComponenteEncabezado />
      <AppRoutes />
    </Router>
  )
}
