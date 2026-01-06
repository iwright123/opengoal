import { League, Match, Team, MatchEvent, Standing, Player } from '@opengoal/shared';

// MOCK DATA

export const LEAGUES: League[] = [
    {
        id: 'pl',
        name: 'Premier League',
        country: 'England',
        logoUrl: 'https://media.api-sports.io/football/leagues/39.png'
    },
    {
        id: 'ucl',
        name: 'Champions League',
        country: 'Europe',
        logoUrl: 'https://media.api-sports.io/football/leagues/2.png'
    },
    {
        id: 'laliga',
        name: 'LaLiga',
        country: 'Spain',
        logoUrl: 'https://media.api-sports.io/football/leagues/140.png'
    },
    {
        id: 'wc',
        name: 'FIFA World Cup',
        country: 'International',
        logoUrl: 'https://media.api-sports.io/football/leagues/1.png'
    },
    {
        id: 'bl',
        name: 'Bundesliga',
        country: 'Germany',
        logoUrl: 'https://media.api-sports.io/football/leagues/78.png'
    },
    {
        id: 'mls',
        name: 'MLS',
        country: 'USA',
        logoUrl: 'https://media.api-sports.io/football/leagues/253.png'
    },
    {
        id: 'seriea',
        name: 'Serie A',
        country: 'Italy',
        logoUrl: 'https://media.api-sports.io/football/leagues/135.png'
    },
    {
        id: 'uel',
        name: 'Europa League',
        country: 'Europe',
        logoUrl: 'https://media.api-sports.io/football/leagues/3.png'
    },
    {
        id: 'ligue1',
        name: 'Ligue 1',
        country: 'France',
        logoUrl: 'https://media.api-sports.io/football/leagues/61.png'
    }
];

export const TEAMS: Team[] = [
    { id: 'mcity', name: 'Manchester City', shortName: 'MCI', leagueId: 'pl', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg' },
    { id: 'ars', name: 'Arsenal', shortName: 'ARS', leagueId: 'pl', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg' },
    { id: 'liv', name: 'Liverpool', shortName: 'LIV', leagueId: 'pl', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg' },
    { id: 'tot', name: 'Tottenham', shortName: 'TOT', leagueId: 'pl', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg' },
    { id: 'rm', name: 'Real Madrid', shortName: 'RMA', leagueId: 'ucl', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg' },
    { id: 'bar', name: 'Barcelona', shortName: 'BAR', leagueId: 'ucl', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg' }
];

export const PLAYERS: Player[] = [
    { id: 'p1', name: 'Erling Haaland', teamId: 'mcity', position: 'FW', number: 9 },
    { id: 'p2', name: 'Kevin De Bruyne', teamId: 'mcity', position: 'MF', number: 17 },
    { id: 'p3', name: 'Bukayo Saka', teamId: 'ars', position: 'FW', number: 7 },
    { id: 'p4', name: 'Mohamed Salah', teamId: 'liv', position: 'FW', number: 11 },
    { id: 'p5', name: 'Vinicius Jr', teamId: 'rm', position: 'FW', number: 7 }
];

const TODAY = new Date().toISOString().split('T')[0];

export const MATCHES: Match[] = [
    {
        id: 'm1',
        leagueId: 'pl',
        homeTeamId: 'mcity',
        awayTeamId: 'liv',
        homeScore: 1,
        awayScore: 1,
        status: 'LIVE',
        startTime: `${TODAY}T15:00:00Z`,
        events: [
            { id: 'e1', type: 'goal', minute: 23, teamId: 'mcity', playerId: 'p1' },
            { id: 'e2', type: 'card_yellow', minute: 45, teamId: 'liv', playerId: 'p4' }
        ]
    },
    {
        id: 'm2',
        leagueId: 'pl',
        homeTeamId: 'ars',
        awayTeamId: 'tot',
        homeScore: 0,
        awayScore: 0,
        status: 'SCHEDULED',
        startTime: `${TODAY}T17:30:00Z`,
        events: []
    },
    {
        id: 'm3',
        leagueId: 'ucl',
        homeTeamId: 'rm',
        awayTeamId: 'bar',
        homeScore: 3,
        awayScore: 1,
        status: 'FINISHED',
        startTime: '2023-11-20T19:45:00Z',
        events: [
            { id: 'e3', type: 'goal', minute: 15, teamId: 'rm', playerId: 'p5' },
            { id: 'e4', type: 'goal', minute: 90, teamId: 'rm', playerId: 'p5' },
        ]
    }
];

export const STANDINGS: Record<string, Standing[]> = {
    'pl': [
        { teamId: 'mcity', played: 10, won: 8, drawn: 1, lost: 1, goalsFor: 25, goalsAgainst: 8, points: 25 },
        { teamId: 'ars', played: 10, won: 7, drawn: 3, lost: 0, goalsFor: 20, goalsAgainst: 10, points: 24 },
        { teamId: 'liv', played: 10, won: 7, drawn: 2, lost: 1, goalsFor: 22, goalsAgainst: 11, points: 23 },
        { teamId: 'tot', played: 10, won: 6, drawn: 2, lost: 2, goalsFor: 18, goalsAgainst: 12, points: 20 }
    ],
    'laliga': [
        { teamId: 'rm', played: 11, won: 9, drawn: 1, lost: 1, goalsFor: 28, goalsAgainst: 8, points: 28 },
        { teamId: 'bar', played: 11, won: 7, drawn: 3, lost: 1, goalsFor: 22, goalsAgainst: 10, points: 24 }
    ],
    'ucl': [
        { teamId: 'mcity', played: 4, won: 4, drawn: 0, lost: 0, goalsFor: 12, goalsAgainst: 2, points: 12 },
        { teamId: 'rm', played: 4, won: 4, drawn: 0, lost: 0, goalsFor: 10, goalsAgainst: 3, points: 12 }
    ]
};

export const getMatches = () => MATCHES;
export const getMatch = (id: string) => MATCHES.find(m => m.id === id);
export const getLeagues = () => LEAGUES;
export const getStandings = (leagueId: string) => STANDINGS[leagueId] || [];
export const getTeam = (id: string) => TEAMS.find(t => t.id === id);
