import { fetchAPI } from '@/lib/api';
import { League, Standing, Team } from '@opengoal/shared';
import LeagueTable from '@/components/LeagueTable';
import styles from './page.module.css';

interface Props {
    params: { id: string };
}

async function getLeagueData(id: string) {
    const [leagues, standings, teams] = await Promise.all([
        fetchAPI<League[]>('/leagues'),
        fetchAPI<Standing[]>(`/leagues/${id}/standings`),
        Promise.all(['mcity', 'ars', 'liv'].map(tid => fetchAPI<Team>(`/teams/${tid}`))) // Mock fetch needed teams
    ]);

    const league = leagues.find(l => l.id === id);
    const teamMap = new Map(teams.map(t => [t.id, t]));

    return { league, standings, teamMap };
}

export default async function LeaguePage({ params }: Props) {
    const { league, standings, teamMap } = await getLeagueData(params.id);

    if (!league) return <div>League not found</div>;

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                {league.logoUrl && <img src={league.logoUrl} alt={league.name} className={styles.logo} />}
                <h1>{league.name}</h1>
            </header>

            <section>
                <h2>Standings</h2>
                <LeagueTable standings={standings} teamMap={teamMap} />
            </section>
        </main>
    );
}
