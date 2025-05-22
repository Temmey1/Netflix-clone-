const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchFromTMDB(endpoint: string, queryParams: Record<string, string> = {}) {
  try {
    const queryString = new URLSearchParams({ api_key: API_KEY!, ...queryParams }).toString();
    const url = `${BASE_URL}${endpoint}?${queryString}`;

    const res = await fetch(url, {
      cache: 'no-store', 
    });

    if (!res.ok) {
      console.error(`TMDB fetch failed: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    return data.results || [];

  } catch (error) {
    console.error('TMDB Network error:', error);
    return [];
  }
}
