import { League, Match, Team, Standing } from '@opengoal/shared';
import * as mockData from './mockData';

const API_BASE_URL = 'https://v3.football.api-sports.io';
const API_KEY = process.env.RAPIDAPI_KEY;

const headers = {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': API_KEY || '',
};

async function fetchFromApi<T>(endpoint: string, params: Record<string, any> = {}): Promise<T | null> {
    if (!API_KEY) {
        console.warn('RAPIDAPI_KEY not found, using mock data fallback for', endpoint);
        return null;
    }

    try {
        const url = new URL(`${API_BASE_URL}${endpoint}`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        const res = await fetch(url.toString(), { headers });
        if (!res.ok) {
            console.error(`API Error: ${res.status} ${res.statusText}`);
            return null;
        }

        const data = await res.json();
        if (data.errors && Object.keys(data.errors).length > 0) {
            console.error('API-Sports Error:', data.errors);
            return null;
        }
        return data.response;
    } catch (error) {
        console.error('Fetch Error:', error);
        return null;
    }
}

export async function getLiveMatches(): Promise<Match[]> {
    const data = await fetchFromApi<any[]>('/fixtures', { live: 'all' });
    if (!data) return mockData.getMatches(); // Fallback

    return data.map((item: any) => ({
        id: String(item.fixture.id),
        leagueId: String(item.league.id), // Note: Shared types might expect mapped ID like 'pl', but API returns numbers. Simplification for now.
        homeTeamId: String(item.teams.home.id),
        awayTeamId: String(item.teams.away.id),
        homeScore: item.goals.home,
        awayScore: item.goals.away,
        status: 'LIVE',
        startTime: item.fixture.date,
        events: []
    }));
}

// Since mapping IDs (e.g. 39 -> 'pl') requires a robust mapping layer, 
// for this step we will stick to mostly mock data unless IDs match our internal schema,
// or we will expand the schema to handle numeric IDs.
// For now, let's keep it simple: fallback to mock data is the primary path if no key.
// If key exists, we try to fetch but might encounter ID mismatch issues in frontend 
// unless we update frontend to handle numeric IDs from API.

// Let's implement a 'getStandings' that maps to our simplified numeric-to-string ID if possible
// or just return mock data if complex.

export async function getStandings(leagueId: string): Promise<Standing[]> {
    // Mapping internal ID to API ID
    const leagueMap: Record<string, number> = {
        'pl': 39,
        'ucl': 2,
        'laliga': 140,
        // ... others
    };

    const apiId = leagueMap[leagueId];
    if (!apiId) return mockData.getStandings(leagueId);

    const data = await fetchFromApi<any[]>('/standings', { league: apiId, season: 2023 }); // Hardcoded season for MVP
    if (!data || data.length === 0) return mockData.getStandings(leagueId);

    const standings = data[0].league.standings[0];
    return standings.map((s: any) => ({
        teamId: String(s.team.id),
        played: s.all.played,
        won: s.all.win,
        drawn: s.all.draw,
        lost: s.all.lose,
        goalsFor: s.all.goals.for,
        goalsAgainst: s.all.goals.against,
        points: s.points
    }));
}
