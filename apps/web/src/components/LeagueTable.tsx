import { Standing } from '@opengoal/shared';
import styles from './LeagueTable.module.css';
import Link from 'next/link';

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

    const getFormClass = (char: string) => {
        if (char === 'W') return styles.formWin;
        if (char === 'D') return styles.formDraw;
        if (char === 'L') return styles.formLoss;
        return '';
    };

    const getQualColor = (desc?: string) => {
        if (!desc) return 'transparent';
        if (desc.includes('Champions League')) return '#4285f4'; // Blue
        if (desc.includes('Europa League')) return '#fa7b17'; // Orange
        if (desc.includes('Relegation')) return '#ea4335'; // Red
        return 'transparent';
    };

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.pos}>#</th>
                        <th className={styles.team}>Club</th>
                        <th title="Played">MP</th>
                        <th title="Won" className={styles.narrow}>W</th>
                        <th title="Drawn" className={styles.narrow}>D</th>
                        <th title="Lost" className={styles.narrow}>L</th>
                        <th title="Goals For" className={styles.narrow}>GF</th>
                        <th title="Goals Against" className={styles.narrow}>GA</th>
                        <th title="Goal Difference">GD</th>
                        <th title="Points">Pts</th>
                        <th title="Form" className={styles.narrow}>Last 5</th>
                    </tr>
                </thead>
                <tbody>
                    {sorted.map((row, index) => {
                        const team = teamMap.get(row.teamId);
                        const qualColor = getQualColor(row.description);
                        const form = row.form ? row.form.split('').slice(-5) : [];

                        return (
                            <tr key={row.teamId} className={styles.row}>
                                <td className={styles.pos}>
                                    <div className={styles.rankContainer}>
                                        <div className={styles.qualBar} style={{ backgroundColor: qualColor }} />
                                        <span>{index + 1}</span>
                                    </div>
                                </td>
                                <td className={styles.teamCell}>
                                    <Link href={`/team/${row.teamId}`} className={styles.teamLink}>
                                        {team?.logoUrl && <img src={team.logoUrl} alt="" className={styles.logo} />}
                                        <span className={styles.teamName}>{team?.name || row.teamId}</span>
                                    </Link>
                                </td>
                                <td>{row.played}</td>
                                <td className={styles.narrow}>{row.won}</td>
                                <td className={styles.narrow}>{row.drawn}</td>
                                <td className={styles.narrow}>{row.lost}</td>
                                <td className={styles.narrow}>{row.goalsFor}</td>
                                <td className={styles.narrow}>{row.goalsAgainst}</td>
                                <td>{row.goalsFor - row.goalsAgainst}</td>
                                <td className={styles.points}>{row.points}</td>
                                <td className={`${styles.formCell} ${styles.narrow}`}>
                                    <div className={styles.formFlex}>
                                        {form.map((char, i) => (
                                            <span key={i} className={`${styles.formBadge} ${getFormClass(char)}`}>
                                                {char === 'W' ? '✓' : char === 'L' ? '✕' : '-'}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
