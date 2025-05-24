import { Request, Response, NextFunction } from 'express';
import { topPoleDrivers } from '../services/pole.service';

export async function getTopPoles(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await topPoleDrivers();
    res.json(result);
  } catch (err) {
    next(err);
  }
}
