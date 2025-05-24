import { Router } from 'express';
import drivers from './drivers.routes';
import pitstops from './pitstop.routes';
import speed from './speed.routes';
import victories from './victory.routes';

const router = Router();

router.use('/drivers', drivers);
router.use('/pitstops', pitstops);
router.use('/speed', speed);
router.use('/victories', victories);

export default router;
