import { League, Match, Team, Standing } from '@opengoal/shared';
import * as mockData from './mockData';

const API_BASE_URL = 'https://v3.football.api-sports.io';
const API_KEY = process.env.API_FOOTBALL_KEY;

const headers = {
    'x-apisports-key': API_KEY || '',
};

async function fetchFromApi<T>(endpoint: string, params: Record<string, any> = {}): Promise<T | null> {
    if (!API_KEY) {
        console.warn('API_FOOTBALL_KEY not found, using mock data fallback for', endpoint);
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
            // API-Sports returns errors as an object or array depending on the error
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
        leagueId: String(item.league.id),
        homeTeamId: String(item.teams.home.id),
        awayTeamId: String(item.teams.away.id),
        homeScore: item.goals.home,
        awayScore: item.goals.away,
        status: 'LIVE',
        startTime: item.fixture.date,
        events: []
    }));
}

export async function getStandings(leagueId: string): Promise<Standing[]> {
    // Mapping internal ID to API ID
    const leagueMap: Record<string, number> = {
        'pl': 39,
        'ucl': 2,
        'laliga': 140,
        'seriea': 135,
        'bundesliga': 78,
        'ligue1': 61
    };

    const apiId = leagueMap[leagueId];
    if (!apiId) return mockData.getStandings(leagueId);

    const data = await fetchFromApi<any[]>('/standings', { league: apiId, season: 2023 });
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
        points: s.points,
        form: s.form,
        description: s.description,
        teamName: s.team.name,
        teamLogo: s.team.logo
    }));
}

export async function getTeam(teamId: string): Promise<Team | null> {
    // If it's not numeric, it's likely a mock ID
    if (isNaN(Number(teamId))) {
        return mockData.getTeam(teamId) || null;
    }

    const data = await fetchFromApi<any[]>('/teams', { id: teamId });
    if (!data || data.length === 0) return null;

    const team = data[0].team;
    return {
        id: String(team.id),
        name: team.name,
        shortName: team.code || team.name.substring(0, 3).toUpperCase(),
        logoUrl: team.logo,
        leagueId: 'unknown' // Teams can belong to multiple leagues, so this is tricky without context
    };
}
