/**
 * @category Services
 * @module DriversService
 */

import {
  IDriverBasicInfo,
  IDriverPoleStatsWithCountry,
  IDriversData,
} from './DriversInterfaces';
import {
  ApiDriverNameToDriverEnumMap,
  ApiTeamNameToTeamEnumMap,
  DriverEnumToCountryMap,
} from '../../data/mappers/F1Mappers';
import { BaseF1Service } from '../BaseF1Service';

/**
 * Service responsible for handling drivers data operations.
 */
export class DriversService extends BaseF1Service {
  constructor() {
    super();
  }

  /**
   * Maps API pole position data to the service interface.
   */
  async #getTopPoleDrivers(): Promise<IDriverPoleStatsWithCountry[]> {
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

      const country = DriverEnumToCountryMap.get(driver);
      if (!country) {
        throw new Error(`Unknown country: ${driver}`);
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
        country,
      };
    });
  }

  /**
   * Fetches all active F1 drivers.
   */
  async #getDrivers(): Promise<IDriverBasicInfo[]> {
    const drivers = await this.api.getDrivers();
    return drivers.map((driver) => {
      const driverEnum = ApiDriverNameToDriverEnumMap.get(driver.name);
      const teamEnum = ApiTeamNameToTeamEnumMap.get(driver.team);

      if (!driverEnum) {
        throw new Error(`Unknown driver: ${driver.name}`);
      }
      if (!teamEnum) {
        throw new Error(`Unknown team: ${driver.team}`);
      }

      const country = DriverEnumToCountryMap.get(driverEnum);
      if (!country) {
        throw new Error(`Unknown country: ${driverEnum}`);
      }

      return {
        driverNumber: driver.number,
        driverName: driver.name,
        teamName: driver.team,
        driverImage: driver.headshot,
        driver: driverEnum,
        team: teamEnum,
        country,
      };
    });
  }

  /**
   * Fetches all required data for the home page.
   * If no team has votes yet, mostVotedTeam will be undefined.
   *
   * @returns The home page data
   */
  async getDriversData(): Promise<IDriversData> {
    const [drivers, topPoleDrivers] = await Promise.all([
      this.#getDrivers(),
      this.#getTopPoleDrivers(),
    ]);

    return {
      drivers,
      topPoleDrivers,
    };
  }
}
