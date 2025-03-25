import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { AppLayout } from './layouts/AppLayout'
import DivisionGame from './pages/DivisionGame'
import GameSelection from './pages/GameSelector'
import MultiplicationGame from './pages/MultiplicationGame'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<GameSelection />} />
          <Route path="/multiplication" element={<MultiplicationGame />} />
          <Route path="/division" element={<DivisionGame />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
