import styles from './NewsFeed.module.css';
import Link from 'next/link';

interface NewsItem {
    id: string;
    title: string;
    imageUrl: string;
    source: string;
    time: string;
    url: string;
}

const MOCK_NEWS: NewsItem[] = [
    {
        id: '1',
        title: 'Mbappe scores hat-trick as Madrid demolish Granada',
        imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=300&h=200',
        source: 'BBC Sport',
        time: '2h ago',
        url: '#'
    },
    {
        id: '1',
        title: 'Klopp to return to management? Rumours swirl about Germany job',
        imageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=300&h=200',
        source: 'Sky Sports',
        time: '4h ago',
        url: '#'
    },
    {
        id: '3',
        title: 'Arsenal injury crisis: Saka and Odegaard doubtful for derby',
        imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0565c6a?auto=format&fit=crop&q=80&w=300&h=200',
        source: 'The Athletic',
        time: '5h ago',
        url: '#'
    },
];

export default function NewsFeed() {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Latest News</h2>
            <div className={styles.list}>
                {MOCK_NEWS.map((item, index) => (
                    <Link key={index} href={item.url} className={styles.item}>
                        <div className={styles.imageContainer}>
                            <img src={item.imageUrl} alt={item.title} className={styles.image} />
                        </div>
                        <div className={styles.content}>
                            <div className={styles.headline}>{item.title}</div>
                            <div className={styles.meta}>
                                <span className={styles.source}>{item.source}</span>
                                <span>•</span>
                                <span>{item.time}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
