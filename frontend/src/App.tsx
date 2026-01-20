import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from './components/Navbar'
import PageWrapper from './components/PageWrapper'

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'))
const Products = lazy(() => import('./pages/Products'))
const About = lazy(() => import('./pages/About'))
const Benefits = lazy(() => import('./pages/Benefits'))
const Contact = lazy(() => import('./pages/Contact'))
const CompanyProfile = lazy(() => import('./pages/CompanyProfile'))
const Certifications = lazy(() => import('./pages/Certifications'))
const Clientele = lazy(() => import('./pages/Clientele'))
const Process = lazy(() => import('./pages/Process'))

import { ThemeProvider } from './context/ThemeContext'
import { BottomNav } from './components/BottomNav'

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="biovitam-ui-theme">
      <Router>
        <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-biovitam-light dark:bg-background dark:text-foreground">
          <ScrollToTop />
          <Navbar />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-biovitam-primary"></div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                  <Route path="/profile" element={<PageWrapper><CompanyProfile /></PageWrapper>} />
                  <Route path="/products" element={<PageWrapper><Products /></PageWrapper>} />
                  <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                  <Route path="/benefits" element={<PageWrapper><Benefits /></PageWrapper>} />
                  <Route path="/clientele" element={<PageWrapper><Clientele /></PageWrapper>} />
                  <Route path="/certifications" element={<PageWrapper><Certifications /></PageWrapper>} />
                  <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                  <Route path="/process" element={<PageWrapper><Process /></PageWrapper>} />
                </Routes>
              </Suspense>
            </AnimatePresence>
          </main>

          <BottomNav />

          {/* Modern Footer with 3 Columns */}
          <footer className="bg-biovitam-dark text-white pt-16 pb-8 mb-20 md:mb-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                {/* Column 1: Nova Gardens / Contact */}
                <div>
                  <h3 className="text-2xl font-heading font-bold mb-6 text-biovitam-secondary">
                    Nova Gardens Ltd
                  </h3>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start">
                      <span className="font-bold text-white mr-2">Loc:</span>
                      <span>Off Thika Road, Nairobi, Kenya</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-bold text-white mr-2">Tel:</span>
                      <a href="tel:0742500500" className="hover:text-biovitam-secondary transition-colors">
                        0742 500 500
                      </a>
                    </li>
                    <li className="flex items-center">
                      <span className="font-bold text-white mr-2">Email:</span>
                      <a href="mailto:info@novagardens.co.ke" className="hover:text-biovitam-secondary transition-colors">
                        info@novagardens.co.ke
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Column 2: Regional Presence */}
                <div>
                  <h3 className="text-xl font-heading font-bold mb-6 text-white">
                    Regional Presence
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    <li>
                      <a href="#" className="flex items-center hover:text-biovitam-secondary transition-colors group">
                        <span className="w-2 h-2 bg-biovitam-secondary rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                        Uganda Branch
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center hover:text-biovitam-secondary transition-colors group">
                        <span className="w-2 h-2 bg-biovitam-secondary rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                        Tanzania Branch
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center hover:text-biovitam-secondary transition-colors group">
                        <span className="w-2 h-2 bg-biovitam-secondary rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                        Ethiopia Branch
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Column 3: Quick Links */}
                <div>
                  <h3 className="text-xl font-heading font-bold mb-6 text-white">
                    Quick Links
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    <li><Link to="/products" className="hover:text-biovitam-secondary transition-colors">Our Products</Link></li>
                    <li><Link to="/benefits" className="hover:text-biovitam-secondary transition-colors">Product Science</Link></li>
                    <li><Link to="/contact" className="hover:text-biovitam-secondary transition-colors">Find a Distributor</Link></li>
                    <li><Link to="/contact" className="hover:text-biovitam-secondary transition-colors">Contact Agronomist</Link></li>
                  </ul>
                </div>
              </div>

              {/* Copyright */}
              <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                <p>&copy; {new Date().getFullYear()} Nova Gardens Ltd. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </ThemeProvider >
  )
}

export default App
