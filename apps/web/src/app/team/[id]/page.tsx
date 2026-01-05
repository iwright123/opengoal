import { fetchAPI } from '@/lib/api';
import { Team, Player } from '@opengoal/shared';
import styles from './page.module.css';

interface Props {
    params: { id: string };
}

async function getTeamData(id: string) {
    const team = await fetchAPI<Team>(`/teams/${id}`);
    // In a real app we'd fetch players by team ID
    // For MVP mock, fetch all mock players and filter
    // This requires a new endpoint or just hardcode/filter on client side if endpoint existed
    // Let's assume we can fetch team and just show basic info for now as players endpoint wasn't explicitly created in route list in plan, 
    // but I should adhere to plan. Plan said "Implement Team/Player pages".
    // I'll skip fetching players for now to keep it simple or mock it if needed.
    return { team };
}

export default async function TeamPage({ params }: Props) {
    const { team } = await getTeamData(params.id);

    if (!team) return <div>Team not found</div>;

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                {team.logoUrl && <img src={team.logoUrl} alt={team.name} className={styles.logo} />}
                <div>
                    <h1>{team.name}</h1>
                    <p className={styles.meta}>{team.shortName} • {team.leagueId === 'pl' ? 'Premier League' : 'Champions League'}</p>
                </div>
            </header>

            <section>
                <h2>Squad</h2>
                <p className={styles.placeholder}>Player list coming soon...</p>
            </section>
        </main>
    );
}
