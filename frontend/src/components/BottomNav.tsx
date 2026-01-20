import { Home, Package, Info, Mail, User } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export function BottomNav() {
    const location = useLocation()

    const navItems = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Products', path: '/products', icon: Package },
        { name: 'Profile', path: '/profile', icon: User },
        { name: 'Benefits', path: '/benefits', icon: Info },
        { name: 'Contact', path: '/contact', icon: Mail },
    ]

    return (
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
            <nav className="glass-panel rounded-full px-6 py-3 flex items-center justify-between shadow-2xl border-white/20 dark:border-white/10">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path
                    const Icon = item.icon

                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="relative flex flex-col items-center justify-center p-2"
                        >
                            <Icon
                                size={24}
                                className={`transition-colors duration-300 ${isActive ? 'text-biovitam-primary' : 'text-gray-500 dark:text-gray-400'}`}
                            />
                            {isActive && (
                                <motion.div
                                    layoutId="bottom-nav-indicator"
                                    className="absolute -bottom-1 w-1 h-1 bg-biovitam-primary rounded-full"
                                />
                            )}
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}
