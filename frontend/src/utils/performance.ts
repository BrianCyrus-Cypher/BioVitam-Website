/**
 * Performance monitoring and optimization utilities
 */

// Simple development check
const isDev = false // Set to true for development

// Report Web Vitals
export function reportWebVitals() {
  // Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as any
        if (import.meta.env.DEV) {
          console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime)
        }
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // Cumulative Layout Shift (CLS)
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const anyEntry = entry as any
          if (!anyEntry.hadRecentInput) {
            clsValue += anyEntry.value
            if (isDev) {
              console.log('CLS:', clsValue)
            }
          }
        }
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (import.meta.env.DEV) {
            console.log('FID:', entry.processingDuration)
          }
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })
    } catch (error) {
      console.error('Error setting up performance observers:', error)
    }
  }
}

// Prefetch resources
export function prefetchResource(url: string, as: 'script' | 'style' | 'font' = 'script') {
  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.as = as
  link.href = url
  document.head.appendChild(link)
}

// Lazy load images
export function observeLazyImages() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.removeAttribute('data-src')
            imageObserver.unobserve(img)
          }
        }
      })
    })

    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img)
    })
  }
}

// Measure route navigation time
export function measureRoutePerformance(routeName: string) {
  const startTime = performance.now()
  
  return () => {
    const endTime = performance.now()
    const duration = endTime - startTime
    if (import.meta.env.DEV) {
      console.log(`Route ${routeName} loaded in ${duration.toFixed(2)}ms`)
    }
  }
}
