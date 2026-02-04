import { useEffect } from 'react';
import { preloadImage } from '../utils/imageOptimization';

/**
 * Hook to preload critical images on component mount
 * Useful for hero images and above-the-fold content
 */
export function useImagePreload(images: string[], priority: 'high' | 'low' = 'high') {
  useEffect(() => {
    const preloadPromises = images.map(src => preloadImage(src, priority));
    
    Promise.all(preloadPromises).catch(error => {
      if (import.meta.env.DEV) {
        console.warn('Failed to preload images:', error);
      }
    });
  }, [images, priority]);
}

/**
 * Hook to preload images on hover for faster navigation
 */
export function useHoverPreload(ref: React.RefObject<HTMLElement>, imageSrc: string) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => {
      preloadImage(imageSrc, 'low');
    };

    element.addEventListener('mouseenter', handleMouseEnter, { once: true });

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [ref, imageSrc]);
}
