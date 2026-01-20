import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from './ui/Button'

import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Profile', path: '/profile' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Science', path: '/benefits' },
    { name: 'Clientele', path: '/clientele' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? 'glass-panel border-b-0 shadow-sm py-2'
        : 'bg-transparent py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-biovitam-primary rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-2xl font-heading font-bold text-biovitam-primary">
              Biovitam
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors hover:text-biovitam-primary ${location.pathname === link.path
                  ? 'text-biovitam-primary'
                  : 'text-gray-600 dark:text-gray-300'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              variant="primary"
              size="md"
              className="shadow-lg shadow-biovitam-primary/20 hover:shadow-xl hover:shadow-biovitam-primary/30"
              onClick={() => window.location.href = '/contact'}
            >
              Contact an Agronomist
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-biovitam-primary transition-colors p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block py-2 text-lg font-medium ${location.pathname === link.path
                    ? 'text-biovitam-primary'
                    : 'text-gray-600'
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center justify-between px-2 pt-2">
                <span className="text-gray-600 dark:text-gray-400 font-medium">Theme</span>
                <ThemeToggle />
              </div>
              <div className="pt-4">
                <Button className="w-full justify-center" onClick={() => {
                  window.location.href = '/contact';
                  setIsOpen(false);
                }}>
                  Contact an Agronomist
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
