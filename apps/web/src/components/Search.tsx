'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Search.module.css';

interface SearchResult {
    teams: Array<{ id: string; name: string; logoUrl?: string }>;
    leagues: Array<{ id: string; name: string; logoUrl?: string }>;
    players: Array<{ id: string; name: string; teamId: string }>;
}

export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (query.length >= 2) {
                setIsLoading(true);
                try {
                    const response = await fetch(`http://localhost:3001/api/search?q=${encodeURIComponent(query)}`);
                    const data = await response.json();
                    setResults(data);
                    setIsOpen(true);
                } catch (error) {
                    console.error('Search error:', error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setResults(null);
                setIsOpen(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const handleNavigate = (type: 'team' | 'league' | 'player', id: string) => {
        router.push(`/${type}/${id}`);
        setQuery('');
        setIsOpen(false);
    };

    const totalResults = results ?
        results.teams.length + results.leagues.length + results.players.length : 0;

    return (
        <div className={styles.searchContainer} ref={searchRef}>
            <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.searchInput}
            />

            {isOpen && results && (
                <div className={styles.dropdown}>
                    {isLoading ? (
                        <div className={styles.loading}>Searching...</div>
                    ) : totalResults === 0 ? (
                        <div className={styles.noResults}>No results found</div>
                    ) : (
                        <>
                            {results.teams.length > 0 && (
                                <div className={styles.section}>
                                    <div className={styles.sectionTitle}>Teams</div>
                                    {results.teams.map(team => (
                                        <button
                                            key={team.id}
                                            className={styles.resultItem}
                                            onClick={() => handleNavigate('team', team.id)}
                                        >
                                            {team.logoUrl && (
                                                <img src={team.logoUrl} alt="" className={styles.resultLogo} />
                                            )}
                                            <span>{team.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {results.leagues.length > 0 && (
                                <div className={styles.section}>
                                    <div className={styles.sectionTitle}>Leagues</div>
                                    {results.leagues.map(league => (
                                        <button
                                            key={league.id}
                                            className={styles.resultItem}
                                            onClick={() => handleNavigate('league', league.id)}
                                        >
                                            {league.logoUrl && (
                                                <img src={league.logoUrl} alt="" className={styles.resultLogo} />
                                            )}
                                            <span>{league.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {results.players.length > 0 && (
                                <div className={styles.section}>
                                    <div className={styles.sectionTitle}>Players</div>
                                    {results.players.slice(0, 5).map(player => (
                                        <button
                                            key={player.id}
                                            className={styles.resultItem}
                                            onClick={() => handleNavigate('player', player.id)}
                                        >
                                            <span>{player.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
