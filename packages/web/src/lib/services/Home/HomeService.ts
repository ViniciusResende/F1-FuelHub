/**
 * @category Services
 * @module HomeService
 */

import {
  IHomeData,
  ITeamVotesInfo,
  IDriverPoleStats,
  IFastestPitstops,
  ITopSpeedRecord,
} from './HomeInterfaces';
import { BaseF1Service } from '../BaseF1Service';
import {
  ApiDriverNameToDriverEnumMap,
  ApiTeamNameToTeamEnumMap,
} from '../../data/mappers/F1Mappers';

/**
 * Service responsible for handling home page data operations.
 */
export class HomeService extends BaseF1Service {
  constructor() {
    super();
  }

  /**
   * Maps API team votes data to the service interface.
   * Returns the team with the most votes or undefined if no votes exist.
   */
  async #getMostVotedTeam(): Promise<ITeamVotesInfo | undefined> {
    const votes = await this.api.getTeamVotes();
    if (votes.length === 0) return undefined;

    // API returns votes sorted by count, so first item has most votes
    const mostVoted = votes[0];
    const team = ApiTeamNameToTeamEnumMap.get(mostVoted.team);

    if (!team) {
      throw new Error(`Unknown team: ${mostVoted.team}`);
    }

    return {
      teamName: mostVoted.team,
      voteCount: mostVoted.votes,
      team,
    };
  }

  /**
   * Maps API pole position data to the service interface.
   */
  async #getTopPoleDrivers(): Promise<IDriverPoleStats[]> {
    const poles = await this.api.getTopPolePositions();
    return poles.map((pole) => {
      const driver = ApiDriverNameToDriverEnumMap.get(pole.name);
      const team = ApiTeamNameToTeamEnumMap.get(pole.team);

      if (!driver) {
        throw new Error(`Unknown driver: ${pole.name}`);
      }
      if (!team) {
        throw new Error(`Unknown team: ${pole.team}`);
      }

      return {
        driverNumber: pole.number,
        driverName: pole.name,
        teamName: pole.team,
        driverImage: pole.headshot,
        firstPlaces: pole.first,
        secondPlaces: pole.second,
        thirdPlaces: pole.third,
        totalPodiums: pole.total,
        driver,
        team,
      };
    });
  }

  /**
   * Maps API pitstop data to the service interface.
   */
  async #getFastestPitstops(): Promise<IFastestPitstops> {
    const pitstops = await this.api.getFastestPitstops();

    const mapPitstopRecord = (record: typeof pitstops.currentYear) => {
      const driver = ApiDriverNameToDriverEnumMap.get(record.driver);
      const team = ApiTeamNameToTeamEnumMap.get(record.team);

      if (!driver) {
        throw new Error(`Unknown driver: ${record.driver}`);
      }
      if (!team) {
        throw new Error(`Unknown team: ${record.team}`);
      }

      return {
        seasonYear: record.year,
        durationInSeconds: record.time,
        driverName: record.driver,
        teamName: record.team,
        driver,
        team,
      };
    };

    return {
      currentSeason: mapPitstopRecord(pitstops.currentYear),
      allTime: mapPitstopRecord(pitstops.overall),
    };
  }

  /**
   * Maps API top speed data to the service interface.
   */
  async #getLatestTopSpeed(): Promise<ITopSpeedRecord> {
    const speed = await this.api.getLatestTopSpeed();
    const driver = ApiDriverNameToDriverEnumMap.get(speed.driver);
    const team = ApiTeamNameToTeamEnumMap.get(speed.team);

    if (!driver) {
      throw new Error(`Unknown driver: ${speed.driver}`);
    }
    if (!team) {
      throw new Error(`Unknown team: ${speed.team}`);
    }

    return {
      seasonYear: speed.year,
      speedInKph: speed.speed,
      driverName: speed.driver,
      teamName: speed.team,
      driver,
      team,
    };
  }

  /**
   * Fetches all required data for the home page.
   * If no team has votes yet, mostVotedTeam will be undefined.
   *
   * @returns The home page data
   */
  async getHomeData(): Promise<IHomeData> {
    const [mostVotedTeam, topPoleDrivers, fastestPitstops, latestTopSpeed] =
      await Promise.all([
        this.#getMostVotedTeam(),
        this.#getTopPoleDrivers(),
        this.#getFastestPitstops(),
        this.#getLatestTopSpeed(),
      ]);

    if (!mostVotedTeam) {
      throw new Error('No team votes available');
    }

    return {
      mostVotedTeam,
      topPoleDrivers,
      fastestPitstops,
      latestTopSpeed,
    };
  }
}
