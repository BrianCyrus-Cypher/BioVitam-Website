import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import ScrollToTop from './components/ScrollToTop'

// Pages
const Home = lazy(() => import('./pages/Home'))
const Products = lazy(() => import('./pages/Products'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const CompanyProfile = lazy(() => import('./pages/CompanyProfile'))
const Certifications = lazy(() => import('./pages/Certifications'))
const Clientele = lazy(() => import('./pages/Clientele'))
const Events = lazy(() => import('./pages/Events'))

import { ThemeProvider } from './context/ThemeContext'
import { BottomNav } from './components/BottomNav'
import { Navbar } from './components/Navbar'
import Footer from './components/Footer'
import PageWrapper from './components/PageWrapper'

function AppRoutes() {
  const location = useLocation()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-biovitam-light dark:bg-biovitam-dark">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-biovitam-primary/20 border-2 border-biovitam-primary border-t-transparent animate-spin" />
              </div>
            </div>
          }>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/profile" element={<PageWrapper><CompanyProfile /></PageWrapper>} />
              <Route path="/products" element={<PageWrapper><Products /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/clientele" element={<PageWrapper><Clientele /></PageWrapper>} />
              <Route path="/certifications" element={<PageWrapper><Certifications /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
              <Route path="/events" element={<PageWrapper><Events /></PageWrapper>} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </Router>
  )
}
