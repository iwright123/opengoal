import { Player } from '@opengoal/shared';
import Link from 'next/link';
import styles from './SquadList.module.css';

interface Props {
    players: Player[];
}

export default function SquadList({ players }: Props) {
    const positions = {
        'GK': players.filter(p => p.position === 'GK'),
        'DF': players.filter(p => p.position === 'DF'),
        'MF': players.filter(p => p.position === 'MF'),
        'FW': players.filter(p => p.position === 'FW')
    };

    const positionNames = {
        'GK': 'Goalkeepers',
        'DF': 'Defenders',
        'MF': 'Midfielders',
        'FW': 'Forwards'
    };

    return (
        <div className={styles.container}>
            {Object.entries(positions).map(([pos, playerList]) => (
                playerList.length > 0 && (
                    <div key={pos} className={styles.section}>
                        <h3 className={styles.positionTitle}>{positionNames[pos as keyof typeof positionNames]}</h3>
                        <div className={styles.playerGrid}>
                            {playerList.map(player => (
                                <Link key={player.id} href={`/player/${player.id}`} className={styles.playerCard}>
                                    <div className={styles.playerAvatar}>
                                        <img
                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.name}`}
                                            alt={player.name}
                                            className={styles.avatar}
                                        />
                                    </div>
                                    <div className={styles.playerInfo}>
                                        <div className={styles.number}>#{player.number}</div>
                                        <div className={styles.name}>{player.name}</div>
                                        {player.nationality && (
                                            <div className={styles.nationality}>{player.nationality}</div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )
            ))}
        </div>
    );
}
