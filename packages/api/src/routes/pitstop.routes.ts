import { Router } from 'express';
import { getFastestPitstops } from '../controllers/pitstop.controller';

const router = Router();

router.get('/fastest', getFastestPitstops); // GET /api/pitstops/fastest

export default router;
