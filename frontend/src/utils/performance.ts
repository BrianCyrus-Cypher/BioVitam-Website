/**
 * Performance monitoring and optimization utilities
 */

// Simple development check
const isDev = import.meta.env.DEV;

// Report Web Vitals with enhanced metrics
export function reportWebVitals() {
  if (!('PerformanceObserver' in window)) {
    console.warn('PerformanceObserver not supported');
    return;
  }

  try {
    // Largest Contentful Paint (LCP) - Target: < 2.5s
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      const lcpValue = lastEntry.renderTime || lastEntry.loadTime;
      
      if (isDev) {
        console.log('✅ LCP:', `${lcpValue.toFixed(2)}ms`, lcpValue < 2500 ? '(Good)' : '(Needs improvement)');
      }
      
      // Send to analytics if configured
      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          name: 'LCP',
          value: Math.round(lcpValue),
          event_category: 'Performance',
        });
      }
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Cumulative Layout Shift (CLS) - Target: < 0.1
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const anyEntry = entry as any;
        if (!anyEntry.hadRecentInput) {
          clsValue += anyEntry.value;
        }
      }
      
      if (isDev) {
        console.log('✅ CLS:', clsValue.toFixed(4), clsValue < 0.1 ? '(Good)' : '(Needs improvement)');
      }
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // First Input Delay (FID) - Target: < 100ms
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        const fidValue = entry.processingDuration;
        
        if (isDev) {
          console.log('✅ FID:', `${fidValue.toFixed(2)}ms`, fidValue < 100 ? '(Good)' : '(Needs improvement)');
        }
        
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            name: 'FID',
            value: Math.round(fidValue),
            event_category: 'Performance',
          });
        }
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Time to First Byte (TTFB) - Target: < 800ms
    const navigationObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        const ttfb = entry.responseStart - entry.requestStart;
        
        if (isDev) {
          console.log('✅ TTFB:', `${ttfb.toFixed(2)}ms`, ttfb < 800 ? '(Good)' : '(Needs improvement)');
        }
      });
    });
    navigationObserver.observe({ entryTypes: ['navigation'] });

    // Total Blocking Time (TBT) approximation
    let tbtValue = 0;
    const tbtObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (entry.duration > 50) {
          tbtValue += entry.duration - 50;
        }
      });
      
      if (isDev && tbtValue > 0) {
        console.log('✅ TBT (approx):', `${tbtValue.toFixed(2)}ms`, tbtValue < 200 ? '(Good)' : '(Needs improvement)');
      }
    });
    tbtObserver.observe({ entryTypes: ['longtask'] });

  } catch (error) {
    console.error('Error setting up performance observers:', error);
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
