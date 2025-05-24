import { Router } from 'express';
import { getDrivers } from '../controllers/drivers.controller';
import { getTopPoles } from '../controllers/topPoles.controller';

const router = Router();

router.get('/', getDrivers); // GET /api/drivers
router.get('/top-poles', getTopPoles); // GET /api/drivers/top-poles

export default router;
