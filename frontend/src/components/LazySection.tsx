import React, { useEffect, useRef, useState } from 'react';
import { createLazyObserver } from '../utils/cssOptimization';

interface LazySectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  fallback?: React.ReactNode;
}

/**
 * Lazy load section component for better performance
 * Only renders children when they enter the viewport
 */
export const LazySection: React.FC<LazySectionProps> = ({
  children,
  className = '',
  threshold = 0.01,
  rootMargin = '100px',
  fallback = null,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = createLazyObserver(
      (entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={sectionRef} className={className}>
      {isVisible ? children : fallback}
    </div>
  );
};
