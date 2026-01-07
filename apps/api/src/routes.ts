import { Router } from 'express';
import { getLeagues, getMatches, getMatch } from './services/mockData';
import { getStandings, getTeam } from './services/footballApi';

const router = Router();

router.get('/leagues', (req, res) => {
    const leagues = getLeagues();
    res.json(leagues);
});

router.get('/leagues/:id/standings', async (req, res) => {
    const { id } = req.params;
    const standings = await getStandings(id);
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

router.get('/teams/:id', async (req, res) => {
    const { id } = req.params;
    const team = await getTeam(id);
    if (!team) {
        return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
});

router.get('/players', (req, res) => {
    const { PLAYERS } = require('./services/mockData');
    res.json(PLAYERS);
});

router.get('/players/:id', (req, res) => {
    const { PLAYERS } = require('./services/mockData');
    const player = PLAYERS.find((p: any) => p.id === req.params.id);
    if (!player) {
        return res.status(404).json({ error: 'Player not found' });
    }
    res.json(player);
});

router.get('/search', (req, res) => {
    const query = (req.query.q as string || '').toLowerCase();
    if (!query) {
        return res.json({ teams: [], leagues: [], players: [] });
    }

    const { TEAMS, LEAGUES, PLAYERS } = require('./services/mockData');

    const teams = TEAMS.filter((t: any) =>
        t.name.toLowerCase().includes(query) ||
        t.shortName.toLowerCase().includes(query)
    );

    const leagues = LEAGUES.filter((l: any) =>
        l.name.toLowerCase().includes(query)
    );

    const players = PLAYERS.filter((p: any) =>
        p.name.toLowerCase().includes(query)
    );

    res.json({ teams, leagues, players });
});

export default router;
