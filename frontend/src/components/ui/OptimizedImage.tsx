import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface OptimizedImageProps {
    src: string
    alt: string
    className?: string
    width?: number | string
    height?: number | string
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
    priority?: boolean
}

export const OptimizedImage = ({
    src,
    alt,
    className = '',
    width,
    height,
    objectFit = 'cover',
    priority = false
}: OptimizedImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (priority) {
            const img = new Image()
            img.src = src
            img.onload = () => setIsLoaded(true)
            img.onerror = () => setError(true)
        }
    }, [src, priority])

    return (
        <div
            className={`relative overflow-hidden bg-gray-100 dark:bg-gray-800 ${className}`}
            style={{ width, height }}
        >
            <AnimatePresence>
                {!isLoaded && !error && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse"
                    >
                        <div className="w-8 h-8 rounded-full border-2 border-biovitam-primary/20 border-t-biovitam-primary animate-spin" />
                    </motion.div>
                )}
            </AnimatePresence>

            <img
                src={src}
                alt={alt}
                loading={priority ? 'eager' : 'lazy'}
                onLoad={() => setIsLoaded(true)}
                onError={() => setError(true)}
                className={`w-full h-full object-${objectFit} transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
            />

            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 text-xs text-center p-4">
                    Failed to load image
                </div>
            )}
        </div>
    )
}
