import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IMAGE_DIMENSIONS } from '../../utils/imageOptimization'

interface OptimizedImageProps {
    src: string
    alt: string
    className?: string
    width?: number | string
    height?: number | string
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
    priority?: boolean
    aspectRatio?: string
    sizes?: string
    fetchPriority?: 'high' | 'low' | 'auto'
}

export const OptimizedImage = ({
    src,
    alt,
    className = '',
    width,
    height,
    objectFit = 'cover',
    priority = false,
    aspectRatio,
    sizes,
    fetchPriority = 'auto'
}: OptimizedImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(false)

    // Preload priority images to ensure they appear as fast as possible
    // without waiting for the component to mount or the lazy-loading intersection
    useEffect(() => {
        if (priority) {
            const img = new Image()
            img.src = src
            img.onload = () => setIsLoaded(true)
            img.onerror = () => setError(true)
        }
    }, [src, priority])

    // Calculate explicit dimensions to prevent layout shift (CLS)
    const imgWidth = width || (aspectRatio ? IMAGE_DIMENSIONS.CARD.width : undefined)
    const imgHeight = height || (aspectRatio ? IMAGE_DIMENSIONS.CARD.height : undefined)

    return (
        <div
            className={`relative overflow-hidden bg-gray-100 dark:bg-gray-800 ${className}`}
            style={{ 
                width: imgWidth, 
                height: imgHeight,
                aspectRatio: aspectRatio 
            }}
        >
            <AnimatePresence>
                {/* Placeholder / Spinner displayed until image is fully cached in memory */}
                {!isLoaded && !error && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse"
                    >
                        <div className="w-8 h-8 rounded-full border-2 border-biovitam-primary/20 border-t-biovitam-primary animate-spin" />
                    </motion.div>
                )}
            </AnimatePresence>

            <img
                src={src}
                alt={alt}
                width={imgWidth}
                height={imgHeight}
                loading={priority ? 'eager' : 'lazy'}
                fetchPriority={fetchPriority}
                sizes={sizes}
                onLoad={() => setIsLoaded(true)}
                onError={() => setError(true)}
                decoding="async"
                className={`w-full h-full object-${objectFit} transition-opacity duration-500 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ 
                    willChange: isLoaded ? 'auto' : 'opacity',
                    contentVisibility: 'auto'
                }}
            />

            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 text-xs text-center p-4">
                    <div className="flex flex-col items-center gap-2">
                        <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Failed to load image</span>
                    </div>
                </div>
            )}
        </div>
    )
}
