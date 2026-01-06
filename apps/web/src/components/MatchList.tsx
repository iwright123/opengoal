import { Match, League, Team } from '@opengoal/shared';
import MatchCard from './MatchCard';
import MatchRow from './MatchRow';
import styles from './MatchList.module.css';

// Mock Data
const MOCK_TEAMS: Record<string, Team> = {
    '1': { id: '1', name: 'Arsenal', shortName: 'ARS', leagueId: 'pl', logoUrl: 'https://media.api-sports.io/football/teams/42.png' },
    '2': { id: '2', name: 'Liverpool', shortName: 'LIV', leagueId: 'pl', logoUrl: 'https://media.api-sports.io/football/teams/40.png' },
    '3': { id: '3', name: 'Man City', shortName: 'MCI', leagueId: 'pl', logoUrl: 'https://media.api-sports.io/football/teams/50.png' },
    '4': { id: '4', name: 'Real Madrid', shortName: 'RMA', leagueId: 'laliga', logoUrl: 'https://media.api-sports.io/football/teams/541.png' },
    '5': { id: '5', name: 'Barcelona', shortName: 'BAR', leagueId: 'laliga', logoUrl: 'https://media.api-sports.io/football/teams/529.png' },
    '6': { id: '6', name: 'Bayern', shortName: 'BAY', leagueId: 'bl', logoUrl: 'https://media.api-sports.io/football/teams/157.png' },
};

const MOCK_LEAGUES: Record<string, League> = {
    'pl': { id: 'pl', name: 'Premier League', logoUrl: 'https://media.api-sports.io/football/leagues/39.png', country: 'England' },
    'ucl': { id: 'ucl', name: 'Champions League', logoUrl: 'https://media.api-sports.io/football/leagues/2.png', country: 'World' },
    'laliga': { id: 'laliga', name: 'LaLiga', logoUrl: 'https://media.api-sports.io/football/leagues/140.png', country: 'Spain' },
};

const LIVE_MATCHES: Match[] = [
    {
        id: 'm1',
        homeTeamId: '1',
        awayTeamId: '2',
        homeScore: 2,
        awayScore: 1,
        startTime: new Date().toISOString(),
        status: 'LIVE',
        leagueId: 'pl',
        events: []
    },
    {
        id: 'm2',
        homeTeamId: '4',
        awayTeamId: '5',
        homeScore: 0,
        awayScore: 0,
        startTime: new Date().toISOString(),
        status: 'LIVE',
        leagueId: 'laliga',
        events: []
    },
];

const UPCOMING_MATCHES: Match[] = [
    {
        id: 'm3',
        homeTeamId: '3',
        awayTeamId: '6',
        homeScore: null,
        awayScore: null,
        startTime: new Date(Date.now() + 86400000).toISOString(),
        status: 'SCHEDULED',
        leagueId: 'ucl',
        events: []
    },
];

export default function MatchList() {
    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <h2 className={styles.title}>Live Matches</h2>
                <div className={styles.grid}>
                    {LIVE_MATCHES.map(match => (
                        <MatchCard
                            key={match.id}
                            match={match}
                            homeTeam={MOCK_TEAMS[match.homeTeamId]}
                            awayTeam={MOCK_TEAMS[match.awayTeamId]}
                            league={MOCK_LEAGUES[match.leagueId]}
                        />
                    ))}
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.title}>All Matches</h2>
                <div className={styles.list}>
                    {/* Grouping by league for list view */}
                    <div className={styles.leagueBlock}>
                        <div className={styles.leagueHeader}>
                            <img src={MOCK_LEAGUES['ucl'].logoUrl} className={styles.leagueIcon} alt="UCL" />
                            Champions League
                        </div>
                        {UPCOMING_MATCHES.filter(m => m.leagueId === 'ucl').map(match => (
                            <MatchRow
                                key={match.id}
                                match={match}
                                homeTeam={MOCK_TEAMS[match.homeTeamId]}
                                awayTeam={MOCK_TEAMS[match.awayTeamId]}
                            />
                        ))}
                    </div>
                    <div className={styles.leagueBlock}>
                        <div className={styles.leagueHeader}>
                            <img src={MOCK_LEAGUES['pl'].logoUrl} className={styles.leagueIcon} alt="PL" />
                            Premier League
                        </div>
                        {LIVE_MATCHES.filter(m => m.leagueId === 'pl').map(match => (
                            <MatchRow
                                key={match.id}
                                match={match}
                                homeTeam={MOCK_TEAMS[match.homeTeamId]}
                                awayTeam={MOCK_TEAMS[match.awayTeamId]}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
