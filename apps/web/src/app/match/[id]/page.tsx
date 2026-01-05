import { fetchAPI } from '@/lib/api';
import { Match, Team, League } from '@opengoal/shared';
import Link from 'next/link';
import styles from './page.module.css';

interface Props {
    params: { id: string };
}

async function getMatchData(id: string) {
    const match = await fetchAPI<Match>(`/matches/${id}`);
    const [homeTeam, awayTeam, league] = await Promise.all([
        fetchAPI<Team>(`/teams/${match.homeTeamId}`),
        fetchAPI<Team>(`/teams/${match.awayTeamId}`),
        fetchAPI<League[]>(`/leagues`).then(leagues => leagues.find(l => l.id === match.leagueId)!)
    ]);

    return { match, homeTeam, awayTeam, league };
}

export default async function MatchPage({ params }: Props) {
    const { match, homeTeam, awayTeam, league } = await getMatchData(params.id);

    const isLive = match.status === 'LIVE';

    return (
        <main className={styles.container}>
            <Link href="/" className={styles.back}>← Back to matches</Link>

            <div className={styles.header}>
                <div className={styles.league}>{league.name}</div>
                <div className={styles.scoreBoard}>
                    <div className={styles.team}>
                        {homeTeam.logoUrl && <img src={homeTeam.logoUrl} alt={homeTeam.name} className={styles.logo} />}
                        <span className={styles.teamName}>{homeTeam.name}</span>
                    </div>
                    <div className={styles.score}>
                        {match.homeScore ?? 0} - {match.awayScore ?? 0}
                        <div className={styles.status}>{isLive ? 'LIVE' : match.status}</div>
                    </div>
                    <div className={styles.team}>
                        {awayTeam.logoUrl && <img src={awayTeam.logoUrl} alt={awayTeam.name} className={styles.logo} />}
                        <span className={styles.teamName}>{awayTeam.name}</span>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h2>Timeline</h2>
                <div className={styles.timeline}>
                    {match.events.length === 0 ? <p className={styles.empty}>No events yet</p> : (
                        match.events.sort((a, b) => a.minute - b.minute).map(event => (
                            <div key={event.id} className={styles.event}>
                                <span className={styles.minute}>{event.minute}'</span>
                                <span className={styles.eventType}>{getEventIcon(event.type)}</span>
                                <span className={styles.player}>
                                    {/* Ideally fetch player name, for now just using ID or need to enrich on backend */}
                                    Player {event.playerId} ({event.teamId === match.homeTeamId ? homeTeam.shortName : awayTeam.shortName})
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}

function getEventIcon(type: string) {
    switch (type) {
        case 'goal': return '⚽';
        case 'card_yellow': return '🟨';
        case 'card_red': return '🟥';
        case 'sub': return '🔄';
        default: return '•';
    }
}
