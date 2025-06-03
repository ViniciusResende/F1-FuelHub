/**
 * @category Services
 * @module TeamsInterfaces
 */

import { F1Team } from '../../data/enums/F1Enums';

/**
 * Represents a team and its vote count.
 */
export interface ITeamInfo {
  teamName: string;
  voteCount: number;
  team: F1Team;
}

export interface ITeamVotingInfo {
  mostVotedTeam: ITeamInfo;
  teams: ITeamInfo[];
}

/**
 * Represents all the data needed for the teams page.
 */
export interface ITeamsData extends ITeamVotingInfo {}
