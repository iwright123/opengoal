import { fetchAPI } from '@/lib/api';
import { Match, Team, League, MatchEvent } from '@opengoal/shared';
import styles from './page.module.css';

interface MatchDetailsProps {
    params: { id: string };
}

async function getMatchData(id: string) {
    const match = await fetchAPI<Match>(`/matches/${id}`).catch(() => null);
    if (!match) return null;

    const [homeTeam, awayTeam, league] = await Promise.all([
        fetchAPI<Team>(`/teams/${match.homeTeamId}`).catch(() => ({ name: 'Unknown', logoUrl: '' } as Team)),
        fetchAPI<Team>(`/teams/${match.awayTeamId}`).catch(() => ({ name: 'Unknown', logoUrl: '' } as Team)),
        fetchAPI<League>(`/leagues`).then(leagues => leagues.find(l => l.id === match.leagueId))
    ]);

    return { match, homeTeam, awayTeam, league };
}

export default async function MatchPage({ params }: MatchDetailsProps) {
    const data = await getMatchData(params.id);

    if (!data) {
        return <div className={styles.container}>Match not found</div>;
    }

    const { match, homeTeam, awayTeam, league } = data;
    const isLive = match.status === 'LIVE';

    return (
        <main className={styles.container}>
            <div className={styles.header}>
                <div className={styles.leagueInfo}>
                    {league?.logoUrl && <img src={league.logoUrl} className={styles.leagueIcon} />}
                    <span>{league?.name}</span>
                </div>
                <div className={isLive ? styles.liveBadge : styles.statusBadge}>
                    {match.status}
                </div>
            </div>

            <div className={styles.scoreboard}>
                <div className={styles.team}>
                    <img src={homeTeam.logoUrl} className={styles.teamLogo} />
                    <h2 className={styles.teamName}>{homeTeam.name}</h2>
                </div>
                <div className={styles.score}>
                    {match.homeScore ?? 0} - {match.awayScore ?? 0}
                </div>
                <div className={styles.team}>
                    <img src={awayTeam.logoUrl} className={styles.teamLogo} />
                    <h2 className={styles.teamName}>{awayTeam.name}</h2>
                </div>
            </div>

            <div className={styles.events}>
                <h3>Match Events</h3>
                {match.events && match.events.length > 0 ? (
                    <ul className={styles.eventList}>
                        {match.events.map(event => (
                            <li key={event.id} className={styles.eventItem}>
                                <span className={styles.minute}>{event.minute}'</span>
                                <span className={styles.eventType}>{event.type.replace('_', ' ')}</span>
                                <span className={styles.eventPlayer}>
                                    {event.teamId === match.homeTeamId ? homeTeam.name : awayTeam.name} Player
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={styles.noEvents}>No events data available</p>
                )}
            </div>
        </main>
    );
}
