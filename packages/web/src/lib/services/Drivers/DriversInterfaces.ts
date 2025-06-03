/**
 * @category Services
 * @module DriversInterfaces
 */

import { F1Pilot, F1Team, F1Country } from '../../data/enums/F1Enums';

/**
 * Represents a driver's basic information.
 */
export interface IDriverBasicInfo {
  driverNumber: number;
  driverName: string;
  teamName: string;
  driverImage: string;
  driver: F1Pilot;
  team: F1Team;
  country: F1Country;
}

/**
 * Represents a driver's pole position achievements.
 */
export interface IDriverPoleStatsWithCountry extends IDriverBasicInfo {
  firstPlaces: number;
  secondPlaces: number;
  thirdPlaces: number;
  totalPodiums: number;
  driver: F1Pilot;
  team: F1Team;
}

/**
 * Represents all the data needed for the drivers page.
 */
export interface IDriversData {
  drivers: IDriverBasicInfo[];
  topPoleDrivers: IDriverPoleStatsWithCountry[];
}
