import axios from 'axios';
import { toast } from 'sonner';
import { BenefitsPageData, CertificationsPageData, Clientele, CompanyData, ProcessStep, Product, FieldEvent } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

let csrfToken: string | null = null;

const fetchCsrfToken = async () => {
    try {
        const response = await apiClient.get('/csrf-token');
        csrfToken = response.data.csrfToken;
        apiClient.defaults.headers.common['X-CSRF-Token'] = csrfToken;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('CSRF Token acquisition failure. Retrying on state mutation...');
    }
};

// Auto-initialize CSRF but don't block
fetchCsrfToken();


// Axios request interceptor to ensure CSRF token is fetched if missing for mutations
apiClient.interceptors.request.use(async (config) => {
    // Only fetch for non-GET methods if token is missing
    if (config.method !== 'get' && !csrfToken) {
        try {
            await fetchCsrfToken();
        } catch (error) {
            console.warn('Silent failure fetching CSRF token before mutation.');
        }
    }
    return config;
}, (error) => Promise.reject(error));

// Axios response interceptor for global error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Log the full error to console for easier debugging by the user/admin
        console.error('API Error:', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            data: error.response?.data
        });

        const message = error.response?.data?.error || error.response?.data?.message || 'Something went wrong. Our agronomists have been notified. Please try again later.';
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    async getEvents(): Promise<FieldEvent[]> {
        const res = await apiClient.get('/events');
        return res.data;
    },
    async addEvent(data: Omit<FieldEvent, 'id'>, adminKey: string): Promise<FieldEvent> {
        const res = await apiClient.post('/events', data, {
            headers: {
                'x-admin-key': adminKey
            }
        });
        return res.data;
    },
    async updateEvent(id: number, data: Partial<FieldEvent>, adminKey: string): Promise<FieldEvent> {
        const res = await apiClient.put(`/events/${id}`, data, {
            headers: {
                'x-admin-key': adminKey
            }
        });
        return res.data;
    },
    async deleteEvent(id: number, adminKey: string): Promise<void> {
        await apiClient.delete(`/events/${id}`, {
            headers: {
                'x-admin-key': adminKey
            }
        });
    },
    async reorderEvents(events: FieldEvent[], adminKey: string): Promise<void> {
        await apiClient.put('/events/reorder', { events }, {
            headers: {
                'x-admin-key': adminKey
            }
        });
    },
    async uploadFile(file: File, adminKey: string): Promise<{ url: string, thumbnailUrl?: string }> {
        const formData = new FormData();
        formData.append('file', file);
        const res = await apiClient.post('/v1/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-admin-key': adminKey
            }
        });
        return res.data;
    },
    async contact(data: { name: string, email: string, phone?: string, subject?: string, message: string }) {
        const res = await apiClient.post('/contact', data);
        return res.data;
    }
};
