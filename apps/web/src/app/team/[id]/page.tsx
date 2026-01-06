import { fetchAPI } from '@/lib/api';
import { Team, Match, Player, Standing } from '@opengoal/shared';
import MatchRow from '@/components/MatchRow';
import TeamForm from '@/components/TeamForm';
import SoccerPitch from '@/components/SoccerPitch';
import LeagueTable from '@/components/LeagueTable';
import styles from './page.module.css';

async function getTeamData(id: string) {
    const team = await fetchAPI<Team>(`/teams/${id}`).catch(() => null);
    if (!team) return null;

    const [matches, allPlayers] = await Promise.all([
        fetchAPI<Match[]>('/matches').catch(() => []),
        fetchAPI<Player[]>('/players').catch(() => [])
    ]);

    const teamMatches = matches.filter(m => m.homeTeamId === id || m.awayTeamId === id);
    const nextMatch = teamMatches.find(m => m.status === 'SCHEDULED' || m.status === 'LIVE');
    const upcomingMatches = teamMatches.filter(m => m.status === 'SCHEDULED').slice(0, 5);

    // Opponent teams
    const opponentIds = new Set<string>();
    teamMatches.forEach(m => {
        if (m.homeTeamId !== id) opponentIds.add(m.homeTeamId);
        if (m.awayTeamId !== id) opponentIds.add(m.awayTeamId);
    });

    const opponentTeamsList = await Promise.all(
        Array.from(opponentIds).map(tid => fetchAPI<Team>(`/teams/${tid}`).catch(() => null))
    );
    const teamMap = new Map<string, any>();
    teamMap.set(team.id, team);
    opponentTeamsList.forEach(t => {
        if (t) teamMap.set(t.id, t);
    });

    const players = allPlayers.filter(p => p.teamId === id);
    const standings = await fetchAPI<Standing[]>(`/leagues/${team.leagueId}/standings`).catch(() => []);
    const teamStanding = standings.find(s => s.teamId === id);

    return { team, nextMatch, upcomingMatches, players, teamStanding, standings, teamMap };
}

export default async function TeamPage({ params }: { params: { id: string } }) {
    const data = await getTeamData(params.id);

    if (!data) {
        return <div className={styles.container}>Team not found</div>;
    }

    const { team, nextMatch, upcomingMatches, players, teamStanding, standings, teamMap } = data;

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.logoContainer}>
                        {team.logoUrl && <img src={team.logoUrl} alt={team.name} className={styles.logo} />}
                    </div>
                    <div className={styles.info}>
                        <h1 className={styles.name}>{team.name}</h1>
                        <p className={styles.country}>England</p>
                    </div>
                </div>
                <div className={styles.actions}>
                    <button className={styles.btnSecondary}>Sync to calendar</button>
                    <button className={styles.btnPrimary}>Follow</button>
                </div>
            </header>

            <div className={styles.tabs}>
                <button className={`${styles.tab} ${styles.activeTab}`}>Overview</button>
                <button className={styles.tab}>Table</button>
                <button className={styles.tab}>Fixtures</button>
                <button className={styles.tab}>Squad</button>
                <button className={styles.tab}>Stats</button>
                <button className={styles.tab}>Transfers</button>
                <button className={styles.tab}>History</button>
                <button className={styles.tab}>News</button>
            </div>

            <div className={styles.dashboard}>
                <div className={styles.widgetForm}>
                    <TeamForm form={teamStanding?.form || 'WWDDD'} />
                </div>

                <div className={styles.widgetNextMatch}>
                    <div className={styles.cardHeader}>
                        <h3>Next match</h3>
                        <span className={styles.leagueName}>Premier League</span>
                    </div>
                    {nextMatch ? (
                        <div className={styles.nextMatchContent}>
                            <div className={styles.nextMatchTeams}>
                                <img src={teamMap.get(nextMatch.homeTeamId)?.logoUrl} className={styles.nextLogo} alt="" />
                                <span className={styles.vsHealth}>{new Date(nextMatch.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                <img src={teamMap.get(nextMatch.awayTeamId)?.logoUrl} className={styles.nextLogo} alt="" />
                            </div>
                            <div className={styles.nextMatchNames}>
                                <span>{teamMap.get(nextMatch.homeTeamId)?.shortName}</span>
                                <span>Today</span>
                                <span>{teamMap.get(nextMatch.awayTeamId)?.shortName}</span>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.empty}>No upcoming match</div>
                    )}
                </div>

                <div className={styles.widgetPitch}>
                    <SoccerPitch players={players} />
                </div>

                <div className={styles.widgetSummary}>
                    <h3 className={styles.sectionTitle}>Daily Summary</h3>
                    <p className={styles.summaryText}>
                        {team.name} are looking to bounce back after a mixed run of form.
                        With upcoming fixtures against key rivals, the manager will be hoping
                        for a solid performance from the squad. Key players are returning to fitness
                        just in time for the busy period.
                    </p>
                </div>

                <div className={styles.widgetTable}>
                    <h3 className={styles.sectionTitle}>Premier League</h3>
                    <LeagueTable standings={standings} teamMap={teamMap} />
                </div>

                <div className={styles.widgetFixtures}>
                    <div className={styles.fixturesHeader}>
                        <h3>Fixtures</h3>
                        <div className={styles.fixtureNav}>
                            <button>&lt;</button>
                            <button>&gt;</button>
                        </div>
                    </div>
                    <div className={styles.fixtureList}>
                        {upcomingMatches.length > 0 ? upcomingMatches.map(m => (
                            <MatchRow
                                key={m.id}
                                match={m}
                                homeTeam={teamMap.get(m.homeTeamId) || { id: m.homeTeamId, name: 'Unknown', shortName: 'UNK', leagueId: '', logoUrl: '' }}
                                awayTeam={teamMap.get(m.awayTeamId) || { id: m.awayTeamId, name: 'Unknown', shortName: 'UNK', leagueId: '', logoUrl: '' }}
                            />
                        )) : (
                            <div className={styles.empty}>No fixtures</div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
