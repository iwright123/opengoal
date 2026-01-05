import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
    res.json({ message: 'OpenGoal API' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
