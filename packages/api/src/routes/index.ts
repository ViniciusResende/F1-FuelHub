import { Router } from 'express';
import drivers from './drivers.routes';
import pitstops from './pitstop.routes';
import speed from './speed.routes';

const router = Router();

router.use('/drivers', drivers);
router.use('/pitstops', pitstops);
router.use('/speed', speed);

export default router;
