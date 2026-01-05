'use client';
import Link from 'next/link';
import styles from './Sidebar.module.css';

// Using media.api-sports.io generic CDN for logos (Standard IDs)
const LEAGUES = [
    { id: 'pl', name: 'Premier League', icon: 'https://media.api-sports.io/football/leagues/39.png' },
    { id: 'ucl', name: 'Champions League', icon: 'https://media.api-sports.io/football/leagues/2.png' },
    { id: 'laliga', name: 'LaLiga', icon: 'https://media.api-sports.io/football/leagues/140.png' },
    { id: 'wc', name: 'FIFA World Cup', icon: 'https://media.api-sports.io/football/leagues/1.png' },
    { id: 'bl', name: 'Bundesliga', icon: 'https://media.api-sports.io/football/leagues/78.png' },
    { id: 'mls', name: 'MLS', icon: 'https://media.api-sports.io/football/leagues/253.png' },
    { id: 'seriea', name: 'Serie A', icon: 'https://media.api-sports.io/football/leagues/135.png' },
    { id: 'uel', name: 'Europa League', icon: 'https://media.api-sports.io/football/leagues/3.png' },
    { id: 'ligue1', name: 'Ligue 1', icon: 'https://media.api-sports.io/football/leagues/61.png' },
];

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <Link href="/" className={styles.brand}>
                OpenGoal
            </Link>

            <div className={styles.group}>
                <div className={styles.search}>
                    <input type="text" placeholder="Search" className={styles.searchInput} />
                </div>
            </div>

            <div className={styles.group}>
                <h3 className={styles.title}>Top Leagues</h3>
                <nav className={styles.nav}>
                    {LEAGUES.map(league => (
                        <Link key={league.id} href={`/league/${league.id}`} className={styles.link}>
                            <img src={league.icon} alt={league.name} className={styles.iconImg} />
                            {league.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </aside>
    );
}
