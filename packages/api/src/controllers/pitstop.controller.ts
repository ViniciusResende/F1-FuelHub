import { Request, Response, NextFunction } from 'express';
import { fastestPitstops } from '../services/pitstop.service';

export async function getFastestPitstops(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = await fastestPitstops();
    res.json({ data });
  } catch (err) {
    next(err);
  }
}
