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
        <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-md">
            <nav className="bg-white/80 dark:bg-biovitam-dark/80 backdrop-blur-xl rounded-2xl p-2 flex items-center justify-around shadow-2xl border border-white/20 dark:border-white/10 ring-1 ring-black/5">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path
                    const Icon = item.icon

                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="relative flex flex-col items-center justify-center py-2 px-1 min-w-[64px] transition-all active:scale-95"
                        >
                            <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-biovitam-primary/10 text-biovitam-primary' : 'text-gray-500 dark:text-gray-400'}`}>
                                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                            </div>
                            <span className={`text-[10px] mt-1 font-bold tracking-tight transition-colors ${isActive ? 'text-biovitam-primary' : 'text-gray-500 dark:text-gray-400'}`}>
                                {item.name}
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="bottom-nav-indicator"
                                    className="absolute -bottom-1 w-6 h-1 bg-biovitam-primary rounded-full"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}
