import { fetchAPI } from '@/lib/api';
import { Match, Team, League } from '@opengoal/shared';
import MatchRow from '@/components/MatchRow';
import styles from './page.module.css';

async function getData() {
    const [matches, leagues, teamsAll] = await Promise.all([
        fetchAPI<Match[]>('/matches'),
        fetchAPI<League[]>('/leagues'),
        Promise.all(['mcity', 'ars', 'liv', 'rm', 'bar'].map(id => fetchAPI<Team>(`/teams/${id}`)))
    ]);

    const teamMap = new Map(teamsAll.map(t => [t.id, t]));
    const leagueMap = new Map(leagues.map(l => [l.id, l]));

    return { matches, teamMap, leagueMap };
}

export default async function Home() {
    const { matches, teamMap, leagueMap } = await getData();

    // Group matches by league
    const matchesByLeague = new Map<string, Match[]>();
    matches.forEach(match => {
        const list = matchesByLeague.get(match.leagueId) || [];
        list.push(match);
        matchesByLeague.set(match.leagueId, list);
    });

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <div className={styles.dateNav}>
                    <button className={styles.navBtn}>Yesterday</button>
                    <h2 className={styles.dateTitle}>Today</h2>
                    <button className={styles.navBtn}>Tomorrow</button>
                </div>
                <div className={styles.subDate}>{today}</div>
            </header>

            <div className={styles.feed}>
                {Array.from(matchesByLeague.entries()).map(([leagueId, leagueMatches]) => {
                    const league = leagueMap.get(leagueId);
                    if (!league) return null;

                    return (
                        <div key={leagueId} className={styles.leagueGroup}>
                            <div className={styles.leagueHeader}>
                                {league.logoUrl && <img src={league.logoUrl} className={styles.leagueLogo} />}
                                <span className={styles.leagueName}>{league.name}</span>
                                <span className={styles.country}>{league.country}</span>
                            </div>
                            <div className={styles.matchList}>
                                {leagueMatches.map(match => (
                                    <MatchRow
                                        key={match.id}
                                        match={match}
                                        homeTeam={teamMap.get(match.homeTeamId) || {} as Team}
                                        awayTeam={teamMap.get(match.awayTeamId) || {} as Team}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
