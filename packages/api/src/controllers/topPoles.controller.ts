import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../middlewares/error.middleware';
import { topPoleDrivers } from '../services/pole.service';

export async function getTopPoles(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const year = Number(req.query.year) || new Date().getUTCFullYear();
    if (!Number.isInteger(year) || year < 1950)
      throw new HttpError(400, 'Invalid year');

    const result = await topPoleDrivers(year);
    res.json(result);
  } catch (err) {
    next(err);
  }
}
