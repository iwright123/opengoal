import { Router } from 'express';
import { getLeagues, getMatches, getMatch, getTeam, getStandings } from './services/mockData';

const router = Router();

router.get('/leagues', (req, res) => {
    const leagues = getLeagues();
    res.json(leagues);
});

router.get('/leagues/:id/standings', (req, res) => {
    const { id } = req.params;
    const standings = getStandings(id);
    res.json(standings);
});

router.get('/matches', (req, res) => {
    const matches = getMatches();
    // Filter by date if needed, for MVP returning all
    res.json(matches);
});

router.get('/matches/:id', (req, res) => {
    const { id } = req.params;
    const match = getMatch(id);
    if (!match) {
        return res.status(404).json({ error: 'Match not found' });
    }
    res.json(match);
});

router.get('/teams/:id', (req, res) => {
    const { id } = req.params;
    const team = getTeam(id);
    if (!team) {
        return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
});

export default router;
