import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createHashRouter, RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './features/cartSlice.ts'


const router = createHashRouter([{
  path: "/",
  Component: App,
  children: [

  ]
}])
// kassa, kategori, itempage, homepage 
const store = configureStore({
  reducer: {
    cart: cartSlice
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
