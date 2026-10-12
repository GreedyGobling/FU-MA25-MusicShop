import { Outlet } from 'react-router'
import './App.css'
import './components/Header'
import Header from './components/Header'

function App() {
  return (
  <>
    <Header></Header>
    <Outlet />
  </>
  )
}

export default App
