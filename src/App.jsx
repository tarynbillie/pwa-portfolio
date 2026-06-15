import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Components from './pages/Components'
import CaseStudy from './pages/CaseStudy'
import WorkPrototypes from './pages/WorkPrototypes'
import BreathingRoom from './pages/BreathingRoom'
import Playground from './pages/Playground'
import About from './pages/About'
import Writing from './pages/Writing'
import WritingArticle from './pages/WritingArticle'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/components" element={<Components />} />
          <Route path="/about" element={<About />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/writing/:slug" element={<WritingArticle />} />
          <Route path="/work" element={<Navigate to="/work/portfolio-intelligence" replace />} />
          <Route path="/work/prototypes" element={<WorkPrototypes />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/breathing-room" element={<BreathingRoom />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/prototypes" element={<Navigate to="/work/prototypes" replace />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
