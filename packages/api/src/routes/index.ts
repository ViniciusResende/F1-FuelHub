import { Router } from 'express';
import drivers from './drivers.routes';
import pitstops from './pitstop.routes';

const router = Router();

router.use('/drivers', drivers);
router.use('/pitstops', pitstops);

export default router;
