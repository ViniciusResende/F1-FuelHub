import { TeamVote } from '../models/teamVote.model';
import { TeamVoteDTO } from '../types';
import { upsertVote, leaderboard } from './vote.service';

// Mock the TeamVote model
jest.mock('../models/teamVote.model', () => ({
  TeamVote: {
    findOneAndUpdate: jest.fn(),
    countByTeam: jest.fn(),
  },
}));

describe('Vote Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('upsertVote', () => {
    it('should create or update a vote for a team', async () => {
      const email = 'fan@example.com';
      const team = 'Red Bull Racing';
      const mockUpdatedVote = { email, team };

      (TeamVote.findOneAndUpdate as jest.Mock).mockResolvedValue(
        mockUpdatedVote,
      );

      await upsertVote(email, team);

      expect(TeamVote.findOneAndUpdate).toHaveBeenCalledWith(
        { email },
        { team },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );
    });

    it('should handle database errors gracefully', async () => {
      const email = 'fan@example.com';
      const team = 'Mercedes';

      (TeamVote.findOneAndUpdate as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      );

      await expect(upsertVote(email, team)).rejects.toThrow('Database error');
    });
  });

  describe('leaderboard', () => {
    it('should return team vote counts', async () => {
      const mockLeaderboard: TeamVoteDTO[] = [
        { team: 'Red Bull Racing', votes: 150 },
        { team: 'Mercedes', votes: 120 },
        { team: 'Ferrari', votes: 100 },
      ];

      (TeamVote.countByTeam as jest.Mock).mockResolvedValue(mockLeaderboard);

      const result = await leaderboard();

      expect(TeamVote.countByTeam).toHaveBeenCalled();
      expect(result).toEqual(mockLeaderboard);
    });

    it('should handle empty leaderboard', async () => {
      (TeamVote.countByTeam as jest.Mock).mockResolvedValue([]);

      const result = await leaderboard();

      expect(result).toEqual([]);
    });

    it('should handle database errors in leaderboard', async () => {
      (TeamVote.countByTeam as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      );

      await expect(leaderboard()).rejects.toThrow('Database error');
    });
  });
});
