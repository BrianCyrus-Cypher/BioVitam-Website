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
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-biovitam-dark dark:text-white navbar-icon-glow" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-biovitam-dark dark:text-white navbar-icon-glow" />
                <span className="sr-only">Toggle theme</span>
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-[55]" onClick={() => setIsOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="absolute right-0 mt-4 w-48 rounded-[2.5rem] bg-white/95 dark:bg-biovitam-dark/95 border border-white/40 dark:border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-dropdown overflow-hidden backdrop-blur-2xl p-2"
                        >
                            <div className="space-y-1.5">
                                <button onClick={() => { setTheme("light"); setIsOpen(false) }} className={`flex items-center w-full px-5 py-4 text-base rounded-[1.5rem] transition-all ${theme === 'light' ? 'bg-biovitam-primary text-white font-black shadow-lg shadow-biovitam-primary/20' : 'text-gray-700 dark:text-gray-200 hover:bg-biovitam-primary/10 active:scale-95'}`}>
                                    <Sun className="mr-4 h-5 w-5" /> Light
                                </button>
                                <button onClick={() => { setTheme("dark"); setIsOpen(false) }} className={`flex items-center w-full px-5 py-4 text-base rounded-[1.5rem] transition-all ${theme === 'dark' ? 'bg-biovitam-primary text-white font-black shadow-lg shadow-biovitam-primary/20' : 'text-gray-700 dark:text-gray-200 hover:bg-biovitam-primary/10 active:scale-95'}`}>
                                    <Moon className="mr-4 h-5 w-5" /> Dark
                                </button>
                                <button onClick={() => { setTheme("system"); setIsOpen(false) }} className={`flex items-center w-full px-5 py-4 text-base rounded-[1.5rem] transition-all ${theme === 'system' ? 'bg-biovitam-primary text-white font-black shadow-lg shadow-biovitam-primary/20' : 'text-gray-700 dark:text-gray-200 hover:bg-biovitam-primary/10 active:scale-95'}`}>
                                    <Laptop className="mr-4 h-5 w-5" /> System
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
