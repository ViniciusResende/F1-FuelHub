export interface OpenF1Driver {
  driver_number: number;
  driver_name: string;
  full_name: string;
  country_code: string;
  headshot_url: string | null;
  broadcast_name: string;
  team_name: string | null;
  first_name: string;
  last_name: string;
  meeting_key?: number;
  session_key?: number;
}

export interface DriverDTO {
  number: number;
  name: string;
  country: string;
  team: string | null;
  headshot: string | null;
}
