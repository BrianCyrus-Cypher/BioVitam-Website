import axios from 'axios';
import { toast } from 'sonner';
import { BenefitsPageData, CertificationsPageData, Clientele, CompanyData, ProcessStep, Product } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Axios response interceptor for global error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.error || error.response?.data?.message || 'Something went wrong. Please try again later.';
        toast.error(message);
        return Promise.reject(error);
    }
);

export const api = {
    async getCompany(): Promise<CompanyData> {
        const res = await apiClient.get('/company');
        return res.data;
    },
    async getProducts(): Promise<Product[]> {
        const res = await apiClient.get('/products');
        return res.data;
    },
    async getClientele(): Promise<Clientele[]> {
        const res = await apiClient.get('/clientele');
        return res.data;
    },
    async getTimeline(): Promise<any[]> {
        const res = await apiClient.get('/timeline');
        return res.data;
    },
    async getProcessSteps(): Promise<ProcessStep[]> {
        const res = await apiClient.get('/process-steps');
        return res.data;
    },
    async getBenefitsPage(): Promise<BenefitsPageData> {
        const res = await apiClient.get('/benefits-page');
        return res.data;
    },
    async getCertificationsPage(): Promise<CertificationsPageData> {
        const res = await apiClient.get('/certifications-page');
        return res.data;
    },
    async contact(data: { name: string, email: string, phone?: string, subject?: string, message: string }) {
        const res = await apiClient.post('/contact', data);
        return res.data;
    }
};
