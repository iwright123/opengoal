import MatchList from '@/components/MatchList';
import NewsFeed from '@/components/NewsFeed';
import styles from './page.module.css';

export default function Home() {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <div className={styles.dateNav}>
                    <button className={styles.navBtn}>Yesterday</button>
                    <h2 className={styles.dateTitle}>Today</h2>
                    <button className={styles.navBtn}>Tomorrow</button>
                </div>
                <div className={styles.subDate}>{today}</div>
            </header>

            <div className={styles.feed}>
                <MatchList />
                <NewsFeed />
            </div>
        </main>
    );
}
