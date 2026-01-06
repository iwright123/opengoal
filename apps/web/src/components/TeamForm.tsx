import styles from './TeamForm.module.css';

interface Props {
    form: string; // "W,D,L,W,W"
}

export default function TeamForm({ form }: Props) {
    const results = form.split('').slice(-5);

    const getFormClass = (char: string) => {
        if (char === 'W') return styles.win;
        if (char === 'D') return styles.draw;
        if (char === 'L') return styles.loss;
        return '';
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Team form</h3>
            <div className={styles.badges}>
                {results.map((char, i) => (
                    <div key={i} className={styles.wrapper}>
                        <span className={`${styles.badge} ${getFormClass(char)}`}>
                            {char === 'W' ? '2-1' : char === 'D' ? '1-1' : '0-1'}
                        </span>
                        {/* Mock opponents for visual fidelity matching screenshot */}
                        <div className={styles.opponentMock} />
                    </div>
                ))}
            </div>
        </div>
    );
}
