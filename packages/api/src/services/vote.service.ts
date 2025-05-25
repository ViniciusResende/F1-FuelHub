import { TeamVote } from '../models/teamVote.model';
import { TeamVoteDTO } from '../types';

/** Cast or update a vote */
export async function upsertVote(email: string, team: string) {
  await TeamVote.findOneAndUpdate(
    { email },
    { team },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
}

export async function leaderboard(): Promise<TeamVoteDTO[]> {
  return TeamVote.countByTeam();
}
