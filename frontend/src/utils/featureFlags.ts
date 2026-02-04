/**
 * Feature Flag Utility
 * Used for A/B testing and phased feature rollouts.
 * In a real-world scenario, these values would be fetched from 
 * a service like Unleash, LaunchDarkly, or a custom backend endpoint.
 */

interface FeatureFlags {
    enableNewHeroDesign: boolean;
    enableVideoTestimonials: boolean;
    abTestButtonColor: 'primary' | 'secondary';
}

const DEFAULT_FLAGS: FeatureFlags = {
    enableNewHeroDesign: import.meta.env.VITE_ENABLE_NEW_HERO === 'true',
    enableVideoTestimonials: false,
    abTestButtonColor: 'primary',
};

export const getFeatureFlag = <K extends keyof FeatureFlags>(key: K): FeatureFlags[K] => {
    return DEFAULT_FLAGS[key];
};

/**
 * Simple A/B Test Variant Selector
 * Assigns a variant based on a seed (e.g., user ID or random)
 */
export const getABVariant = (testName: string, userId?: string): string => {
    const seed = `${testName}-${userId || Math.random().toString()}`;
    // Simple deterministic hash-like logic for variant assignment
    const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return hash % 2 === 0 ? 'A' : 'B';
};
