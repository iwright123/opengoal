import Link from 'next/link';
import { Match, Team } from '@opengoal/shared';
import styles from './MatchRow.module.css';

interface Props {
    match: Match;
    homeTeam: Team;
    awayTeam: Team;
}

export default function MatchRow({ match, homeTeam, awayTeam }: Props) {
    const isLive = match.status === 'LIVE';
    const startTime = new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <Link href={`/match/${match.id}`} className={styles.row}>
            <div className={styles.timeStatus}>
                {isLive ? <span className={styles.live}>LIVE</span> : <span className={styles.time}>{match.status === 'FINISHED' ? 'FT' : startTime}</span>}
            </div>

            <div className={styles.teams}>
                <div className={styles.team}>
                    <span className={styles.name}>{homeTeam.name}</span>
                    {homeTeam.logoUrl && <img src={homeTeam.logoUrl} className={styles.logo} />}
                </div>
                <div className={styles.score}>
                    {match.status !== 'SCHEDULED' ? (
                        <>{match.homeScore} - {match.awayScore}</>
                    ) : <span className={styles.vs}>v</span>}
                </div>
                <div className={`${styles.team} ${styles.away}`}>
                    {awayTeam.logoUrl && <img src={awayTeam.logoUrl} className={styles.logo} />}
                    <span className={styles.name}>{awayTeam.name}</span>
                </div>
            </div>
        </Link>
    );
}
