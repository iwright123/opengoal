import { Player } from '@opengoal/shared';
import styles from './SoccerPitch.module.css';

interface Props {
    players: Player[];
}

export default function SoccerPitch({ players }: Props) {
    // Simple 4-3-3 visual distribution
    // We just take first 11 players for now
    const startingXI = players.slice(0, 11);

    const gk = startingXI.filter(p => p.position === 'GK');
    const df = startingXI.filter(p => p.position === 'DF');
    const mf = startingXI.filter(p => p.position === 'MF');
    const fw = startingXI.filter(p => p.position === 'FW');

    // Fallback if numbers don't match exactly 4-3-3, just dump them in lines

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3 className={styles.title}>Season stats</h3>
                <span className={styles.subtitle}>Last starting XI</span>
            </div>

            <div className={styles.pitch}>
                {/* Goal Keeper */}
                <div className={styles.line} style={{ bottom: '5%' }}>
                    {gk.map(p => <PlayerNode key={p.id} player={p} />)}
                </div>

                {/* Defense */}
                <div className={styles.line} style={{ bottom: '25%' }}>
                    {df.map(p => <PlayerNode key={p.id} player={p} />)}
                </div>

                {/* Midfield */}
                <div className={styles.line} style={{ bottom: '50%' }}>
                    {mf.map(p => <PlayerNode key={p.id} player={p} />)}
                </div>

                {/* Forwards */}
                <div className={styles.line} style={{ bottom: '75%' }}>
                    {fw.map(p => <PlayerNode key={p.id} player={p} />)}
                </div>
            </div>
        </div>
    );
}

function PlayerNode({ player }: { player: Player }) {
    return (
        <div className={styles.playerNode}>
            <div className={styles.avatar}>
                {/* Headshot placeholder */}
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.name}`} alt="" className={styles.face} />
                <div className={styles.rating}>7.0</div>
            </div>
            <div className={styles.playerInfo}>
                <span className={styles.number}>{player.number}</span>
                <span className={styles.name}>{player.name.split(' ').pop()}</span>
            </div>
        </div>
    );
}
