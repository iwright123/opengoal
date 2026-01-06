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
    { id: 'muni', name: 'Manchester United', shortName: 'MUN', leagueId: 'pl', logoUrl: 'https://upload.wikimedia.org/wikipedia/sco/7/7a/Manchester_United_FC_crest.svg' },
    { id: 'ars', name: 'Arsenal', shortName: 'ARS', leagueId: 'pl', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg' },
    { id: 'liv', name: 'Liverpool', shortName: 'LIV', leagueId: 'pl', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg' },
    { id: 'tot', name: 'Tottenham', shortName: 'TOT', leagueId: 'pl', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg' },
    { id: 'rm', name: 'Real Madrid', shortName: 'RMA', leagueId: 'ucl', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg' },
    { id: 'bar', name: 'Barcelona', shortName: 'BAR', leagueId: 'ucl', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg' },
    { id: 'mil', name: 'Inter', shortName: 'INT', leagueId: 'ucl', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/4/47/Inter_Milan_%28crest%29.svg' },
    { id: 'psg', name: 'PSG', shortName: 'PSG', leagueId: 'ucl', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/4/47/PSG_%28crest%29.svg' },
    { id: 'lazio', name: 'Lazio', shortName: 'LAZ', leagueId: 'ucl', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/4/47/Lazio_%28crest%29.svg' },
    { id: 'nap', name: 'Napoli', shortName: 'NAP', leagueId: 'ucl', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/4/47/Napoli_%28crest%29.svg' },
    { id: 'milan', name: 'Milan', shortName: 'MIL', leagueId: 'ucl', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/4/47/Inter_Milan_%28crest%29.svg' },
    { id: 'juve', name: 'Juventus', shortName: 'JUV', leagueId: 'ucl', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/4/47/Juventus_%28crest%29.svg' },
];

export const PLAYERS: Player[] = [
    { id: 'p1', name: 'Erling Haaland', teamId: 'mcity', position: 'FW', number: 9, age: 23, nationality: 'Norway', height: '1.95m', goals: 14, assists: 3, appearances: 10, rating: 8.5 },
    { id: 'p2', name: 'Kevin De Bruyne', teamId: 'mcity', position: 'MF', number: 17, age: 32, nationality: 'Belgium', height: '1.81m', goals: 2, assists: 8, appearances: 10, rating: 8.2 },
    { id: 'p3', name: 'Bukayo Saka', teamId: 'ars', position: 'FW', number: 7, age: 22, nationality: 'England', height: '1.78m', goals: 6, assists: 5, appearances: 10, rating: 7.8 },
    { id: 'p4', name: 'Mohamed Salah', teamId: 'liv', position: 'FW', number: 11, age: 31, nationality: 'Egypt', height: '1.75m', goals: 9, assists: 6, appearances: 10, rating: 8.1 },
    { id: 'p5', name: 'Vinicius Jr', teamId: 'rm', position: 'FW', number: 7, age: 23, nationality: 'Brazil', height: '1.76m', goals: 8, assists: 4, appearances: 9, rating: 7.9 },
    // Man City Full Squad Mock
    { id: 'gk1', name: 'Ederson', teamId: 'mcity', position: 'GK', number: 31, age: 30, nationality: 'Brazil', height: '1.88m', goals: 0, assists: 0, appearances: 10, rating: 7.5 },
    { id: 'df1', name: 'Kyle Walker', teamId: 'mcity', position: 'DF', number: 2, age: 33, nationality: 'England', height: '1.78m', goals: 0, assists: 2, appearances: 9, rating: 7.3 },
    { id: 'df2', name: 'Ruben Dias', teamId: 'mcity', position: 'DF', number: 3, age: 26, nationality: 'Portugal', height: '1.87m', goals: 1, assists: 0, appearances: 10, rating: 7.6 },
    { id: 'df3', name: 'Manuel Akanji', teamId: 'mcity', position: 'DF', number: 25, age: 28, nationality: 'Switzerland', height: '1.88m', goals: 0, assists: 1, appearances: 8, rating: 7.2 },
    { id: 'df4', name: 'Josko Gvardiol', teamId: 'mcity', position: 'DF', number: 24, age: 21, nationality: 'Croatia', height: '1.85m', goals: 1, assists: 1, appearances: 10, rating: 7.4 },
    { id: 'mf1', name: 'Rodri', teamId: 'mcity', position: 'MF', number: 16, age: 27, nationality: 'Spain', height: '1.91m', goals: 3, assists: 2, appearances: 10, rating: 8.0 },
    { id: 'mf2', name: 'Bernardo Silva', teamId: 'mcity', position: 'MF', number: 20, age: 29, nationality: 'Portugal', height: '1.73m', goals: 2, assists: 4, appearances: 10, rating: 7.7 },
    { id: 'mf3', name: 'Phil Foden', teamId: 'mcity', position: 'MF', number: 47, age: 23, nationality: 'England', height: '1.71m', goals: 5, assists: 3, appearances: 9, rating: 7.9 },
    { id: 'mf4', name: 'Mateo Kovacic', teamId: 'mcity', position: 'MF', number: 8, age: 29, nationality: 'Croatia', height: '1.78m', goals: 1, assists: 2, appearances: 8, rating: 7.1 },
    { id: 'fw1', name: 'Jack Grealish', teamId: 'mcity', position: 'FW', number: 10, age: 28, nationality: 'England', height: '1.75m', goals: 2, assists: 5, appearances: 9, rating: 7.4 },
    { id: 'fw2', name: 'Jeremy Doku', teamId: 'mcity', position: 'FW', number: 11, age: 21, nationality: 'Belgium', height: '1.73m', goals: 1, assists: 3, appearances: 7, rating: 7.0 }
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
        { teamId: 'muni', played: 10, won: 9, drawn: 1, lost: 0, goalsFor: 25, goalsAgainst: 8, points: 28, form: 'WWWWW', description: 'PLC' },
        { teamId: 'mcity', played: 10, won: 8, drawn: 1, lost: 1, goalsFor: 25, goalsAgainst: 8, points: 25, form: 'WWWDW', description: 'Promotion - Champions League (Group Stage)' },
        { teamId: 'ars', played: 10, won: 7, drawn: 3, lost: 0, goalsFor: 20, goalsAgainst: 10, points: 24, form: 'WWDDW', description: 'Promotion - Champions League (Group Stage)' },
        { teamId: 'liv', played: 10, won: 7, drawn: 2, lost: 1, goalsFor: 22, goalsAgainst: 11, points: 23, form: 'WDWWL', description: 'Promotion - Champions League (Group Stage)' },
        { teamId: 'tot', played: 10, won: 6, drawn: 2, lost: 2, goalsFor: 18, goalsAgainst: 12, points: 20, form: 'LLWWW', description: 'Promotion - Europa League (Group Stage)' }
    ],
    'laliga': [
        { teamId: 'rm', played: 11, won: 9, drawn: 1, lost: 1, goalsFor: 28, goalsAgainst: 8, points: 28, form: 'WWWWW' },
        { teamId: 'bar', played: 11, won: 7, drawn: 3, lost: 1, goalsFor: 22, goalsAgainst: 10, points: 24, form: 'DWWWL' }
    ],
    'ucl': [
        { teamId: 'mcity', played: 4, won: 4, drawn: 0, lost: 0, goalsFor: 12, goalsAgainst: 2, points: 12, form: 'WWWW' },
        { teamId: 'rm', played: 4, won: 4, drawn: 0, lost: 0, goalsFor: 10, goalsAgainst: 3, points: 12, form: 'WWWW' }
    ]
};

export const getMatches = () => MATCHES;
export const getMatch = (id: string) => MATCHES.find(m => m.id === id);
export const getLeagues = () => LEAGUES;
export const getStandings = (leagueId: string) => STANDINGS[leagueId] || [];
export const getTeam = (id: string) => TEAMS.find(t => t.id === id);
