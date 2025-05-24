import { Router } from 'express';
import { getMostVictorious } from '../controllers/victory.controller';

const router = Router();

router.get('/top', getMostVictorious); //GET /api/victories/top

export default router;
