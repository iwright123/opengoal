'use client';
import Link from 'next/link';
import Search from './Search';
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

import { useTheme } from './ThemeContext';

export default function Sidebar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <aside className={styles.sidebar}>
            <Link href="/" className={styles.brand}>
                OpenGoal
            </Link>

            <div className={styles.group}>
                <Search />
            </div>

            <div className={styles.group}>
                <h3 className={styles.title}>Top Leagues</h3>
                <nav className={styles.nav}>
                    {LEAGUES.map(league => {
                        const shouldInvert = theme === 'dark' && ['ucl', 'uel'].includes(league.id);
                        return (
                            <Link key={league.id} href={`/league/${league.id}`} className={styles.link}>
                                <img
                                    src={league.icon}
                                    alt={league.name}
                                    className={`${styles.iconImg} ${shouldInvert ? styles.iconInvert : ''}`}
                                />
                                {league.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className={styles.footer}>
                <button onClick={toggleTheme} className={styles.themeToggle}>
                    {theme === 'light' ? (
                        <>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                            Dark Mode
                        </>
                    ) : (
                        <>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                            Light Mode
                        </>
                    )}
                </button>
            </div>
        </aside>
    );
}
