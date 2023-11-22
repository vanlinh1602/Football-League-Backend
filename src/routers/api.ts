import { getUser } from 'controllers/users';
import express from 'express';

const router = express.Router();

router.use('/users', getUser);

export default router;
