import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../middlewares/error.middleware';
import { upsertVote, leaderboard } from '../services/vote.service';

export async function postVote(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, team } = req.body;
    if (!email || !team) throw new HttpError(400, 'email and team required');

    await upsertVote(String(email), String(team));
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

export async function getLeaderboard(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = await leaderboard();
    res.json({ data });
  } catch (err) {
    next(err);
  }
}
