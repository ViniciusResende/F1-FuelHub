/**
 * Library that provides access to utilities and business rules' managers
 * required for building user interfaces for F1 Fuel Hub.
 * @packageDocumentation
 * @category Library
 * @module F1FuelHubLib
 */

/** Services */
import { HomeService } from './services/Home';
import { DriversService } from './services/Drivers';
import { TeamsService } from './services/Teams';

/** Utilities */
import { Utilities, UtilitiesClass } from './utils/Utilities';

/**
 * Class that provides access to utilities and business rules' services for
 * dealing with F1 Fuel Hub.
 */
export class F1FuelHubLib {
  home: HomeService;
  drivers: DriversService;
  teams: TeamsService;
  utils: UtilitiesClass;

  constructor() {
    this.home = new HomeService();
    this.drivers = new DriversService();
    this.teams = new TeamsService();
    this.utils = Utilities;
  }
}
