import React from 'react';
import { OptimizedImage } from './ui/OptimizedImage';
import { IMAGE_DIMENSIONS, getResponsiveSizes } from '../utils/imageOptimization';

interface ResponsiveImageProps {
    src: string;
    alt: string;
    className?: string;
    variant?: 'hero' | 'card' | 'thumbnail' | 'product' | 'gallery' | 'banner';
    priority?: boolean;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

/**
 * Responsive image component with automatic sizing and optimization
 * Uses predefined dimensions to prevent layout shift (CLS)
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
    src,
    alt,
    className = '',
    variant = 'card',
    priority = false,
    objectFit = 'cover',
}) => {
    const dimensions = IMAGE_DIMENSIONS[variant.toUpperCase() as keyof typeof IMAGE_DIMENSIONS];
    
    if (!dimensions) {
        console.warn(`Invalid image variant: ${variant}. Using 'card' as fallback.`);
    }

    const { width, height, aspectRatio } = dimensions || IMAGE_DIMENSIONS.CARD;
    const sizes = getResponsiveSizes(width);

    return (
        <OptimizedImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            aspectRatio={aspectRatio}
            sizes={sizes}
            priority={priority}
            objectFit={objectFit}
            fetchPriority={priority ? 'high' : 'auto'}
            className={className}
        />
    );
};
