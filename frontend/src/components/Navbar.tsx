import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from './ui/Button'

import BiovitamLogo from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { prefetchResource } from '../utils/performance'

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
    { name: 'About', path: '/about' },
    { name: 'Product', path: '/products' },
    { name: 'Profile', path: '/profile' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <nav
      className={`fixed top-2 sm:top-4 left-4 sm:left-6 md:left-10 right-4 sm:right-6 md:right-10 z-navbar transition-all duration-300 rounded-[2rem] ${isScrolled
        ? 'glass-panel shadow-2xl py-1'
        : 'bg-black/20 backdrop-blur-md border border-white/10 py-2'
        }`}
    >
      <div className="content-container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <BiovitamLogo size="sm" variant={isScrolled ? 'light' : 'light'} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <div className="flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onMouseEnter={() => prefetchResource(link.path)}
                  className={`text-base lg:text-lg font-black tracking-tight transition-all hover:scale-110 hover:text-biovitam-secondary navbar-text-glow ${location.pathname === link.path
                    ? 'text-biovitam-secondary italic underline underline-offset-8 scale-110'
                    : 'text-biovitam-dark dark:text-white'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="pl-6 border-l border-white/20 dark:border-white/10 flex items-center h-8">
              <ThemeToggle />
            </div>
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
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-biovitam-primary transition-all p-3 rounded-lg active:bg-gray-100 dark:active:bg-gray-800"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} className="navbar-icon-glow" /> : <Menu size={28} className="navbar-icon-glow" />}
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
            className="md:hidden glass-panel border-t border-white/10 overflow-hidden rounded-b-[2rem]"
          >
            <div className="px-4 pt-4 pb-8 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block py-3 text-xl font-black tracking-tight transition-all active:scale-95 ${location.pathname === link.path
                    ? 'text-biovitam-primary italic scale-105 ml-2'
                    : 'text-biovitam-dark dark:text-gray-100 hover:text-biovitam-primary'
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
                <Button className="w-full justify-center py-6 text-lg font-bold" onClick={() => {
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
