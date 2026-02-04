/**
 * CSS and rendering optimization utilities
 */

// Debounce function for scroll and resize events
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for frequent events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Request Animation Frame wrapper for smooth animations
export function rafThrottle<T extends (...args: any[]) => any>(
  callback: T
): (...args: Parameters<T>) => void {
  let requestId: number | null = null;
  
  return function throttled(...args: Parameters<T>) {
    if (requestId === null) {
      requestId = requestAnimationFrame(() => {
        callback(...args);
        requestId = null;
      });
    }
  };
}

// Add will-change property dynamically during animations
export function optimizeAnimation(element: HTMLElement, property: string) {
  element.style.willChange = property;
  
  // Remove will-change after animation completes to free up resources
  const removeWillChange = () => {
    element.style.willChange = 'auto';
    element.removeEventListener('animationend', removeWillChange);
    element.removeEventListener('transitionend', removeWillChange);
  };
  
  element.addEventListener('animationend', removeWillChange);
  element.addEventListener('transitionend', removeWillChange);
}

// Detect if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Force GPU acceleration for smooth animations
export function enableGPUAcceleration(element: HTMLElement) {
  element.style.transform = 'translateZ(0)';
  element.style.backfaceVisibility = 'hidden';
}

// Content visibility for off-screen content
export function setContentVisibility(element: HTMLElement, visible: boolean) {
  if ('contentVisibility' in element.style) {
    (element.style as any).contentVisibility = visible ? 'auto' : 'hidden';
  }
}

// Optimize font loading
export function optimizeFontLoading() {
  if ('fonts' in document) {
    // Force font loading before rendering
    Promise.all([
      document.fonts.load('400 16px Lato'),
      document.fonts.load('700 16px Lato'),
      document.fonts.load('600 16px Montserrat'),
      document.fonts.load('700 16px Montserrat'),
    ]).then(() => {
      document.documentElement.classList.add('fonts-loaded');
    });
  }
}

// Reduce paint operations by batching DOM updates
export function batchDOMUpdates(updates: (() => void)[]) {
  requestAnimationFrame(() => {
    updates.forEach(update => update());
  });
}

// Check if element is in viewport
export function isInViewport(element: HTMLElement, offset = 0): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -offset &&
    rect.left >= -offset &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
  );
}

// Intersection Observer helper for lazy loading
export function createLazyObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.01,
    ...options,
  };
  
  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, defaultOptions);
}

// Measure rendering performance
export function measureRenderTime(componentName: string, callback: () => void) {
  const startTime = performance.now();
  callback();
  const endTime = performance.now();
  
  if (import.meta.env.DEV) {
    console.log(`⚡ ${componentName} rendered in ${(endTime - startTime).toFixed(2)}ms`);
  }
}
