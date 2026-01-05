export interface League {
    id: string;
    name: string;
    logoUrl?: string;
    country: string;
}

export interface Team {
    id: string;
    name: string;
    shortName: string;
    logoUrl?: string;
    leagueId: string;
}

export interface Player {
    id: string;
    name: string;
    teamId: string;
    position: 'GK' | 'DF' | 'MF' | 'FW';
    number: number;
}

export interface MatchEvent {
    id: string;
    type: 'goal' | 'card_yellow' | 'card_red' | 'sub';
    minute: number;
    teamId: string;
    playerId: string;
    assistPlayerId?: string;
    subInPlayerId?: string; // For substitutions
}

export interface Match {
    id: string;
    leagueId: string;
    homeTeamId: string;
    awayTeamId: string;
    homeScore: number | null;
    awayScore: number | null;
    status: 'SCHEDULED' | 'LIVE' | 'FINISHED' | 'POSTPONED';
    startTime: string; // ISO string
    events: MatchEvent[];
    venue?: string;
}

export interface Standing {
    teamId: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
}
