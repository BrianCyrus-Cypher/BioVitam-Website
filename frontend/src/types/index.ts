export interface CompanyData {
    name: string;
    brand: string;
    tagline: string;
    about: {
        description: string;
        mission: string;
        vision: string;
        objectives: string[];
    };
    qualityAssurance: {
        standards: string;
        batchControl: string;
        production: string;
        safety: string;
        agronomy: string;
    };
    structure?: {
        leadership: Array<{ role: string, children: string[] }>;
    };
    certifications?: Array<{
        body: string;
        name: string;
        logo: string;
        description: string;
    }>;
}

export interface Product {
    id: string;
    name: string;
    formula: string;
    npk: string;
    focus: string;
    description: string;
    benefits: string[];
    usage: string;
    packaging: string;
    idealFor: string[];
    image?: string;
}

export interface Clientele {
    id: number;
    name: string;
    location: string;
    category: string;
    feedback: string;
    stat: string;
}

export interface ProcessStep {
    id: number;
    title: string;
    description: string;
    details?: string;
    technical: string;
    matrix: Record<string, string>;
    icon?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface BenefitsPageData {
    intro: {
        title: string;
        description: string;
    };
    benefits: Array<{
        title: string;
        description: string;
        metrics: string[];
    }>;
    results: {
        traditional: string[];
        biovitam: string[];
    };
    scienceTestimonials: Array<{
        quote: string;
        author: string;
        farm: string;
    }>;
}

export interface CertificationsPageData {
    intro: string;
    accreditations: Array<{
        title: string;
        subtitle: string;
        description: string;
    }>;
}

export interface FieldEvent {
    id: number;
    title: string;
    date: string;
    location: string;
    image: string;
    description: string;
}
