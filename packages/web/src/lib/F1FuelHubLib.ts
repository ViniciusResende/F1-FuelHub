/**
 * Library that provides access to utilities and business rules' managers
 * required for building user interfaces for F1 Fuel Hub.
 * @packageDocumentation
 * @category Library
 * @module F1FuelHubLib
 */

/** Services */
import { HomeService } from './services/Home/HomeService';

/** Utilities */
import { Utilities, UtilitiesClass } from './utils/Utilities';

/**
 * Class that provides access to utilities and business rules' services for
 * dealing with F1 Fuel Hub.
 */
export class F1FuelHubLib {
  home: HomeService;
  utils: UtilitiesClass;

  constructor() {
    this.home = new HomeService();
    this.utils = Utilities;
  }
}
