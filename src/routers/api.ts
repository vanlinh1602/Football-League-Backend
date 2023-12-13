import { getTeams, updateTeam } from 'controllers/teams';
import { auth } from 'controllers/users';
import express from 'express';

const router = express.Router();

// user
router.use('/auth', auth);

// teams
router.use('/updateTeam', updateTeam);
router.use('/getTeams', getTeams);

export default router;
