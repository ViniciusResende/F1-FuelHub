import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../middlewares/error.middleware';
import { mostVictoriousDriver } from '../services/victory.service';

export async function getMostVictorious(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { country } = req.query;

    if (typeof country !== 'string' || !country.trim())
      throw new HttpError(400, "Query param 'country' is required");

    const data = await mostVictoriousDriver(country);
    if (!data) throw new HttpError(404, 'No race data found for that country');

    res.json({ data });
  } catch (err) {
    next(err);
  }
}
