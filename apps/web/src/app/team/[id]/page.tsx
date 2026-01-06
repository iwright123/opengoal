import { fetchAPI } from '@/lib/api';
import { Team, Match, Player, Standing } from '@opengoal/shared';
import TeamPageClient from './TeamPageClient';

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
        return <div style={{ padding: '24px' }}>Team not found</div>;
    }

    return <TeamPageClient {...data} />;
}
