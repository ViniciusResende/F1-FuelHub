/**
 * @category Services
 * @module HomeService
 */

import { ITeamInfo, ITeamsData, ITeamVotingInfo } from './TeamsInterfaces';
import { BaseF1Service } from '../BaseF1Service';
import {
  ApiTeamNameToTeamEnumMap,
  TeamEnumToApiTeamNameMap,
} from '../../data/mappers/F1Mappers';
import { F1Team } from '@/lib/types';

/**
 * Service responsible for handling home page data operations.
 */
export class TeamsService extends BaseF1Service {
  constructor() {
    super();
  }

  /**
   * Fetches team voting information.
   *
   * @returns The team voting information
   */
  async #getTeamVotingInfo(): Promise<ITeamVotingInfo | undefined> {
    const votes = await this.api.getTeamVotes();
    if (votes.length === 0) return undefined;

    // API returns votes sorted by count, so first item has most votes
    const mostVoted = votes[0];
    const team = ApiTeamNameToTeamEnumMap.get(mostVoted.team);

    if (!team) {
      throw new Error(`Unknown team: ${mostVoted.team}`);
    }

    return {
      mostVotedTeam: {
        teamName: mostVoted.team,
        voteCount: mostVoted.votes,
        team,
      },
      teams: votes.map((vote) => ({
        teamName: vote.team,
        voteCount: vote.votes,
        team: ApiTeamNameToTeamEnumMap.get(vote.team) as F1Team,
      })),
    };
  }

  /**
   * Fetches all required data for the home page.
   * If no team has votes yet, mostVotedTeam will be undefined.
   *
   * @returns The home page data
   */
  async getTeamsData(): Promise<ITeamsData> {
    const [teamVotingInfo] = await Promise.all([this.#getTeamVotingInfo()]);

    if (!teamVotingInfo) {
      throw new Error('No team votes available');
    }

    return {
      ...teamVotingInfo,
    };
  }

  /**
   * Votes for a team.
   *
   * @param email - The email of the voter
   * @param team - The team being voted for
   * @throws Error if email or team is not provided
   * @throws Error if the server returns a 400 status code (invalid request data)
   */
  async voteForTeam(email: string, team: F1Team): Promise<void> {
    if (!email || !team) {
      throw new Error('Email and team parameters are required');
    }

    const teamName = TeamEnumToApiTeamNameMap.get(team);

    if (!teamName) {
      throw new Error(`Unknown team: ${team}`);
    }

    await this.api.submitVote(email, teamName);
  }
}
