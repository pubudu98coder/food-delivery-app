import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { StoreContextProvider } from './context/StoreContext.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </AuthProvider>
  </BrowserRouter>

)
