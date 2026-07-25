import './App.css'
import '@/public/fonts/fonts.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import MainPage from './pages/main-page/MainPage'
import SettingsPage from './pages/settings-page/SettingsPage'
import { ChatsProvider } from './context/ChatsContext'

function App() {
  return (
    <ChatsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/chats" element={<MainPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Router>
    </ChatsProvider>
  )
}

export default App
