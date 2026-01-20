const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const api = {
    async getCompany() {
        const res = await fetch(`${API_BASE_URL}/company`);
        if (!res.ok) throw new Error('Failed to fetch company data');
        return res.json();
    },
    async getProducts() {
        const res = await fetch(`${API_BASE_URL}/products`);
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
    },
    async getClientele() {
        const res = await fetch(`${API_BASE_URL}/clientele`);
        if (!res.ok) throw new Error('Failed to fetch clientele');
        return res.json();
    },
    async getTimeline() {
        const res = await fetch(`${API_BASE_URL}/timeline`);
        if (!res.ok) throw new Error('Failed to fetch timeline');
        return res.json();
    },
    async getProcessSteps() {
        const res = await fetch(`${API_BASE_URL}/process-steps`);
        if (!res.ok) throw new Error('Failed to fetch process steps');
        return res.json();
    },
    async contact(data: { name: string, email: string, phone?: string, subject?: string, message: string }) {
        const res = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to send message');
        return res.json();
    }
};
