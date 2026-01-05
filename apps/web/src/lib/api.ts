const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function fetchAPI<T>(path: string): Promise<T> {
    const res = await fetch(`${API_URL}${path}`, {
        cache: 'no-store', // Disable caching for MVP to ensure fresh data
    });
    if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }
    return res.json();
}
