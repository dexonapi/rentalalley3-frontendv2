import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './components/layout/Navbar'
import CardGrid from './components/CardGrid'
import Profile from './pages/Profile'

function App() {
  return (
    <Router>
      <main className="font-cereal-Lt mb-[2000px]">
        <Nav />
        <Routes>
          <Route path="/" element={<CardGrid />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
