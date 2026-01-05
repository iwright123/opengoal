import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <Link href="/" className={styles.brand}>OpenGoal</Link>
                <div className={styles.links}>
                    <Link href="/league/pl" className={styles.link}>Premier League</Link>
                    <Link href="/league/ucl" className={styles.link}>Champions League</Link>
                </div>
            </div>
        </nav>
    );
}
