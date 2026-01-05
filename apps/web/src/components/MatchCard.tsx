import Link from 'next/link';
import { Match, Team, League } from '@opengoal/shared';
import styles from './MatchCard.module.css';

interface MatchCardProps {
    match: Match;
    homeTeam: Team;
    awayTeam: Team;
    league: League;
}

export default function MatchCard({ match, homeTeam, awayTeam, league }: MatchCardProps) {
    const isLive = match.status === 'LIVE';
    const time = new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <Link href={`/match/${match.id}`} className={styles.card}>
            <div className={styles.header}>
                <span className={styles.league}>{league.name}</span>
                <span className={isLive ? styles.liveStatus : styles.status}>
                    {isLive ? 'LIVE' : time}
                </span>
            </div>

            <div className={styles.teams}>
                <div className={styles.team}>
                    {homeTeam.logoUrl && <img src={homeTeam.logoUrl} alt={homeTeam.name} className={styles.logo} />}
                    <span className={styles.teamName}>{homeTeam.name}</span>
                    <span className={styles.score}>{match.homeScore ?? '-'}</span>
                </div>

                <div className={styles.team}>
                    {awayTeam.logoUrl && <img src={awayTeam.logoUrl} alt={awayTeam.name} className={styles.logo} />}
                    <span className={styles.teamName}>{awayTeam.name}</span>
                    <span className={styles.score}>{match.awayScore ?? '-'}</span>
                </div>
            </div>
        </Link>
    );
}
