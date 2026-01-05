import { Standing } from '@opengoal/shared';
import styles from './LeagueTable.module.css';

interface Props {
    standings: Standing[];
    teamMap: Map<string, { name: string, shortName: string, logoUrl?: string }>;
}

export default function LeagueTable({ standings, teamMap }: Props) {
    // Sort by points, then goal difference, then goals for
    const sorted = [...standings].sort((a, b) => {
        if (a.points !== b.points) return b.points - a.points;
        const gdA = a.goalsFor - a.goalsAgainst;
        const gdB = b.goalsFor - b.goalsAgainst;
        if (gdA !== gdB) return gdB - gdA;
        return b.goalsFor - a.goalsFor;
    });

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.pos}>#</th>
                        <th className={styles.team}>Team</th>
                        <th title="Played">P</th>
                        <th title="Won" className={styles.narrow}>W</th>
                        <th title="Drawn" className={styles.narrow}>D</th>
                        <th title="Lost" className={styles.narrow}>L</th>
                        <th title="Goal Difference" className={styles.narrow}>GD</th>
                        <th title="Points">Pts</th>
                    </tr>
                </thead>
                <tbody>
                    {sorted.map((row, index) => {
                        const team = teamMap.get(row.teamId);
                        return (
                            <tr key={row.teamId} className={styles.row}>
                                <td className={styles.pos}>{index + 1}</td>
                                <td className={styles.teamCell}>
                                    {team?.logoUrl && <img src={team.logoUrl} alt="" className={styles.logo} />}
                                    <span className={styles.teamName}>{team?.name || row.teamId}</span>
                                </td>
                                <td>{row.played}</td>
                                <td className={styles.narrow}>{row.won}</td>
                                <td className={styles.narrow}>{row.drawn}</td>
                                <td className={styles.narrow}>{row.lost}</td>
                                <td className={styles.narrow}>{row.goalsFor - row.goalsAgainst}</td>
                                <td className={styles.points}>{row.points}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
