import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'

interface LightboxProps {
    src: string
    alt: string
    isOpen: boolean
    onClose: () => void
}

export function Lightbox({ src, alt, isOpen, onClose }: LightboxProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8"
                    onClick={onClose}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-biovitam-primary transition-colors p-2 bg-black/20 rounded-full"
                        onClick={onClose}
                    >
                        <X size={32} />
                    </button>

                    <motion.img
                        layoutId={`lightbox-${src}`}
                        src={src}
                        alt={alt}
                        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()} // Prevent close on image click
                    />

                    <div className="absolute bottom-8 left-0 right-0 text-center text-white/80 pointer-events-none">
                        <p className="font-heading text-lg font-bold tracking-wider uppercase">{alt}</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
