import { getLeagues, updateLeague } from 'controllers/leagues';
import { getPlayers, updatePlayer } from 'controllers/players';
import { getTeams, updateTeam } from 'controllers/teams';
import { auth } from 'controllers/users';
import express from 'express';

const router = express.Router();

// user
router.use('/auth', auth);

// teams
router.use('/getTeams', getTeams);
router.use('/updateTeam', updateTeam);

// players
router.use('/getPlayers', getPlayers);
router.use('/updatePlayer', updatePlayer);

// league
router.use('/getLeagues', getLeagues);
router.use('/updateLeague', updateLeague);

export default router;
