import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../middlewares/error.middleware';
import { topSpeedLatestRace } from '../services/speed.service';

export async function getTopSpeedLatest(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await topSpeedLatestRace();
    if (!result)
      throw new HttpError(404, 'No race data found for current year');

    res.json(result);
  } catch (err) {
    next(err);
  }
}
