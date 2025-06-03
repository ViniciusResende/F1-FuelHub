import { F1FuelHubApi } from '../resource/api/f1-fuelhub/F1FuelHubApi';
import { Utilities } from '../utils/Utilities';

export class BaseF1Service {
  #api: F1FuelHubApi;

  constructor() {
    this.#api = this.#getF1FuelHubApi();
    this.#addEventListeners();
  }

  /**
   * Adds the event listener for configuration changes.
   */
  #addEventListeners() {
    const onConfigurationChanged = this.#onConfigurationChanged.bind(this);
    Utilities.subscribe(
      Utilities.EVENTS.CONFIGURATION_CHANGED,
      onConfigurationChanged,
    );
  }

  /**
   * Returns a new ApiAcad instance with the current configuration from Utilities.
   *
   * @returns The ApiAcad instance with updated configuration
   */
  #getF1FuelHubApi(): F1FuelHubApi {
    const { baseApiUrl } = Utilities.configuration;
    const f1FuelHubApi = new F1FuelHubApi(baseApiUrl || '');
    return f1FuelHubApi;
  }

  /**
   * Event handler to deal with configuration changes.
   * It will update the strategy's F1FuelHubApi instance with the new configuration.
   */
  #onConfigurationChanged() {
    this.#api = this.#getF1FuelHubApi();
  }

  get api(): F1FuelHubApi {
    return this.#api;
  }
}
