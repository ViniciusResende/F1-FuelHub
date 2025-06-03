/**
 * @category Services
 * @module HomeInterfaces
 */

import { F1Pilot, F1Team } from '../../data/enums/F1Enums';

/**
 * Represents a team and its vote count.
 */
export interface ITeamVotesInfo {
  teamName: string;
  voteCount: number;
  team: F1Team;
}

/**
 * Represents a driver's pole position achievements.
 */
export interface IDriverPoleStats {
  driverNumber: number;
  driverName: string;
  teamName: string;
  driverImage: string;
  firstPlaces: number;
  secondPlaces: number;
  thirdPlaces: number;
  totalPodiums: number;
  driver: F1Pilot;
  team: F1Team;
}

/**
 * Represents a pitstop record.
 */
export interface IPitstopRecord {
  seasonYear: number;
  durationInSeconds: number;
  driverName: string;
  teamName: string;
  driver: F1Pilot;
  team: F1Team;
}

/**
 * Represents the fastest pitstops data.
 */
export interface IFastestPitstops {
  currentSeason: IPitstopRecord;
  allTime: IPitstopRecord;
}

/**
 * Represents a top speed record.
 */
export interface ITopSpeedRecord {
  seasonYear: number;
  speedInKph: number;
  driverName: string;
  teamName: string;
  driver: F1Pilot;
  team: F1Team;
}

/**
 * Represents all the data needed for the home page.
 */
export interface IHomeData {
  mostVotedTeam: ITeamVotesInfo;
  topPoleDrivers: IDriverPoleStats[];
  fastestPitstops: IFastestPitstops;
  latestTopSpeed: ITopSpeedRecord;
}
