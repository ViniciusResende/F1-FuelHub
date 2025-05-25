import { Router } from 'express';
import { postVote, getLeaderboard } from '../controllers/vote.controller';

const router = Router();

router.post('/', postVote); // POST /api/votes {email,team}
router.get('/', getLeaderboard); // GET  /api/votes

export default router;
