import React, { useEffect } from 'react';

interface Props {
    componentName: string;
    children: React.ReactNode;
}

/**
 * PerformanceWrapper
 * Measures and logs the render duration of wrapped components.
 */
export const PerformanceWrapper: React.FC<Props> = ({ componentName, children }) => {
    useEffect(() => {
        const start = performance.now();
        return () => {
            const duration = performance.now() - start;
            if (import.meta.env.MODE === 'development') {
                // eslint-disable-next-line no-console
                console.log(`[Performance] ${componentName} rendered in ${duration.toFixed(2)}ms`);
            }
        };
    }, [componentName]);

    return <>{children}</>;
};
