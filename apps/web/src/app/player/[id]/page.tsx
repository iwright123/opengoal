import { fetchAPI } from '@/lib/api';
import { Player, Team } from '@opengoal/shared';
import styles from './page.module.css';
import Link from 'next/link';

async function getPlayerData(id: string) {
    const player = await fetchAPI<Player>(`/players/${id}`).catch(() => null);
    if (!player) return null;

    const team = await fetchAPI<Team>(`/teams/${player.teamId}`).catch(() => null);

    return { player, team };
}

export default async function PlayerPage({ params }: { params: { id: string } }) {
    const data = await getPlayerData(params.id);

    if (!data) {
        return <div className={styles.container}>Player not found</div>;
    }

    const { player, team } = data;

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <div className={styles.avatarContainer}>
                    <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.name}`}
                        alt={player.name}
                        className={styles.avatar}
                    />
                </div>
                <div className={styles.info}>
                    <h1 className={styles.name}>{player.name}</h1>
                    <div className={styles.meta}>
                        <span className={styles.number}>#{player.number}</span>
                        <span className={styles.position}>{player.position}</span>
                        {team && (
                            <Link href={`/team/${team.id}`} className={styles.teamLink}>
                                {team.logoUrl && <img src={team.logoUrl} alt="" className={styles.teamLogo} />}
                                {team.name}
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            <div className={styles.content}>
                <section className={styles.statsSection}>
                    <h2 className={styles.sectionTitle}>Player Info</h2>
                    <div className={styles.infoGrid}>
                        {player.age && (
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Age</span>
                                <span className={styles.value}>{player.age}</span>
                            </div>
                        )}
                        {player.nationality && (
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Nationality</span>
                                <span className={styles.value}>{player.nationality}</span>
                            </div>
                        )}
                        {player.height && (
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Height</span>
                                <span className={styles.value}>{player.height}</span>
                            </div>
                        )}
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Position</span>
                            <span className={styles.value}>{player.position}</span>
                        </div>
                    </div>
                </section>

                <section className={styles.statsSection}>
                    <h2 className={styles.sectionTitle}>Season Stats</h2>
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>{player.appearances || 0}</div>
                            <div className={styles.statLabel}>Appearances</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>{player.goals || 0}</div>
                            <div className={styles.statLabel}>Goals</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>{player.assists || 0}</div>
                            <div className={styles.statLabel}>Assists</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>{player.rating?.toFixed(1) || 'N/A'}</div>
                            <div className={styles.statLabel}>Rating</div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
