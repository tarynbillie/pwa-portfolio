import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Components from './pages/Components'
import CaseStudy from './pages/CaseStudy'
import WorkPrototypes from './pages/WorkPrototypes'
import About from './pages/About'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/components" element={<Components />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Navigate to="/work/portfolio-intelligence" replace />} />
          <Route path="/work/prototypes" element={<WorkPrototypes />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/prototypes" element={<Navigate to="/work/prototypes" replace />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
