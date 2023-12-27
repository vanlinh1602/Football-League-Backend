import { getAllEvents, getEvents, updateEvent } from 'controllers/events';
import { getLeagues, updateLeague } from 'controllers/leagues';
import { getAllMatches, getMatches, updateMatch } from 'controllers/matches';
import { getAllPlayers, getPlayers, updatePlayer } from 'controllers/players';
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
router.use('/getAllPlayers', getAllPlayers);
router.use('/updatePlayer', updatePlayer);

// leagues
router.use('/getLeagues', getLeagues);
router.use('/updateLeague', updateLeague);

// matches
router.use('/getMatchs', getMatches);
router.use('/getAllMatchs', getAllMatches);
router.use('/updateMatch', updateMatch);

// events
router.use('/getEvents', getEvents);
router.use('/getAllEvents', getAllEvents);
router.use('/updateEvent', updateEvent);

export default router;
