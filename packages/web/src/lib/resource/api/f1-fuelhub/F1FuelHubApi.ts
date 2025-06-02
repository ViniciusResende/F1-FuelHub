/**
 * @category API
 * @module F1FuelHubApi
 */

/** Enums */
import {
  HttpContentTypeEnum,
  HttpMethodEnum,
  HttpRequestHeaderEnum,
} from '@/lib/utils/classes/api-client/ApiClientEnums';

/** Interfaces */
import { IApiClientRequestParams } from '@/lib/utils/classes/api-client/ApiClientInterfaces';
import {
  IF1FuelHubTopSpeedResponse,
  IF1FuelHubFastestPitstopsResponse,
  IF1FuelHubDriverPoleStats,
  IF1FuelHubDriver,
  IF1FuelHubDriverVictoriesInCountry,
  IF1FuelHubTeamVotes,
  IF1FuelHubVoteRequest,
} from './F1FuelHubInterfaces';

/** Classes */
import { ApiClient } from '@/lib/utils/classes/api-client/ApiClient';
import { F1FuelHubEndpoint } from './F1FuelHubEndpoint';

/**
 * F1 FuelHub's API class.
 */
export class F1FuelHubApi extends ApiClient {
  #api: F1FuelHubEndpoint;

  constructor(baseUrl: string) {
    super(baseUrl);
    this.#api = new F1FuelHubEndpoint(this, { uri: '/api' });
  }

  /**
   * Returns the HTTP Headers object to be used on requests.
   *
   * @returns - The headers object for API requests
   */
  get headers(): Headers {
    const headersExtension = {
      [HttpRequestHeaderEnum.ACCEPT]: [HttpContentTypeEnum.JSON].join(', '),
      [HttpRequestHeaderEnum.CONTENT_TYPE]: [HttpContentTypeEnum.JSON].join(
        ', ',
      ),
    };
    return new Headers(
      Object.assign(
        Object.fromEntries(super.headers.entries()),
        headersExtension,
      ),
    );
  }

  /**
   * Fetches the latest top speed recorded in a race.
   *
   * @returns - The latest top speed information
   */
  async getLatestTopSpeed(): Promise<IF1FuelHubTopSpeedResponse> {
    const requestParams: IApiClientRequestParams = {
      headers: this.headers,
      method: HttpMethodEnum.GET,
    };
    const response = this.#api.request('/speed/top-latest', requestParams);
    const responseData = await response.promise;

    return responseData.data as IF1FuelHubTopSpeedResponse;
  }

  /**
   * Fetches the fastest pitstops - both current season and all-time records.
   *
   * @returns - The fastest pitstop records for current season and overall
   */
  async getFastestPitstops(): Promise<IF1FuelHubFastestPitstopsResponse> {
    const requestParams: IApiClientRequestParams = {
      headers: this.headers,
      method: HttpMethodEnum.GET,
    };
    const response = this.#api.request('/pitstops/fastest', requestParams);
    const responseData = await response.promise;

    return responseData.data as IF1FuelHubFastestPitstopsResponse;
  }

  /**
   * Fetches the top three drivers with the most pole positions.
   *
   * @returns - Array of the top three drivers with their pole position statistics
   */
  async getTopPolePositions(): Promise<IF1FuelHubDriverPoleStats[]> {
    const requestParams: IApiClientRequestParams = {
      headers: this.headers,
      method: HttpMethodEnum.GET,
    };
    const response = this.#api.request('/drivers/top-poles', requestParams);
    const responseData = await response.promise;

    return responseData.data as IF1FuelHubDriverPoleStats[];
  }

  /**
   * Fetches the list of all active drivers in the current F1 season.
   *
   * @returns - Array of all active F1 drivers
   */
  async getDrivers(): Promise<IF1FuelHubDriver[]> {
    const requestParams: IApiClientRequestParams = {
      headers: this.headers,
      method: HttpMethodEnum.GET,
    };
    const response = this.#api.request('/drivers', requestParams);
    const responseData = await response.promise;

    return responseData.data as IF1FuelHubDriver[];
  }

  /**
   * Fetches the most victorious driver in a specific country.
   *
   * @param country - The country to get the most victorious driver for
   * @returns - The driver with the most victories in the specified country
   * @throws Error if country parameter is not provided
   */
  async getTopVictoriesByCountry(
    country: string,
  ): Promise<IF1FuelHubDriverVictoriesInCountry> {
    if (!country) {
      throw new Error('Country parameter is required');
    }

    const requestParams: IApiClientRequestParams = {
      headers: this.headers,
      method: HttpMethodEnum.GET,
    };
    const response = this.#api.request(
      `/victories/top?country=${encodeURIComponent(country)}`,
      requestParams,
    );
    const responseData = await response.promise;

    return responseData.data as IF1FuelHubDriverVictoriesInCountry;
  }

  /**
   * Fetches the list of teams and their vote counts, sorted by most votes.
   * Teams with no votes are not included in the response.
   *
   * @returns - Array of teams and their vote counts
   */
  async getTeamVotes(): Promise<IF1FuelHubTeamVotes[]> {
    const requestParams: IApiClientRequestParams = {
      headers: this.headers,
      method: HttpMethodEnum.GET,
    };
    const response = this.#api.request('/votes', requestParams);
    const responseData = await response.promise;

    return responseData.data as IF1FuelHubTeamVotes[];
  }

  /**
   * Submits a vote for a team.
   *
   * @param email - The email of the voter
   * @param team - The team being voted for
   * @throws Error if email or team is not provided
   * @throws Error if the server returns a 400 status code (invalid request data)
   */
  async submitVote(email: string, team: string): Promise<void> {
    if (!email || !team) {
      throw new Error('Email and team parameters are required');
    }

    const requestParams: IApiClientRequestParams = {
      headers: this.headers,
      method: HttpMethodEnum.POST,
      body: {
        email,
        team,
      } as IF1FuelHubVoteRequest,
    };

    const response = this.#api.request('/votes', requestParams);
    await response.promise;
  }
}
