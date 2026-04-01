const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = {
    // Registries
    getRegistries: async () => {
        const res = await fetch(`${API_BASE_URL}/registries`);
        return res.json();
    },
    getRegistry: async (id: string) => {
        const res = await fetch(`${API_BASE_URL}/registries/${id}`);
        return res.json();
    },
    createRegistry: async (data: any) => {
        const res = await fetch(`${API_BASE_URL}/registries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    },
    updateRegistry: async (id: string, data: any) => {
        const res = await fetch(`${API_BASE_URL}/registries/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    },

    // Purchases
    getPurchases: async (registryId: string) => {
        const res = await fetch(`${API_BASE_URL}/purchases/registry/${registryId}`);
        return res.json();
    },
    createPurchase: async (data: any) => {
        const res = await fetch(`${API_BASE_URL}/purchases`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    },
    confirmPurchase: async (id: string) => {
        const res = await fetch(`${API_BASE_URL}/purchases/${id}/confirm`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' }
        });
        return res.json();
    }
};
