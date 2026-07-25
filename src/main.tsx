import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Workbox } from 'workbox-window'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
  const wb = new Workbox('/sw.js', { scope: '/' })
  wb.addEventListener('waiting', () => {
    wb.messageSkipWaiting()
  })
  wb.register()
}
