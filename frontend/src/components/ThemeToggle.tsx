import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import { Button } from "./ui/Button"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export function ThemeToggle() {
    const { setTheme, theme } = useTheme()
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = () => setIsOpen(!isOpen)

    return (
        <div className="relative">
            <Button
                variant="outline"
                size="icon"
                onClick={toggleOpen}
                className="w-10 h-10 rounded-full bg-white/10 border-white/20 backdrop-blur-md dark:bg-black/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
            >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-biovitam-dark dark:text-white" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-biovitam-dark dark:text-white" />
                <span className="sr-only">Toggle theme</span>
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="absolute right-0 mt-2 w-36 rounded-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl z-50 overflow-hidden"
                        >
                            <div className="p-1 space-y-1">
                                <button onClick={() => { setTheme("light"); setIsOpen(false) }} className={`flex items-center w-full px-3 py-2 text-sm rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${theme === 'light' ? 'text-biovitam-primary font-bold' : 'text-gray-600 dark:text-gray-300'}`}>
                                    <Sun className="mr-2 h-4 w-4" /> Light
                                </button>
                                <button onClick={() => { setTheme("dark"); setIsOpen(false) }} className={`flex items-center w-full px-3 py-2 text-sm rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${theme === 'dark' ? 'text-biovitam-primary font-bold' : 'text-gray-600 dark:text-gray-300'}`}>
                                    <Moon className="mr-2 h-4 w-4" /> Dark
                                </button>
                                <button onClick={() => { setTheme("system"); setIsOpen(false) }} className={`flex items-center w-full px-3 py-2 text-sm rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${theme === 'system' ? 'text-biovitam-primary font-bold' : 'text-gray-600 dark:text-gray-300'}`}>
                                    <Laptop className="mr-2 h-4 w-4" /> System
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
