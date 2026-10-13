import { Link, Outlet } from 'react-router'
import './App.css'

function App() {
  return (
  <>
    <nav aria-label="Main navigation">
      <Link to="/">Home</Link> | <Link to="/kassa">Kassa</Link>
    </nav>
    <Outlet />
  </>
  )
}

export default App
