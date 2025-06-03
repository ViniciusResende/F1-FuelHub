/**
 * @category API
 * @module F1FuelHubInterfaces
 */

/**
 * API data representation for general HTTP responses' structure.
 */
export interface IF1FuelHubResponseData {
  code: number;
  data: unknown;
}

/**
 * API data representation for a single pitstop record.
 */
export interface IF1FuelHubPitstopRecord {
  year: number;
  time: number;
  driver: string;
  team: string;
}

/**
 * API data representation for fastest pitstops response.
 */
export interface IF1FuelHubFastestPitstopsResponse {
  currentYear: IF1FuelHubPitstopRecord;
  overall: IF1FuelHubPitstopRecord;
}

/**
 * API data representation for a driver's basic information.
 */
export interface IF1FuelHubDriver {
  number: number;
  name: string;
  team: string;
  headshot: string;
}

/**
 * API data representation for a driver's pole position statistics.
 */
export interface IF1FuelHubDriverPoleStats extends IF1FuelHubDriver {
  first: number;
  second: number;
  third: number;
  total: number;
}

/**
 * API data representation for a driver's victories in a specific country.
 */
export interface IF1FuelHubDriverVictoriesInCountry extends IF1FuelHubDriver {
  country: string;
  wins: number;
}

/**
 * API data representation for a team's vote count.
 */
export interface IF1FuelHubTeamVotes {
  team: string;
  votes: number;
}

/**
 * API request body for submitting a team vote.
 */
export interface IF1FuelHubVoteRequest {
  email: string;
  team: string;
}

export interface IF1FuelHubTopSpeedResponse {
  year: number;
  speed: number;
  driver: string;
  team: string;
}
