import { fetchAPI } from '@/lib/api';
import { League, Match, Standing, Team } from '@opengoal/shared';
import MatchRow from '@/components/MatchRow';
import LeagueTable from '@/components/LeagueTable';
import styles from './page.module.css';

async function getLeagueData(id: string) {
    const leagues = await fetchAPI<League[]>('/leagues').catch(() => []);
    const league = leagues.find(l => l.id === id);

    if (!league) return null;

    const [matches, standings, teams] = await Promise.all([
        fetchAPI<Match[]>('/matches').then(res => res.filter(m => m.leagueId === id)).catch(() => []),
        fetchAPI<Standing[]>(`/leagues/${id}/standings`).catch(() => []),
        // Fetch teams involved in standings or matches to map names/logos
        // In a real app we'd likely have a bulk team fetch or included in standing
        // For MVP we will try to fetch team for each standing row if not abundant
        // Or better: fetch all teams if the mock data allows, or just Map known Mock Teams.
        // Let's assume fetchAPI<Team[]>('/teams') returns all for now or we build map on fly.
        // Actually our mock API doesn't list all teams.
        // We will fetch individual teams for standings? No that's N+1.
        // We'll rely on our known mock teams for now by assuming they are available.
        // Or we can fetch known IDs.
        Promise.resolve([]) // Placeholder for teams
    ]);

    // Simple hack for MVP: Fetch all known teams mentioned in mock data
    // In real app, standings usually include team info.
    // Let's manually fetch team info for the standby rows
    const teamMap = new Map<string, any>();

    // Helper to fetch and cache team
    const fetchTeam = async (tid: string) => {
        if (teamMap.has(tid)) return;
        try {
            const t = await fetchAPI<Team>(`/teams/${tid}`);
            if (t) teamMap.set(tid, t);
        } catch (e) { }
    };

    await Promise.all(standings.map(s => fetchTeam(s.teamId)));
    await Promise.all(matches.flatMap(m => [fetchTeam(m.homeTeamId), fetchTeam(m.awayTeamId)]));

    return { league, matches, standings, teamMap };
}

export default async function LeaguePage({ params }: { params: { id: string } }) {
    const data = await getLeagueData(params.id);

    if (!data) {
        return (
            <div className={styles.container}>
                <div style={{ color: 'var(--muted)' }}>League information not available</div>
            </div>
        );
    }

    const { league, matches, standings, teamMap } = data;

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                {league.logoUrl && <img src={league.logoUrl} alt={league.name} className={styles.leagueLogo} />}
                <h1>{league.name}</h1>
            </header>

            <div className={styles.contentGrid}>
                <section className={styles.mainColumn}>
                    <h2 className={styles.sectionTitle}>Matches</h2>
                    <div className={styles.list}>
                        {matches.length > 0 ? matches.map(match => (
                            <MatchRow
                                key={match.id}
                                match={match}
                                homeTeam={teamMap.get(match.homeTeamId)}
                                awayTeam={teamMap.get(match.awayTeamId)}
                            />
                        )) : (
                            <div className={styles.emptyState}>No live matches</div>
                        )}
                    </div>
                </section>

                <section className={styles.sideColumn}>
                    <h2 className={styles.sectionTitle}>Standings</h2>
                    {standings.length > 0 ? (
                        <LeagueTable standings={standings} teamMap={teamMap} />
                    ) : (
                        <div className={styles.emptyState}>No standings available</div>
                    )}
                </section>
            </div>
        </main>
    );
}
