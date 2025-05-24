import { Router } from 'express';
import { getTopSpeedLatest } from '../controllers/speed.controller';

const router = Router();

router.get('/top-latest', getTopSpeedLatest); // GET /api/speed/top-latest

export default router;
