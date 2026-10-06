import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createHashRouter, RouterProvider } from 'react-router'
import { Provider } from 'react-redux'


const router = createHashRouter([{
  path: "/",
  Component: App,
  children: [

  ]
}])
// kassa, kategori, itempage, homepage 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  </StrictMode>,
)
