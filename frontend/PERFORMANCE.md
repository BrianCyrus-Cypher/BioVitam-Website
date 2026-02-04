# Performance Optimizations

This document outlines the performance optimizations implemented in the BioVitam website.

## Overview

The website has been optimized for:
- **Fast Initial Load** - Critical resources are preloaded and code is split efficiently
- **Smooth Interactions** - GPU-accelerated animations and optimized re-renders
- **Better UX** - Reduced layout shifts (CLS), fast input response (FID), and quick content paint (LCP)
- **Mobile Performance** - Responsive images and optimized assets for all devices

## Key Optimizations

### 1. Image Optimization

#### Responsive Images
- **Component**: `ResponsiveImage` and `OptimizedImage`
- **Benefits**: 
  - Automatic responsive sizing
  - Lazy loading for off-screen images
  - Explicit width/height to prevent layout shifts
  - Progressive loading with placeholders

```tsx
import { ResponsiveImage } from '@/components/ResponsiveImage';

<ResponsiveImage 
  src="/path/to/image.jpg"
  alt="Description"
  variant="hero" // Predefined sizes: hero, card, thumbnail, product, gallery, banner
  priority={true} // For above-the-fold images
/>
```

#### Image Dimensions
Predefined dimensions prevent Cumulative Layout Shift (CLS):
- Hero: 1920x1080 (16:9)
- Card: 800x600 (4:3)
- Thumbnail: 400x300 (4:3)
- Product: 800x1067 (3:4)
- Gallery: 1200x800 (4:3)
- Banner: 1920x400 (21:9)

### 2. Font Loading

Fonts are preloaded in `index.html`:
```html
<link rel="preload" href="..." as="style" />
```

This prevents FOUT (Flash of Unstyled Text) and improves LCP.

### 3. Code Splitting

#### Automatic Route-Based Splitting
All pages are lazy-loaded:
```tsx
const Home = lazy(() => import('./pages/Home'))
```

#### Vendor Chunking
Dependencies are split into logical chunks:
- `react-vendor`: React, React DOM, React Router
- `animation-vendor`: Framer Motion
- `ui-vendor`: Lucide React, UI utilities
- `vendor`: Other dependencies

### 4. CSS Optimizations

#### GPU Acceleration
```css
.gpu-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

#### Content Visibility
Off-screen content uses `content-visibility: auto` for faster rendering.

#### Reduced Motion
Respects user preferences:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 5. Performance Monitoring

#### Web Vitals Tracking
Monitors key metrics:
- **LCP** (Largest Contentful Paint) - Target: < 2.5s
- **FID** (First Input Delay) - Target: < 100ms
- **CLS** (Cumulative Layout Shift) - Target: < 0.1
- **TTFB** (Time to First Byte) - Target: < 800ms
- **TBT** (Total Blocking Time) - Target: < 200ms

Enable dev logging:
```tsx
// In utils/performance.ts
const isDev = true; // See metrics in console
```

### 6. Lazy Loading

#### Lazy Sections
Use `LazySection` for below-the-fold content:
```tsx
import { LazySection } from '@/components/LazySection';

<LazySection threshold={0.1} rootMargin="100px">
  <HeavyComponent />
</LazySection>
```

#### Image Preloading
Preload critical images:
```tsx
import { useImagePreload } from '@/hooks/useImagePreload';

useImagePreload(['/hero.jpg', '/logo.png'], 'high');
```

### 7. Animation Optimization

#### Dynamic will-change
```tsx
import { optimizeAnimation } from '@/utils/cssOptimization';

optimizeAnimation(element, 'transform');
```

#### RAF Throttling
```tsx
import { rafThrottle } from '@/utils/cssOptimization';

const handleScroll = rafThrottle(() => {
  // Scroll logic
});
```

### 8. Bundle Optimization

#### Minification
- Terser for JS minification
- Drop console logs in production
- CSS code splitting enabled

#### Asset Organization
```
assets/
  ├── images/[name]-[hash].ext
  ├── fonts/[name]-[hash].ext
  └── js/[name]-[hash].js
```

## Performance Checklist

- [x] Preload critical resources (fonts, hero images)
- [x] Lazy load pages and components
- [x] Use responsive images with explicit dimensions
- [x] Enable code splitting and vendor chunking
- [x] Optimize animations with GPU acceleration
- [x] Monitor Web Vitals
- [x] Reduce bundle size with minification
- [x] Implement lazy loading for images
- [x] Add content visibility for off-screen content
- [x] Support reduced motion preferences

## Testing Performance

### Local Development
1. Run `npm run build`
2. Run `npm run preview`
3. Open DevTools > Lighthouse
4. Run performance audit

### Production
Monitor real user metrics with Sentry or Google Analytics.

## Future Optimizations

- [ ] Implement Service Worker for offline support
- [ ] Add HTTP/2 Server Push
- [ ] Optimize images with WebP/AVIF formats
- [ ] Implement virtual scrolling for long lists
- [ ] Add edge caching with CDN
- [ ] Implement progressive hydration

## Resources

- [Web Vitals](https://web.dev/vitals/)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Vite Build Optimizations](https://vitejs.dev/guide/build.html)
