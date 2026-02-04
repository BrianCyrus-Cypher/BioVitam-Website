/**
 * Image optimization utilities for performance and layout stability
 */

// Standard aspect ratios for consistent layout
export const ASPECT_RATIOS = {
  SQUARE: '1:1',
  LANDSCAPE: '16:9',
  PORTRAIT: '9:16',
  WIDE: '21:9',
  CARD: '4:3',
  PRODUCT: '3:4',
} as const;

// Breakpoints for responsive images
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Standard image dimensions to prevent CLS (Cumulative Layout Shift)
export const IMAGE_DIMENSIONS = {
  HERO: {
    width: 1920,
    height: 1080,
    aspectRatio: ASPECT_RATIOS.LANDSCAPE,
  },
  CARD: {
    width: 800,
    height: 600,
    aspectRatio: ASPECT_RATIOS.CARD,
  },
  THUMBNAIL: {
    width: 400,
    height: 300,
    aspectRatio: ASPECT_RATIOS.CARD,
  },
  PRODUCT: {
    width: 800,
    height: 1067,
    aspectRatio: ASPECT_RATIOS.PRODUCT,
  },
  GALLERY: {
    width: 1200,
    height: 800,
    aspectRatio: ASPECT_RATIOS.CARD,
  },
  AVATAR: {
    width: 200,
    height: 200,
    aspectRatio: ASPECT_RATIOS.SQUARE,
  },
  BANNER: {
    width: 1920,
    height: 400,
    aspectRatio: ASPECT_RATIOS.WIDE,
  },
} as const;

// Calculate responsive image sizes
export function getResponsiveSizes(baseWidth: number, breakpoints?: typeof BREAKPOINTS): string {
  const bp = breakpoints || BREAKPOINTS;
  return `(max-width: ${bp.SM}px) ${Math.round(baseWidth * 0.5)}px, 
          (max-width: ${bp.MD}px) ${Math.round(baseWidth * 0.7)}px, 
          (max-width: ${bp.LG}px) ${Math.round(baseWidth * 0.85)}px, 
          ${baseWidth}px`;
}

// Generate srcset for responsive images
export function generateSrcSet(baseSrc: string, widths: number[]): string {
  return widths.map(width => `${baseSrc}?w=${width} ${width}w`).join(', ');
}

// Get optimal image format based on browser support
export function getOptimalFormat(): 'webp' | 'avif' | 'jpg' {
  if (typeof window === 'undefined') return 'jpg';
  
  const canvas = document.createElement('canvas');
  const supportsWebP = canvas.toDataURL('image/webp').startsWith('data:image/webp');
  
  // Note: AVIF support check would require more complex detection
  return supportsWebP ? 'webp' : 'jpg';
}

// Lazy load image with Intersection Observer
export function lazyLoadImage(img: HTMLImageElement, src: string, options?: IntersectionObserverInit) {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.01,
    ...options,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLImageElement;
        target.src = src;
        target.classList.remove('lazy');
        observer.unobserve(target);
      }
    });
  }, defaultOptions);

  observer.observe(img);
  return observer;
}

// Preload critical images
export function preloadImage(src: string, priority: 'high' | 'low' = 'low'): Promise<void> {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    if (priority === 'high') {
      link.setAttribute('fetchpriority', 'high');
    }
    link.onload = () => resolve();
    link.onerror = reject;
    document.head.appendChild(link);
  });
}

// Get image dimensions from URL or calculate from aspect ratio
export function calculateDimensions(
  aspectRatio: string,
  width?: number,
  height?: number
): { width: number; height: number } {
  const [widthRatio, heightRatio] = aspectRatio.split(':').map(Number);
  
  if (width && !height) {
    return { width, height: Math.round((width * heightRatio) / widthRatio) };
  }
  
  if (height && !width) {
    return { width: Math.round((height * widthRatio) / heightRatio), height };
  }
  
  return { width: width || 800, height: height || 600 };
}

// Image loading strategy types
export type LoadingStrategy = 'eager' | 'lazy' | 'auto';
export type FetchPriority = 'high' | 'low' | 'auto';

// Get loading strategy based on viewport position
export function getLoadingStrategy(isAboveFold: boolean): LoadingStrategy {
  return isAboveFold ? 'eager' : 'lazy';
}

// Get fetch priority based on importance
export function getFetchPriority(isCritical: boolean): FetchPriority {
  return isCritical ? 'high' : 'auto';
}
